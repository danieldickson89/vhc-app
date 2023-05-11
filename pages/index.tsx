import Head from "next/head";
import utilStyles from "../styles/utils.module.css";
import { VStack } from "@chakra-ui/react";
import Weclome from "@/components/welcome/welcome";
import Toolbar from "@/components/toolbar/toolbar";

export default function Home() {
  return (
    <VStack>
      <Head>
        <title>VHC</title>
      </Head>
      <Toolbar></Toolbar>
      <div className={utilStyles.homePageSpacer}></div>
      <Weclome></Weclome>
    </VStack>
  );
}
