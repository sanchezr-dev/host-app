import { IronSession } from "iron-session"
import * as jose from "jose"

const verifyJwt = async (jwt: string) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET)

  try {
    const { payload } = await jose.jwtVerify(jwt, secret, {
      issuer: "urn:example:issuer",
      audience: "urn:example:audience",
    })
  } catch (error) {
    return false
  }

  return true
}

export const isAuthenticated = async (session: IronSession) => {
  if (session && session.data !== undefined) {
    return await verifyJwt(session.data.accessToken)
  }
  return false
}
