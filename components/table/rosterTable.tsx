import utilStyles from "../../styles/utils.module.css";
import Link from "next/link";
import calculateOverall from "../../services/calculateOverall";
import { Button } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Th,
  Tbody,
  Tr,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import sortData from "@/services/sortData";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

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

  function sortPlayers(header: Header) {
    const updatedPlayersData = [...players];
    sortData(
      updatedPlayersData,
      header.title.toLowerCase(),
      header.type,
      header.sortAsc
    );
    pushPlayers(updatedPlayersData);
  }

  function handleSortChange(index: any) {
    if (tableHeaders[index].sortable) {
      const updatedTableHeaders = tableHeaders.map((header: Header, i: any) => {
        if (index === i) {
          header.sortActive = true;
          header.sortAsc = !header.sortAsc;
          sortPlayers(header);
          return header;
        } else {
          header.sortAsc = true;
          header.sortActive = false;
          return header;
        }
      });
      pushTableHeaders(updatedTableHeaders);
    }
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
    <TableContainer className={utilStyles.roundedBorder}>
      <Table variant="simple">
        <Thead>
          <Tr>
            {tableHeaders.map((tableHeader: Header, index: any) => (
              <Th
                key={tableHeader.title}
                onClick={() => handleSortChange(index)}
                className={utilStyles.tableHeader}
              >
                {tableHeader.sortActive && tableHeader.sortAsc ? (
                  <ChevronUpIcon w="4" h="4"></ChevronUpIcon>
                ) : null}
                {tableHeader.sortActive && !tableHeader.sortAsc ? (
                  <ChevronDownIcon w="4" h="4"></ChevronDownIcon>
                ) : null}
                {tableHeader.title}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {players.map((player: Player) => (
            <Tr key={player.id}>
              <Td>
                {player.attending ? (
                  <Button
                    w="4em"
                    colorScheme="cyan"
                    onClick={() => setAttendance(player.id)}
                  >
                    Yes
                  </Button>
                ) : (
                  <Button
                    w="4em"
                    colorScheme="gray"
                    onClick={() => setAttendance(player.id)}
                  >
                    No
                  </Button>
                )}
              </Td>
              <Td>
                <Link
                  href={`/players/${player.id}`}
                  className={utilStyles.playerName}
                >
                  {player.name}
                </Link>
              </Td>
              <Td>{calculateOverall(player)}</Td>
              <Td>{player.offense}</Td>
              <Td>{player.defense}</Td>
              <Td>{player.skating}</Td>
              <Td>{player.passing}</Td>
              <Td>{player.shot}</Td>
              <Td>{player.stick}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
