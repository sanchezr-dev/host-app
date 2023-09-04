export interface IAuthData {
  accessToken: string
}

export interface IApiResponse {
  success: boolean
  message?: string
  data?: any
}

export interface IURLState {
  nextUrl: string
}
