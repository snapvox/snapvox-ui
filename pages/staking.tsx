import Head from "next/head";

import Staking from "../components/Staking";

export default function Home () {
  return (
    <>
      <Head>
        <title>SnapVox - The DAO Enabler on XDC</title>
        <meta charSet="utf-8" />
      </Head>

      <Staking />
    </>
  )
}
