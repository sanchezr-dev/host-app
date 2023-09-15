import type { NextApiRequest, NextApiResponse } from "next"
import { withSessionApiRoute } from "@/lib/session"
import FetchJson from "@/lib/fetchJson"

// import dynamic from "next/dynamic"
// @ts-ignore
// const RemoteApiRoute = dynamic(() => import("products/api"))

// const remoteApiRoute = (
//   await import(
//     // @ts-ignore
//     "products/api"
//   )
// ).default

// @ts-ignore
// const RemoteApiRoute = dynamic(
//   // @ts-ignore
//   () => import("products_services/getProductsApiRoute"),
// )

// const remoteApiRoute = (
//   await import(
//     // @ts-ignore
//     "products_services/getProductsApiRoute"
//   )
// ).default

const getProductsApiRoute = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  // @ts-ignore
  // const remoteApiRoute = await import("products/api")

  // const remoteApiRoute = await import(
  //   // @ts-ignore
  //   "products_services/getProductsApiRoute"
  // )

  const { category } = req.query
  const apiUrl = `${process.env.PRODUCTS_APP_BASE_URL}/api/products?category=${category}`
  const products = await FetchJson.get(apiUrl, req.session.data?.accessToken)
  res.status(200).json(products)
}

export default withSessionApiRoute(getProductsApiRoute)
