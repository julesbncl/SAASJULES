# JulesFactures — Documentation & Guide Technique du Projet (GEMINI.md)

Ce document récapitule l'architecture globale, les fonctionnalités, les choix techniques, les décisions de design et les instructions clés pour tout agent ou développeur intervenant sur la plateforme **JulesFactures**.

---

## 1. 🎯 Présentation Générale (Ce que l'application fait)

**JulesFactures** est un SaaS de facturation, devis et suivi financier conçu sur mesure pour les freelances, agences, consultants et PME situés en **Afrique de l'Ouest (Zone UEMOA / OHADA)** : Sénégal, Côte d'Ivoire, Bénin, Togo, Mali, Burkina Faso, Niger, Guinée-Bissau.

### Problème résolu :
Fini les factures artisanales créées manuellement sur Word ou Excel, sources d'erreurs fiscales, de retards de paiement et d'une image de marque peu valorisante.

### Valeur ajoutée & Spécificités régionales :
* **Devise locale :** Gestion native du **FCFA** (formatage sans décimales, séparateurs d'espaces insécables via `formatFCFA()`).
* **Fiscalité UEMOA :** Calcul automatique de la **TVA légale à 18%** (Hors Taxe, Montant TVA, Total TTC à payer).
* **Identifiants fiscaux :** Prise en charge obligatoire des mentions légales (**IFU, NINEA, RCCM**).
* **Moyens de paiement locaux :** Mise en avant directe des comptes **Wave Sénégal / CI**, **Orange Money** et virements bancaires partenaires.

---

## 2. ⚡ Fonctionnalités Implémentées

### A. Tableau de Bord (Dashboard) — `/dashboard`
* **KPIs Financiers :** Total Facturé TTC, Total Encaissé, En Attente, En Retard avec badges dynamiques et variations comparatives.
* **AI Insight Card :** Carte d'intelligence financière analysant le volume facturé et recommandant des relances ciblées en 1 clic.
* **Jauge de Recouvrement (Collected Meter) :** Visualisation circulaire de l'atteinte de l'objectif mensuel d'encaissement.
* **Graphique de Volume Mensuel :** Courbes interactives comparant les volumes facturés vs encaissés.
* **Tableau des Factures Récentes :** Liste rapide avec statuts et accès direct aux actions.

### B. Module Factures — `/factures`, `/factures/nouvelle`, `/factures/[id]`
* **Liste & Filtres :** Vue tabulaire filtrable par statut (*Tous, Payée, Envoyée, En retard, Brouillon*) et barre de recherche temps réel par client ou numéro.
* **Créateur de Facture interactif :**
  * Sélection du client dans une liste déroulante avec aperçu des coordonnées et du N° IFU.
  * Dates d'émission et d'échéance (+15 jours par défaut).
  * Éditeur dynamique de prestations (Description, Quantité, Prix unitaire FCFA, calcul temps réel du total de ligne).
  * Ajout/suppression de lignes de prestation.
  * Récapitulatif financier en temps réel : Sous-total HT, TVA 18%, Total TTC.
  * Double action : **« Sauvegarder comme brouillon »** et **« Générer et envoyer la facture »**.
* **Page Détail Facture (Aperçu Document) :**
  * Rendu haute fidélité du document facture (en-tête entreprise, client, tableau des prestations, mentions de paiement, notes).
  * Menu d'actions interactif : changement de statut (*Payée, Envoyée, En retard, Brouillon*).
  * Bouton Modifier (redirige vers le formulaire pré-rempli).
  * Bouton Supprimer avec modale de confirmation stylisée Fintech Dark.
  * Bouton Imprimer / Export PDF (`/factures/[id]/pdf`).

### C. Devis & Factures Proforma — `/devis`
* Suivi des propositions commerciales en cours de négociation.
* Bouton d'action directe pour **convertir un devis accepté en facture**.

### D. Répertoire Clients (CRM) — `/clients`, `/clients/nouveau`, `/clients/[id]`
* Cartes clients avec coordonnées, ville, pays, N° IFU et cumul du chiffre d'affaires facturé.
* Formulaire d'ajout et de modification de client.
* Fiche client détaillée avec historique des factures et suppression sécurisée avec boîte de dialogue.

### E. Moyens de Paiement — `/paiements`
* Gestion et affichage des canaux de règlement : Wave, Orange Money et RIB bancaire (Coris Bank, Ecobank, CBAO).

### F. Rapports Fiscaux & Déclarations — `/rapports`
* Synthèse de la TVA collectée (18%) sur la période.
* Bouton d'exportation du journal des ventes (CSV / Excel).

### G. Paramètres de l'Entreprise — `/parametres`
* Profil de l'émetteur : Raison sociale, statut juridique (SARL, SAS, SUARL), N° IFU/RCCM, taux de TVA par défaut, coordonnées.

### H. Landing Page Marketing — `/` et `/tarifs`
* Page d'accueil moderne haute conversion intégrant :
  1. *Hero Section* avec proposition de valeur claire et aperçu interactif du dashboard.
  2. *Section Problèmes* (3 douleurs réelles des entrepreneurs).
  3. *Section Fonctionnalités Clés* (4 cartes avec micro-badges).
  4. *Section Comment ça marche* (01, 02, 03).
  5. *Section Témoignages* géolocalisés (Dakar, Abidjan, Cotonou).
  6. *Section Tarifs transparents* (Gratuit 0 FCFA, Pro 5 000 FCFA mis en avant, Business 15 000 FCFA).
  7. *CTA Final & Footer* « Fait avec fierté en Afrique 🌍 ».
* Également exportée en fichier HTML autonome : [`landing-page-izifacture.html`](file:///c:/Users/Jules/Desktop/julesfactures/landing-page-izifacture.html).

---

## 3. 📂 Structure des Fichiers

```
julesfactures/
├── .agents/
│   └── rules/
│       └── design-system.md         # Règle absolue du Design System Fintech Dark
├── AGENTS.md                        # Point d'entrée des directives pour les agents IA
├── GEMINI.md                        # Ce fichier de documentation de référence
├── landing-page-izifacture.html     # Landing page HTML autonome et portable
├── package.json                     # Dépendances et scripts de démarrage
├── tailwind.config.ts               # Configuration Tailwind (tokens de couleurs et rayons)
├── supabase/
│   └── migrations/
│       └── 0001_init.sql            # Schéma PostgreSQL, RLS, trigger signup et séquences
└── src/
    ├── app/
    │   ├── layout.tsx               # Root layout global (Thème sombre)
    │   ├── page.tsx                 # Page d'accueil (Landing Page marketing)
    │   ├── globals.css              # Styles globaux et utilitaires de scrollbar
    │   ├── (app)/                   # Route group de l'application connectée
    │   │   ├── layout.tsx           # Layout avec Sidebar persistante
    │   │   ├── dashboard/page.tsx   # Tableau de bord principal
    │   │   ├── factures/
    │   │   │   ├── page.tsx         # Liste des factures
    │   │   │   ├── nouvelle/page.tsx # Création de facture
    │   │   │   └── [id]/
    │   │   │       ├── page.tsx     # Détail & document facture
    │   │   │       ├── modifier/    # Modification de facture
    │   │   │       └── pdf/         # Vue d'impression / export PDF
    │   │   ├── devis/page.tsx       # Devis & factures proforma
    │   │   ├── clients/
    │   │   │   ├── page.tsx         # Liste des clients
    │   │   │   ├── nouveau/page.tsx # Création de client
    │   │   │   └── [id]/            # Fiche client & modification
    │   │   ├── paiements/page.tsx   # Canaux de règlement
    │   │   ├── rapports/page.tsx    # TVA 18% & Journal des ventes
    │   │   └── parametres/page.tsx  # Paramètres entreprise & IFU
    │   ├── (auth)/                  # Authentification (connexion, inscription)
    │   └── (marketing)/             # Pages publiques (tarifs, mentions légales)
    ├── components/
    │   ├── layout/                  # Sidebar, Topbar
    │   ├── dashboard/               # AIInsightCard, CollectedMeter, MonthlyVolumeChart, StatCard
    │   ├── invoices/                # InvoiceForm, LineItemsEditor, InvoiceActions, StatusBadge
    │   ├── clients/                 # ClientForm, ClientActions
    │   └── marketing/               # LandingPageComponent
    └── lib/
        ├── constants.ts             # Devise FCFA, taux TVA 18%, couleurs de statuts
        ├── format.ts                # formatFCFA(), formatDateFr()
        ├── utils.ts                 # cn() pour la fusion de classes Tailwind
        ├── calculations/            # Calculs rigoureux de TVA et totaux arrondis
        ├── validations/             # Schémas Zod (Invoice, Client, Company)
        └── data/
            ├── types.ts             # Types TypeScript métier
            ├── repository.ts        # Interfaces d'accès aux données
            └── mock/                # Adaptateur in-memory pour démo et tests immédiats
```

---

## 4. 🛠️ Technologies Utilisées

* **Framework :** Next.js 14.2 (App Router, Server & Client Components)
* **Langage :** TypeScript 5 & React 18
* **Styling :** TailwindCSS 3.4 avec configuration étendue
* **Icônes :** Lucide React (`lucide-react`)
* **Validation des Formulaires :** Zod (`zod`)
* **Gestion des Classes :** `clsx` et `tailwind-merge`
* **Dates :** `date-fns` & helpers natifs en français
* **Base de Données / Backend :** Supabase PostgreSQL 15+ avec Row Level Security (RLS) et fonctions PL/pgSQL atomiques.

---

## 5. 🎨 Décisions de Design (ADN Fintech Dark)

Toute l'interface suit les standards esthétiques stricts définis dans [`.agents/rules/design-system.md`](file:///c:/Users/Jules/Desktop/julesfactures/.agents/rules/design-system.md) :

1. **Palette de Couleurs :**
   * Fond général : `#07090e` / `#080b13`
   * Cartes (Glassmorphism) : `#0c101a`/90 avec bordure `border-white/[0.07]` et `backdrop-blur-md`
   * Sous-surfaces & Inputs : `#131926` avec bordure `border-white/[0.08]`
   * Accents primaires : Dégradés bleu/cyan `from-blue-600 to-cyan-500` et ombres `shadow-blue-600/30`
2. **Couleurs Sémantiques des Statuts :**
   * **Payée :** Émeraude (`emerald-400`, `bg-emerald-500/10`, `border-emerald-500/20`)
   * **Envoyée :** Ambre (`amber-400`, `bg-amber-500/10`, `border-amber-500/20`)
   * **En retard :** Rose / Carmin (`rose-400`, `bg-rose-500/10`, `border-rose-500/20`)
   * **Brouillon :** Ardoise (`slate-400`, `bg-slate-500/10`, `border-slate-500/20`)
3. **Géométrie & Rayons :**
   * `rounded-3xl` (24px) pour les cartes et conteneurs principaux
   * `rounded-2xl` (16px) pour les boutons, champs d'entrée et modales
   * `rounded-xl` / `rounded-full` pour les badges et pills
4. **Typographie & Données :**
   * Chiffres financiers obligatoirement en `tabular-nums font-bold` ou `font-extrabold`.
   * Codes et identifiants (IFU, N° Facture) en police monospace.
   * Micro-labels en majuscules espacées (`text-[10px] uppercase font-bold text-slate-400 tracking-wider`).
5. **Micro-Interactions :**
   * Survol des boutons et cartes : `hover:scale-[1.02] active:scale-[0.98] transition-all duration-150`.
   * Survol des bordures : `hover:border-white/[0.14]`.

---

## 6. 🤖 Instructions pour un Futur Modèle d'IA

Lors de toute intervention future sur ce projet, le modèle IA doit impérativement respecter les règles suivantes :

1. **Cohérence du Design System :**
   Ne jamais introduire de fonds blancs ou de couleurs basiques non assorties. Réutiliser systématiquement les classes de surface (`#0c101a`, `#131926`), les bordures subtiles (`border-white/[0.07]`) et les dégradés bleu/cyan.
2. **Devise et Formatage :**
   Tous les montants doivent être en **FCFA**, arrondis à l'entier (pas de centimes superflus), et formatés via la fonction utilitaire `formatFCFA()`.
3. **Fiscalité UEMOA :**
   Toujours appliquer la TVA standard à 18% lors des calculs financiers, sauf indication explicite contraire.
4. **Architecture des Données :**
   Consommer et enrichir les méthodes de `src/lib/data/` (`invoicesRepo`, `clientsRepo`, `companyRepo`) plutôt que d'écrire du code de persistance ad-hoc dans les pages.
5. **Composants Interactifs :**
   Pour toute action destructrice (suppression de facture ou de client), toujours utiliser une boîte de dialogue de confirmation avec backdrop flouté.
6. **Navigation et Liens :**
   Conserver les liens fluides entre les pages (clic sur un client -> fiche client, clic sur une facture -> détail facture, clic sur modifier -> formulaire pré-rempli).
