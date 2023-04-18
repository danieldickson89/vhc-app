import Head from "next/head";
import { Inter } from "next/font/google";
import utilStyles from "../styles/utils.module.css";
import { VStack } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <VStack>
      <Head>
        <title>VHC</title>
      </Head>
      <div className={utilStyles.homePageSpacer}></div>
      <Text as="b" fontSize="3xl">
        Welcome to Vagrant Hockey Club!
      </Text>
    </VStack>
  );
}
