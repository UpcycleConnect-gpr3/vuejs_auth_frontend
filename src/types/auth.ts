export type AuthCredentials = {
  email: string
  password: string
}

export type RegisterCredentials = AuthCredentials & {
  role: string
}

export interface TotpLoginCredentials {
  code: string
  hash: string
}

export interface LoginResponse {
  bearer_token?: string
  hash?: string
  totp_required: boolean
  role?: string
}

export interface TotpLoginResponse {
  bearer_token: string
}

export interface RegisterResponse {
  user_id: string
  role?: string
}

export interface UserSelectableRolesResponse {
  user_selectable_roles: string[]
}