import type { IronSessionOptions } from "iron-session"
import type { IAuthData } from "@/types"

export const sessionOptions: IronSessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: "host-app",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
}

declare module "iron-session" {
  interface IronSessionData {
    data?: IAuthData
  }
}
