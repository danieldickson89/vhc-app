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
}: any) {
  const router = useRouter();

  const pullSortedPlayers = (playersSorted: any) => {
    pushPlayers(playersSorted);
  };

  const pullTableHeaders = (updatedTableHeaders: any) => {
    pushTableHeaders(updatedTableHeaders);
  };

  function isAttending(attending: boolean) {
    if (attending) {
      return (
        <button
          className={`${utilStyles.attendingButton} ${utilStyles.myFormButtonSave}`}
        >
          Yes
        </button>
      );
    }
    return (
      <button
        className={`${utilStyles.attendingButton} ${utilStyles.myFormButtonRed}`}
      >
        No
      </button>
    );
  }

  function setAttendance(index: Number) {
    const nextPlayers = players.map((player: any, i: any) => {
      if (i === index) {
        togglePlayerAttendance(player);
        player.attending = !player.attending;
        return player;
      } else {
        return player;
      }
    });
    pushPlayers(nextPlayers);
  }

  async function togglePlayerAttendance(updatedPlayer: any) {
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
    const reqUrl = `${apiBaseUrl}player?id=${updatedPlayer._id}`;
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

        {players.map(
          (
            {
              _id,
              name,
              offense,
              defense,
              skating,
              passing,
              shot,
              stick,
              attending,
            }: any,
            index: any
          ) => (
            <div
              className={`${utilStyles.myTableRow} ${utilStyles.myTableDataRow}`}
              key={name}
            >
              <div
                className={utilStyles.myTableCellMd}
                onClick={() => setAttendance(index)}
              >
                {isAttending(attending)}
              </div>
              <div className={utilStyles.myTableCellLg}>
                <Link
                  href={`/players/${_id}`}
                  className={utilStyles.playerName}
                >
                  {name}
                </Link>
              </div>
              <div className={utilStyles.myTableCellSm}>
                {calculateOverall(players[index])}
              </div>
              <div className={`${utilStyles.myTableCellSm}`}>{offense}</div>
              <div className={`${utilStyles.myTableCellSm}`}>{defense}</div>
              <div className={`${utilStyles.myTableCellSm}`}>{skating}</div>
              <div className={`${utilStyles.myTableCellSm}`}>{passing}</div>
              <div className={`${utilStyles.myTableCellSm}`}>{shot}</div>
              <div className={`${utilStyles.myTableCellSm}`}>{stick}</div>
            </div>
          )
        )}
      </div>
    </>
  );
}
