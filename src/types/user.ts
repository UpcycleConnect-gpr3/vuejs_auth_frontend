export interface User {
  id: string | null
  email: string | null
  firstname: string | null
  lastname: string | null
  phone: string | null
  avatar: string | null
  role: string | null
  organization_id: string | null
  totp_enabled: boolean | null
  created_at: string | null
  updated_at: string | null
}
