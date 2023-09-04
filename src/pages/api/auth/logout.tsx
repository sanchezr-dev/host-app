import { NextApiRequest, NextApiResponse } from "next"
import { withSessionApiRoute } from "@/lib/session"

const logoutApiRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    req.session.destroy()
    res.status(200).json({ ok: true })
  } catch (error) {
    console.error(error)
    res.status(500).send("")
  }
}

export default withSessionApiRoute(logoutApiRoute)
