import Head from "next/head";
import { Inter } from "next/font/google";
import utilStyles from "../styles/utils.module.css";
import Toolbar from "../components/toolbar/toolbar";
import { supabase } from "./../lib/supabaseClient";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ players }: any) {
  return (
    <>
      <Head>
        <title>VHC</title>
      </Head>

      <div className={utilStyles.container}>
        <Toolbar></Toolbar>
        <div className={utilStyles.navbarSpacer}></div>
        <h2>Welcome to Vagrant Hockey Club!</h2>
      </div>
      <ul>
        {players.map((player: any) => (
          <li key={player.id}>{player.name}</li>
        ))}
      </ul>
    </>
  );
}

export async function getServerSideProps() {
  let { data } = await supabase.from("players").select();

  return {
    props: {
      players: data,
    },
  };
}
