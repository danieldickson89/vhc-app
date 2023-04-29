import Head from "next/head";
import { Inter } from "next/font/google";
import utilStyles from "../styles/utils.module.css";
import { VStack } from "@chakra-ui/react";
import Weclome from "@/components/welcome/welcome";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <VStack>
      <Head>
        <title>VHC</title>
      </Head>
      <div className={utilStyles.homePageSpacer}></div>
      <Weclome></Weclome>
    </VStack>
  );
}
