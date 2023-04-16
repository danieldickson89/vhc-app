import Head from "next/head";
import PlayerDetails from "../../components/player/playerDetails";

export async function getServerSideProps() {
  const apiBaseUrl = process.env.API_BASE_URL;
  return {
    props: { apiBaseUrl },
  };
}

export default function Player({
  player,
  apiBaseUrl,
}: {
  player: Player;
  apiBaseUrl: string;
}) {
  return (
    <>
      <Head>
        <title>VHC</title>
      </Head>
      <PlayerDetails
        player={player}
        isNew={true}
        apiBaseUrl={apiBaseUrl}
      ></PlayerDetails>
    </>
  );
}
