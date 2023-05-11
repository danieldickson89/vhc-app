import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { config } from "@fortawesome/fontawesome-svg-core";
import "../node_modules/@fortawesome/fontawesome-svg-core/styles.css";
import { Box, ChakraProvider, VStack } from "@chakra-ui/react";
import Toolbar from "@/components/toolbar/toolbar";
import { Session, createClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import Login from "@/components/login/login";

config.autoAddCss = false;

const supabase = createClient(
  "https://whyfgpsnylakwuosgrqg.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export default function App({ Component, pageProps }: AppProps) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return (
      <ChakraProvider>
        <VStack>
          <Box mt="200px">
            <Login></Login>
          </Box>
        </VStack>
      </ChakraProvider>
    );
  } else {
    return (
      <ChakraProvider>
        <VStack>
          <Component {...pageProps} />;
        </VStack>
      </ChakraProvider>
    );
  }
}
