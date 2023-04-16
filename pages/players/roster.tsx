import Head from "next/head";
import utilStyles from "../../styles/utils.module.css";
import Toolbar from "../../components/toolbar/toolbar";
import RosterTable from "../../components/table/rosterTable";
import { useState } from "react";
import Link from "next/link";

export async function getServerSideProps() {
  // Trying to find a way to have the GET call use whatever current header is active
  // But I'm still not sure how to do that since getServerSideProps is called once, and I can't access
  // tableHeaders at this point yet.
  let sortBy = "";
  let sortType = "";
  let sortAsc;
  for (let i = 0; i < initialTableHeaders.length; i++) {
    if (initialTableHeaders[i].sortActive === true) {
      sortBy = initialTableHeaders[i].title.toLowerCase();
      sortType = initialTableHeaders[i].type;
      sortAsc = initialTableHeaders[i].sortAsc;
    }
  }
  const apiBaseUrl = process.env.API_BASE_URL;
  let res = await fetch(
    // `${apiBaseUrl}players?sortBy=${sortBy}&sortType=${sortType}&sortAsc=${sortAsc}`,
    `${apiBaseUrl}players`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  let data = await res.json();
  let players: Player[] = data.response.data;
  return {
    props: { players, apiBaseUrl },
  };
}

let initialTableHeaders: Header[] = [
  {
    title: "Attending",
    type: "123",
    sortable: true,
    sortActive: false,
    sortAsc: true,
  },
  {
    title: "Name",
    type: "abc",
    sortable: true,
    sortActive: true,
    sortAsc: true,
  },
  {
    title: "Overall",
    type: "123",
    sortable: true,
    sortActive: false,
    sortAsc: true,
  },
  {
    title: "Offense",
    type: "123",
    sortable: true,
    sortActive: false,
    sortAsc: true,
  },
  {
    title: "Defense",
    type: "123",
    sortable: true,
    sortActive: false,
    sortAsc: true,
  },
  {
    title: "Skating",
    type: "123",
    sortable: true,
    sortActive: false,
    sortAsc: true,
  },
  {
    title: "Passing",
    type: "123",
    sortable: true,
    sortActive: false,
    sortAsc: true,
  },
  {
    title: "Shot",
    type: "123",
    sortable: true,
    sortActive: false,
    sortAsc: true,
  },
  {
    title: "Stick",
    type: "123",
    sortable: true,
    sortActive: false,
    sortAsc: true,
  },
];

export default function Roster({
  players,
  apiBaseUrl,
}: {
  players: Player[];
  apiBaseUrl: string;
}) {
  const [currentPlayers, setPlayers] = useState<Player[]>(players);
  const [tableHeaders, setTableHeaders] =
    useState<Header[]>(initialTableHeaders);

  const pullPlayers = (playersSorted: Player[]) => {
    setPlayers(playersSorted);
  };

  const pullTableHeaders = (updatedTableHeaders: Header[]) => {
    setTableHeaders(updatedTableHeaders);
  };

  return (
    <>
      <Head>
        <title>VHC</title>
      </Head>

      <div className={utilStyles.container}>
        <Toolbar></Toolbar>
        <div className={utilStyles.navbarSpacer}></div>
        <button
          className={`${utilStyles.myFormButton} ${utilStyles.myFormButtonNew}`}
        >
          <Link href="/players/newPlayer">+ Add Player</Link>
        </button>
        <RosterTable
          players={currentPlayers}
          pushPlayers={pullPlayers}
          tableHeaders={tableHeaders}
          pushTableHeaders={pullTableHeaders}
          apiBaseUrl={apiBaseUrl}
        ></RosterTable>
      </div>
    </>
  );
}
