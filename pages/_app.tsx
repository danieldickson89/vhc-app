import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { config } from "@fortawesome/fontawesome-svg-core";
import "../node_modules/@fortawesome/fontawesome-svg-core/styles.css";
import { ChakraProvider, VStack } from "@chakra-ui/react";
import Toolbar from "@/components/toolbar/toolbar";

config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <VStack>
        <Toolbar></Toolbar>
        <Component {...pageProps} />;
      </VStack>
    </ChakraProvider>
  );
}
