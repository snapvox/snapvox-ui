import Head from "next/head";

import ApplicationModal from "../components/Application";
import Navbar from "../components/Navbar";
import TermsPopup from "../components/TermsPopup";

export default function Spaces() {
  return (
    <>
      <Head>
        <title>SnapVox - The DAO Enabler on XDC</title>
        <meta charSet="utf-8" />
      </Head>

      <Navbar />
      <TermsPopup />
      <ApplicationModal />
    </>
  );
}