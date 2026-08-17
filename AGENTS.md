# JulesFactures — Règles et Directives du Projet

Ce projet est une application SaaS de facturation et gestion financière pour l'Afrique de l'Ouest (UEMOA / OHADA) construite avec Next.js 14, TailwindCSS et Supabase.

## Règle Absolue de Design System

Toute modification, nouvelle page ou nouveau composant doit impérativement respecter le Design System documenté dans [.agents/rules/design-system.md](file:///c:/Users/Jules/Desktop/julesfactures/.agents/rules/design-system.md) :

1. **Thème Fintech Dark :** Fond `#07090e`, cartes `#0c101a`/90 avec bordures `border-white/[0.07]`, sous-surfaces `#131926`.
2. **Accents :** Dégradés Bleu Électrique / Cyan (`from-blue-600 to-cyan-500`) et ombres diffuses `shadow-blue-600/30`.
3. **Géométrie :** `rounded-3xl` pour les cartes principales, `rounded-2xl` pour les boutons/inputs, micro-animations au survol (`hover:scale-[1.02]`).
4. **Typographie & Données :** Chiffres en `tabular-nums font-extrabold`, montants obligatoirement en **FCFA** (formatage sans décimales via `formatFCFA()`).
5. **Fiscalité UEMOA :** TVA standard à 18%, mentions légales IFU/NINEA/RCCM.
