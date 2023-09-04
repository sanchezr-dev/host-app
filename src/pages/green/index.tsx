import { withSessionSsr } from "@/lib/session"
import { GetServerSideProps } from "next"
import dynamic from "next/dynamic"
// @ts-ignore
const RemotePage = dynamic(() => import("green-app/home"))

const GreenHomePage = (props: any) => {
  return <RemotePage {...props} />
}

export const getServerSideProps: GetServerSideProps = withSessionSsr(
  async function getServerSideProps(context) {
    // @ts-ignore
    const remotePage = await import("green-app/home")

    if (remotePage.getServerSideProps) {
      const remotePageProps = await remotePage.getServerSideProps(context)
      return remotePageProps
    }

    return {
      props: {},
    }
  },
)

export default GreenHomePage
