export type AuthCredentials = {
  email: string
  password: string
}

export interface TotpLoginCredentials {
  code: string
  hash: string
}

export interface LoginResponse {
  bearer_token?: string
  hash?: string
  totp_required: boolean
}

export interface TotpLoginResponse {
  bearer_token: string
}

export interface RegisterResponse {
  user_id: string
}