# vuejs_auth_frontend — Pages

Frontend qui gère l'**authentification** et les **paramètres du compte utilisateur**.

Accès : `http://auth-front.localhost` (Docker) ou `http://localhost:5173`

## Routes

### Auth (publiques)

| Chemin | Composant | Description |
|---|---|---|
| `/` | redirect | Redirige vers `/settings/profile` |
| `/auth/login` | `LoginPage` | Connexion (email + password + lien forgot) |
| `/auth/register` | `RegisterPage` | Inscription |
| `/auth/forgot-password` | `ForgotPage` | Demande de réinitialisation |
| `/auth/a2f-code` | `A2FCodePage` | Code OTP à 6 chiffres (single input, countdown renvoi) |

### Settings (protégées — `meta.requiresAuth`)

| Chemin | Composant | Description |
|---|---|---|
| `/settings/profile` | `ProfilePage` | Photo, identité (prénom/nom/username), bio |
| `/settings/account` | `AccountPage` | Email, mot de passe, 2FA toggle, suppression de compte |
| `/settings/billing` | `BillingPage` | Plan actuel, moyen de paiement, historique factures |
| `/settings/notifications` | `NotificationPage` | Toggles email & push par catégorie |
| `/settings/teams` | `OrganizationPage` | Infos organisation, invitation, table des membres |

## Composants

### `SettingsLayout.vue`

Layout 2 cols pour toutes les pages settings :
- **Sidebar 260px** sticky en green-800 avec :
  - Logo lime + "UpcycleConnect"
  - Nav settings avec icônes Phosphor SVG (Profil, Compte, Organisation, Facturation, Notifications)
  - Active state : bg lime + black text + barre lime 3px à gauche
  - User block bottom : avatar lime + nom + rôle + logout (destructive hover)
- **Main content** centré max 760px avec :
  - Header : eyebrow + h1 + description + divider
  - Sections grille 2 cols : head (label + hint) | body (formulaire)
  - Dividers entre sections
  - Footer optionnel : Annuler + Sauvegarder

## Guards

```ts
router.beforeEach((to, _from, next) => {
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login' })
    return
  }
  next()
})
```

## Comportement post-auth

- **Login OK** → redirige vers `/settings/profile` (via redirect `/`)
- **Register OK** → `/auth/login`

## UI components ajoutés

- `.settings-shell`, `.settings-sidebar`, `.settings-main`, `.settings-content`
- `.settings-header`, `.settings-section` (grid head | body), `.settings-footer`
- `.setting-row` — ligne avec label + toggle/button
- `.danger-zone` — section rouge tinted pour actions destructives
- `.toggle` + `.toggle-slider` — switch lime
- `.plan-card` — card plan courant avec bordure lime
- `.avatar-placeholder` grand (80px) + `.avatar` petit (36px)
- `.table-wrapper` — tables polish (factures, membres)
- `.badge` variantes
- `.icon-box` — container icône (VISA etc.)

## API backend liée

- `POST /auth/login` → `go_auth_backend`
- `POST /auth/register` → `go_auth_backend`
- `GET/PUT /users/:id` → gestion profil (via backends forum/training/upcycle)

## Variables d'environnement

```
VITE_API_URL=http://auth.localhost
```
