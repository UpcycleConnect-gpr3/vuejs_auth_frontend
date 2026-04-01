export type AuthCredentials = {
  email: string;
  password: string;
}
export interface AuthResponse {
  bearer_token: string;
}