export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginSuccessResponse {
  token: string,
  username: string,
  user_id: number | string
}
