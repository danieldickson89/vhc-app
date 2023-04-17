import utilStyles from "../../styles/utils.module.css";
import Link from "next/link";
import calculateOverall from "../../services/calculateOverall";
import RosterHeaders from "./rosterHeaders";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

export default function RosterTable({
  tableHeaders,
  pushTableHeaders,
  players,
  pushPlayers,
  apiBaseUrl,
}: {
  tableHeaders: Header[];
  pushTableHeaders: any;
  players: Player[];
  pushPlayers: any;
  apiBaseUrl: string;
}) {
  const router = useRouter();

  const pullSortedPlayers = (playersSorted: Player[]) => {
    pushPlayers(playersSorted);
  };

  const pullTableHeaders = (updatedTableHeaders: Header[]) => {
    pushTableHeaders(updatedTableHeaders);
  };

  function isAttending(attending: boolean) {
    if (attending) {
      return (
        <button
          className={`${utilStyles.attendingButton} ${utilStyles.myFormButtonSeafoam}`}
        >
          Yes
        </button>
      );
    }
    return (
      <button
        className={`${utilStyles.attendingButton} ${utilStyles.myFormButtonGray}`}
      >
        No
      </button>
    );
  }

  function setAttendance(id: string) {
    const nextPlayers = players.map((player: Player) => {
      if (player.id === id) {
        togglePlayerAttendance(player);
        player.attending = !player.attending;
        return player;
      } else {
        return player;
      }
    });
    pushPlayers(nextPlayers);
  }

  async function togglePlayerAttendance(updatedPlayer: Player) {
    const toggledPlayer = {
      name: updatedPlayer.name,
      offense: updatedPlayer.offense,
      defense: updatedPlayer.defense,
      skating: updatedPlayer.skating,
      passing: updatedPlayer.passing,
      shot: updatedPlayer.shot,
      stick: updatedPlayer.stick,
      attending: !updatedPlayer.attending,
    };
    const reqUrl = `${apiBaseUrl}player?id=${updatedPlayer.id}`;
    await fetch(reqUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toggledPlayer),
    });
  }

  return (
    <>
      <div className={utilStyles.myTable}>
        <RosterHeaders
          pushSortedPlayers={pullSortedPlayers}
          players={players}
          pushTableHeaders={pullTableHeaders}
          tableHeaders={tableHeaders}
        ></RosterHeaders>

        {Array.isArray(players)
          ? players.map((player: Player) => (
              <div
                className={`${utilStyles.myTableRow} ${utilStyles.myTableDataRow}`}
                key={player.id}
              >
                <div
                  className={utilStyles.myTableCellMd}
                  onClick={() => setAttendance(player.id)}
                >
                  {isAttending(player.attending)}
                </div>
                <div className={utilStyles.myTableCellLg}>
                  <Link
                    href={`/players/${player.id}`}
                    className={utilStyles.playerName}
                  >
                    {player.name}
                  </Link>
                </div>
                <div className={utilStyles.myTableCellSm}>
                  {calculateOverall(player)}
                </div>
                <div className={`${utilStyles.myTableCellSm}`}>
                  {player.offense}
                </div>
                <div className={`${utilStyles.myTableCellSm}`}>
                  {player.defense}
                </div>
                <div className={`${utilStyles.myTableCellSm}`}>
                  {player.skating}
                </div>
                <div className={`${utilStyles.myTableCellSm}`}>
                  {player.passing}
                </div>
                <div className={`${utilStyles.myTableCellSm}`}>
                  {player.shot}
                </div>
                <div className={`${utilStyles.myTableCellSm}`}>
                  {player.stick}
                </div>
              </div>
            ))
          : null}
      </div>
    </>
  );
}
