-- ==============================================================================
-- JulesFactures — Initial Database Schema & Security Migration
-- Target: Supabase / PostgreSQL 15+
-- ==============================================================================

-- 1. EXTENSIONS
create extension if not exists "uuid-ossp";

-- 2. COMPANIES TABLE (Tenant root, 1 company per authenticated owner)
create table public.companies (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid references auth.users(id) on delete cascade not null unique,
  name text not null,
  legal_status text default 'SARL',
  ifu text, -- Numéro IFU / NINEA / RCCM
  email text not null,
  phone text not null,
  address text not null,
  city text not null,
  country text not null default 'Sénégal',
  vat_rate numeric(5,2) not null default 18.00,
  currency text not null default 'FCFA',
  logo_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 3. CLIENTS TABLE
create table public.clients (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid references public.companies(id) on delete cascade not null,
  name text not null,
  company_name text,
  email text not null,
  phone text not null,
  address text,
  city text not null,
  country text not null default 'Sénégal',
  ifu text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 4. INVOICE COUNTERS TABLE (Atomic sequence generator per tenant and year)
create table public.invoice_counters (
  company_id uuid references public.companies(id) on delete cascade not null,
  year int not null,
  current_val int not null default 0,
  primary key (company_id, year)
);

-- 5. INVOICES TABLE
create type public.invoice_status_enum as enum ('payee', 'envoyee', 'brouillon');

create table public.invoices (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid references public.companies(id) on delete cascade not null,
  client_id uuid references public.clients(id) on delete restrict not null,
  invoice_number text not null,
  issue_date date not null default current_date,
  due_date date not null,
  status public.invoice_status_enum not null default 'envoyee',
  subtotal bigint not null default 0, -- FCFA integer
  vat_rate numeric(5,2) not null default 18.00, -- Snapshot at invoice creation
  vat_amount bigint not null default 0, -- FCFA integer
  total bigint not null default 0, -- FCFA integer TTC
  notes text,
  payment_method text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint uq_company_invoice_number unique (company_id, invoice_number)
);

-- 6. INVOICE LINE ITEMS TABLE (Denormalized company_id for fast simple RLS)
create table public.invoice_line_items (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid references public.companies(id) on delete cascade not null,
  invoice_id uuid references public.invoices(id) on delete cascade not null,
  description text not null,
  quantity numeric(10,2) not null default 1.00,
  unit_price bigint not null default 0, -- FCFA integer
  total bigint not null default 0, -- FCFA integer
  created_at timestamptz not null default now()
);

-- 7. ATOMIC INVOICE NUMBER GENERATOR FUNCTION
create or replace function public.next_invoice_number(p_company_id uuid)
returns text
language plpgsql
security definer
as $$
declare
  v_year int := extract(year from current_date);
  v_next_val int;
  v_formatted text;
begin
  insert into public.invoice_counters (company_id, year, current_val)
  values (p_company_id, v_year, 1)
  on conflict (company_id, year)
  do update set current_val = public.invoice_counters.current_val + 1
  returning current_val into v_next_val;

  v_formatted := 'FAC-' || v_year::text || '-' || lpad(v_next_val::text, 4, '0');
  return v_formatted;
end;
$$;

-- 8. DYNAMIC INVOICES VIEW ("en_retard" is derived at read time, never stored stale)
create or replace view public.invoices_view
with (security_invoker = true)
as
select 
  inv.id,
  inv.company_id,
  inv.client_id,
  inv.invoice_number,
  inv.issue_date,
  inv.due_date,
  case 
    when inv.status = 'envoyee' and inv.due_date < current_date then 'en_retard'
    else inv.status::text
  end as derived_status,
  inv.subtotal,
  inv.vat_rate,
  inv.vat_amount,
  inv.total,
  inv.notes,
  inv.payment_method,
  inv.created_at,
  inv.updated_at
from public.invoices inv;

-- 9. HELPER: CURRENT USER COMPANY ID
create or replace function public.fn_user_company_id()
returns uuid
language sql
security definer
stable
as $$
  select id from public.companies where owner_id = auth.uid() limit 1;
$$;

-- 10. ROW LEVEL SECURITY (RLS) POLICIES
alter table public.companies enable row level security;
alter table public.clients enable row level security;
alter table public.invoices enable row level security;
alter table public.invoice_line_items enable row level security;
alter table public.invoice_counters enable row level security;

-- Companies Policy
create policy "Users can only view and manage their own company"
  on public.companies
  for all
  using (owner_id = auth.uid())
  with check (owner_id = auth.uid());

-- Clients Policy
create policy "Users can only access clients of their company"
  on public.clients
  for all
  using (company_id = public.fn_user_company_id())
  with check (company_id = public.fn_user_company_id());

-- Invoices Policy
create policy "Users can only access invoices of their company"
  on public.invoices
  for all
  using (company_id = public.fn_user_company_id())
  with check (company_id = public.fn_user_company_id());

-- Line Items Policy
create policy "Users can only access line items of their company"
  on public.invoice_line_items
  for all
  using (company_id = public.fn_user_company_id())
  with check (company_id = public.fn_user_company_id());

-- 11. AUTO-PROVISIONING TRIGGER ON SIGNUP
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
declare
  v_company_name text;
begin
  v_company_name := coalesce(new.raw_user_meta_data->>'company_name', 'Mon Entreprise');

  insert into public.companies (
    owner_id,
    name,
    email,
    phone,
    address,
    city,
    country
  ) values (
    new.id,
    v_company_name,
    new.email,
    coalesce(new.raw_user_meta_data->>'phone', '+221 00 000 00 00'),
    'Adresse par défaut',
    'Dakar',
    'Sénégal'
  );

  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
