# vuejs_auth_frontend — Pages

Frontend qui gère l'**authentification** et les **paramètres du compte utilisateur**.

Accès : `http://auth-front.localhost` (Docker) ou `http://localhost:5173`

## Routes

### Auth (publiques)

| Chemin | Composant | Description | Liens |
|---|---|---|---|
| `/` | redirect | Redirige vers `/settings/profile` | [docker](http://auth-front.localhost/) · [local](http://localhost:5173/) |
| `/auth/login` | `LoginPage` | Connexion (email + password + lien forgot) | [docker](http://auth-front.localhost/auth/login) · [local](http://localhost:5173/auth/login) |
| `/auth/register` | `RegisterPage` | Inscription | [docker](http://auth-front.localhost/auth/register) · [local](http://localhost:5173/auth/register) |
| `/auth/forgot-password` | `ForgotPage` | Demande de réinitialisation | [docker](http://auth-front.localhost/auth/forgot-password) · [local](http://localhost:5173/auth/forgot-password) |
| `/auth/a2f-code` | `A2FCodePage` | Code OTP à 6 chiffres (single input, countdown renvoi) | [docker](http://auth-front.localhost/auth/a2f-code) · [local](http://localhost:5173/auth/a2f-code) |

### Settings (protégées — `meta.requiresAuth`)

| Chemin | Composant | Description | Liens |
|---|---|---|---|
| `/settings/profile` | `ProfilePage` | Photo, identité (prénom/nom/username), bio | [docker](http://auth-front.localhost/settings/profile) · [local](http://localhost:5173/settings/profile) |
| `/settings/account` | `AccountPage` | Email, mot de passe, 2FA toggle, suppression de compte | [docker](http://auth-front.localhost/settings/account) · [local](http://localhost:5173/settings/account) |
| `/settings/billing` | `BillingPage` | Plan actuel, moyen de paiement, historique factures | [docker](http://auth-front.localhost/settings/billing) · [local](http://localhost:5173/settings/billing) |
| `/settings/notifications` | `NotificationPage` | Toggles email & push par catégorie | [docker](http://auth-front.localhost/settings/notifications) · [local](http://localhost:5173/settings/notifications) |
| `/settings/teams` | `OrganizationPage` | Infos organisation, invitation, table des membres | [docker](http://auth-front.localhost/settings/teams) · [local](http://localhost:5173/settings/teams) |

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
