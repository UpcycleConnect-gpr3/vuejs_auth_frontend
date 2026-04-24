# vuejs_auth_frontend — Pages

Frontend dédié à l'authentification et à la gestion du compte utilisateur.

Accès : `http://auth-front.localhost` (Docker) ou `http://localhost:5173`

## Routes

| Chemin | Composant | Description | Auth requis |
|---|---|---|---|
| `/` | `HomePage` | Accueil post-login avec liens vers les paramètres | ✅ |
| `/auth/login` | `LoginPage` | Connexion (email + mot de passe) | ❌ |
| `/auth/register` | `RegisterPage` | Inscription | ❌ |
| `/auth/forgot-password` | `ForgotPage` | Mot de passe oublié | ❌ |
| `/auth/a2f-code` | `A2FCodePage` | Code 2FA | ❌ |
| `/settings/profile` | `ProfilePage` | Profil utilisateur | ❌* |
| `/settings/account` | `AccountPage` | Paramètres compte | ❌* |
| `/settings/billing` | `BillingPage` | Facturation | ❌* |
| `/settings/notifications` | `NotificationPage` | Préférences de notifications | ❌* |
| `/settings/teams` | `OrganizationPage` | Organisation / équipe | ❌* |

\* Guard non activé actuellement, à protéger via `meta.requiresAuth`.

## API backend liée

- `POST /auth/login` → `go_auth_backend`
- `POST /auth/register` → `go_auth_backend`
