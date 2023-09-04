import type { NextApiRequest, NextApiResponse } from "next"
import { withSessionApiRoute } from "@/lib/session"
import FetchJson from "@/lib/fetchJson"

const getProductsApiRoute = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const { category } = req.query
  const apiUrl = `${process.env.BLUE_APP_BASE_URL}/api/products?category=${category}`
  const products = await FetchJson.get(apiUrl, req.session.data?.accessToken)
  res.status(200).json(products)
}

export default withSessionApiRoute(getProductsApiRoute)
