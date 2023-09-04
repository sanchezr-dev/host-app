import type { NextApiRequest, NextApiResponse } from "next"
import { withSessionApiRoute } from "@/lib/session"
import { IURLState } from "@/types"

const callbackApiRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { token, state } = req.query
    req.session.data = {
      accessToken: token as string,
    }
    await req.session.save()
    const parsedState: IURLState = JSON.parse(atob(state as string))
    res.redirect(307, parsedState.nextUrl)
  } catch (error) {
    console.error(error)
    res.status(500).send("")
  }
}

export default withSessionApiRoute(callbackApiRoute)
