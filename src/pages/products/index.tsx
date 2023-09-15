import { withSessionSsr } from "@/lib/session"
import { GetServerSideProps } from "next"
import dynamic from "next/dynamic"
// @ts-ignore
const RemotePage = dynamic(() => import("products/home"))

const ProductsHomePage = (props: any) => {
  return <RemotePage {...props} />
}

export const getServerSideProps: GetServerSideProps = withSessionSsr(
  async function getServerSideProps(context) {
    // @ts-ignore
    const remotePage = await import("products/home")

    if (remotePage.getServerSideProps) {
      const remotePageProps = await remotePage.getServerSideProps(context)
      return remotePageProps
    }

    return {
      props: {},
    }
  },
)

export default ProductsHomePage
