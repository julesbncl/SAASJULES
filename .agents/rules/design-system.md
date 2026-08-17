# Design System & UI/UX Guidelines — JulesFactures

Toutes les pages, composants et fonctionnalités développés dans ce projet DOIVENT respecter scrupuleusement l'ADN visuel et les standards établis sur le Dashboard de **JulesFactures**.

---

## 1. Palette & Couleurs (Fintech Dark)

* **Arrière-plan Principal :** `bg-[#07090e]` ou `bg-background`
* **Surfaces de Cartes (Glassmorphism) :** `bg-[#0c101a]/90` ou `bg-card` avec `backdrop-blur-md`
* **Sous-surfaces & Champs :** `bg-[#131926]` ou `bg-[#0e1422]`
* **Bordures :** `border-white/[0.07]` (défaut) et `hover:border-white/[0.14]` (survol)
* **Couleur Primaire & Accents :**
  * Dégradés : `from-blue-600 to-cyan-500` ou `from-blue-600 via-indigo-600 to-purple-600`
  * Boutons principaux : `bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30`
* **Statuts Sémantiques (Badges & Alertes) :**
  * **Payée / Succès :** `bg-emerald-500/10 text-emerald-400 border-emerald-500/20 dot:bg-emerald-400`
  * **Envoyée / En attente :** `bg-amber-500/10 text-amber-400 border-amber-500/20 dot:bg-amber-400`
  * **En retard / Alerte :** `bg-rose-500/10 text-rose-400 border-rose-500/20 dot:bg-rose-400`
  * **Brouillon / Neutre :** `bg-slate-500/10 text-slate-400 border-slate-500/20 dot:bg-slate-400`

---

## 2. Typographie, Données & Numérotation

* **Chiffres & Métriques :** Toujours utiliser `tabular-nums` et un poids fort (`font-bold` ou `font-extrabold`).
* **Devise :** Toujours afficher la devise en **FCFA** (formatage via `formatFCFA()`, pas de décimales superflues, séparateur d'espace insécable).
* **Dates :** Format français clair (ex: `formatDateFr()` -> `24 mars 2026`).
* **Micro-labels :** Typographie discrète en majuscules espacées : `text-[10px]` ou `text-[11px] font-semibold text-slate-400 uppercase tracking-wider`.
* **Identifiants & Codes (IFU, Numéros de factures) :** Utiliser la police monospace (`font-mono` ou `mono-font`).

---

## 3. Géométrie, Composants & Rayons

* **Cartes principales & Conteneurs :** `rounded-3xl` (24px) avec padding généreux (`p-6` ou `lg:p-8`).
* **Composants secondaires & Boutons :** `rounded-2xl` (16px).
* **Pills & Badges :** `rounded-full` ou `rounded-xl` avec bordure fine assortie.

---

## 4. Spécificités Régionales (UEMOA / OHADA)

* **TVA standard :** 18% par défaut (`DEFAULT_VAT_RATE = 18`).
* **Mentions obligatoires :** Prise en charge des champs `IFU`, `NINEA`, `RCCM`.
* **Moyens de règlement :** Affichage systématique de Wave, Orange Money et RIB bancaire.

---

## 5. Micro-Interactions & Qualité Visuelle

* **Survols interactifs :** `transition-all duration-150`, `hover:scale-[1.02] active:scale-[0.98]`.
* **Ombres portées :** Ombres teintées subtiles (`shadow-xl shadow-black/40`, `shadow-blue-600/30`).
* **Icônes :** Utiliser les icônes fines et cohérentes de `lucide-react`.
* **Responsive :** Mobile first, barre latérale repliable (Drawer) et tableaux avec défilement horizontal fluide (`overflow-x-auto`).
