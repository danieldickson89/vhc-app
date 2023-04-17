import Head from "next/head";
import { Inter } from "next/font/google";
import utilStyles from "../styles/utils.module.css";
import Toolbar from "../components/toolbar/toolbar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>VHC</title>
      </Head>

      <div className={utilStyles.container}>
        <Toolbar></Toolbar>
        <div className={utilStyles.homePageSpacer}></div>
        <h2>Welcome to Vagrant Hockey Club!</h2>
      </div>
    </>
  );
}
