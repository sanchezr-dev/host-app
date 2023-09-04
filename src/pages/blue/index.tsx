import { withSessionSsr } from "@/lib/session"
import { GetServerSideProps } from "next"
import dynamic from "next/dynamic"
// @ts-ignore
const RemotePage = dynamic(() => import("blue-app/home"))

const BlueHomePage = (props: any) => {
  return <RemotePage {...props} />
}

export const getServerSideProps: GetServerSideProps = withSessionSsr(
  async function getServerSideProps(context) {
    // @ts-ignore
    const remotePage = await import("blue-app/home")

    if (remotePage.getServerSideProps) {
      const remotePageProps = await remotePage.getServerSideProps(context)
      return remotePageProps
    }

    return {
      props: {},
    }
  },
)

export default BlueHomePage
