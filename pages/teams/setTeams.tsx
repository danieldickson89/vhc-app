import Head from "next/head";
import utilStyles from "../../styles/utils.module.css";
import Toolbar from "../../components/toolbar/toolbar";
import { useState } from "react";
import {
  Box,
  Button,
  HStack,
  SimpleGrid,
  Text,
  VStack,
  Table,
  Thead,
  Th,
  Tbody,
  Tr,
  Td,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
import PlayerPopoverStats from "@/components/setTeams/playerPopoverStats";
import PlayerPopover from "@/components/setTeams/playerPopover";

export async function getServerSideProps() {
  const apiBaseUrl = process.env.API_BASE_URL;
  let res = await fetch(`${apiBaseUrl}attendingPlayers`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const apiRes = await res.json();
  const players = apiRes.response.data;
  return {
    props: { players, apiBaseUrl },
  };
}

export default function SetTeams({
  players,
  apiBaseUrl,
}: {
  players: Player[];
  apiBaseUrl: string;
}) {
  const [noTeamPlayers, setNoTeamPlayers] = useState<Player[]>(players);
  const [teamOne, setTeamOne] = useState<Player[]>([]);
  const [teamTwo, setTeamTwo] = useState<Player[]>([]);
  const [teamOneAvgs, setTeamOneAvgs] = useState<number[]>([0, 0, 0, 0, 0, 0]);
  const [teamTwoAvgs, setTeamTwoAvgs] = useState<number[]>([0, 0, 0, 0, 0, 0]);

  const overallAvgs = findAverages(players);

  function addToTeam(action: string, player: Player) {
    switch (action) {
      case "addToOne":
        setTeamOne([...teamOne, player]);
        setTeamTwo(teamTwo.filter((a) => a.id !== player.id));
        setNoTeamPlayers(noTeamPlayers.filter((a) => a.id !== player.id));
        const newTeamOneAvgs = findAverages([...teamOne, player]);
        setTeamOneAvgs(newTeamOneAvgs);
        break;
      case "addToTwo":
        setTeamTwo([...teamTwo, player]);
        setTeamOne(teamOne.filter((a) => a.id !== player.id));
        setNoTeamPlayers(noTeamPlayers.filter((a) => a.id !== player.id));
        const newTeamTwoAvgs = findAverages([...teamTwo, player]);
        setTeamTwoAvgs(newTeamTwoAvgs);
        break;
      case "removeFromOne":
        setNoTeamPlayers([...noTeamPlayers, player]);
        if (Object.keys(teamOne).length === 1) {
          const newTeamAvgs = [0, 0, 0, 0, 0, 0];
          setTeamOneAvgs(newTeamAvgs);
        } else {
          const teamFiltered = teamOne.filter((a) => a.id !== player.id);
          const newTeamAvgs = findAverages(teamFiltered);
          setTeamOneAvgs(newTeamAvgs);
        }
        setTeamOne(teamOne.filter((a) => a.id !== player.id));
        break;
      case "removeFromTwo":
        setNoTeamPlayers([...noTeamPlayers, player]);
        if (Object.keys(teamTwo).length === 1) {
          const newTeamAvgs = [0, 0, 0, 0, 0, 0];
          setTeamTwoAvgs(newTeamAvgs);
        } else {
          const teamFiltered = teamTwo.filter((a) => a.id !== player.id);
          const newTeamAvgs = findAverages(teamFiltered);
          setTeamTwoAvgs(newTeamAvgs);
        }
        setTeamTwo(teamTwo.filter((a) => a.id !== player.id));
        break;
      case "switchToTwo":
        setTeamTwo([...teamTwo, player]);
        if (Object.keys(teamOne).length === 1) {
          const newTeamAvgs = [0, 0, 0, 0, 0, 0];
          setTeamOneAvgs(newTeamAvgs);
        } else {
          const teamFiltered = teamOne.filter((a) => a.id !== player.id);
          const newTeamOneAvgs = findAverages(teamFiltered);
          setTeamOneAvgs(newTeamOneAvgs);
        }
        const newSwitchTwoAvgs = findAverages([...teamTwo, player]);
        setTeamTwoAvgs(newSwitchTwoAvgs);
        setTeamOne(teamOne.filter((a) => a.id !== player.id));
        break;
      case "switchToOne":
        setTeamOne([...teamOne, player]);
        setTeamTwo(teamTwo.filter((a) => a.id !== player.id));
        if (Object.keys(teamTwo).length === 1) {
          const newTeamAvgs = [0, 0, 0, 0, 0, 0];
          setTeamTwoAvgs(newTeamAvgs);
        } else {
          const teamFiltered = teamTwo.filter((a) => a.id !== player.id);
          const newTeamTwoAvgs = findAverages(teamFiltered);
          setTeamTwoAvgs(newTeamTwoAvgs);
        }
        const newSwitchOneAvgs = findAverages([...teamOne, player]);
        setTeamOneAvgs(newSwitchOneAvgs);
        break;
    }
  }

  function resetTeams() {
    setNoTeamPlayers(players);
    setTeamOne([]);
    setTeamTwo([]);
    setTeamOneAvgs([0, 0, 0, 0, 0, 0]);
    setTeamTwoAvgs([0, 0, 0, 0, 0, 0]);
  }

  function findAverages(team: Player[]) {
    const totalPlayers = Object.keys(team).length;
    let teamAverages = [0, 0, 0, 0, 0, 0];
    team.map((player: Player) => {
      teamAverages[0] += player.offense;
      teamAverages[1] += player.defense;
      teamAverages[2] += player.skating;
      teamAverages[3] += player.passing;
      teamAverages[4] += player.shot;
      teamAverages[5] += player.stick;
    });
    teamAverages[0] = Math.round((teamAverages[0] / totalPlayers) * 10) / 10;
    teamAverages[1] = Math.round((teamAverages[1] / totalPlayers) * 10) / 10;
    teamAverages[2] = Math.round((teamAverages[2] / totalPlayers) * 10) / 10;
    teamAverages[3] = Math.round((teamAverages[3] / totalPlayers) * 10) / 10;
    teamAverages[4] = Math.round((teamAverages[4] / totalPlayers) * 10) / 10;
    teamAverages[5] = Math.round((teamAverages[5] / totalPlayers) * 10) / 10;

    return teamAverages;
  }

  function findNextPlayer(team: Player[], averages: number[]) {
    let sumDiff: number | null;
    let nextPlayer: Player = team[0];
    let potentialTeamAvgs;
    noTeamPlayers.map((player: Player) => {
      potentialTeamAvgs = findAverages([...team, player]);
      let teamAvgDiff =
        Math.abs(potentialTeamAvgs[0] - averages[0]) +
        Math.abs(potentialTeamAvgs[1] - averages[1]) +
        Math.abs(potentialTeamAvgs[2] - averages[2]) +
        Math.abs(potentialTeamAvgs[3] - averages[3]) +
        Math.abs(potentialTeamAvgs[4] - averages[4]) +
        Math.abs(potentialTeamAvgs[5] - averages[5]);
      if (sumDiff == null || teamAvgDiff < sumDiff) {
        sumDiff = teamAvgDiff;
        nextPlayer = player;
      }
    });
    return nextPlayer;
  }

  function autoFillNextPlayer() {
    if (Object.keys(noTeamPlayers).length > 0) {
      let nextPlayer: Player | null;
      const teamOneCurrAvgs = findAverages(teamOne);
      const teamTwoCurrAvgs = findAverages(teamTwo);
      if (Object.keys(teamOne).length < Object.keys(teamTwo).length) {
        nextPlayer = findNextPlayer(teamOne, teamTwoCurrAvgs);
        addToTeam("addToOne", nextPlayer);
      } else if (Object.keys(teamTwo).length < Object.keys(teamOne).length) {
        nextPlayer = findNextPlayer(teamTwo, teamOneCurrAvgs);
        addToTeam("addToTwo", nextPlayer);
      } else {
        nextPlayer = findNextPlayer(teamOne, teamTwoCurrAvgs);
        addToTeam("addToOne", nextPlayer);
      }
    }
  }

  function overallAvgDiff(team: string, index: number) {
    if (team === "Team 1") {
      return Math.round((teamOneAvgs[index] - overallAvgs[index]) * 10) / 10;
    } else {
      return Math.round((teamTwoAvgs[index] - overallAvgs[index]) * 10) / 10;
    }
  }

  return (
    <VStack>
      <Head>
        <title>VHC</title>
      </Head>
      <HStack mt="4em">
        <Button w="8em" onClick={() => resetTeams()}>
          Reset
        </Button>
        <Button w="8em" onClick={() => autoFillNextPlayer()}>
          Autofill
        </Button>
      </HStack>
      <HStack spacing="5" p="3" className={utilStyles.roundedBorder}>
        <Table>
          <Thead>
            <Tr>
              <Th>Team</Th>
              <Th>Offense</Th>
              <Th>Defense</Th>
              <Th>Skating</Th>
              <Th>Passing</Th>
              <Th>Shot</Th>
              <Th>Stick</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Overall</Td>
              {overallAvgs.map((avg, index) => (
                <Td key={index}>{avg}</Td>
              ))}
            </Tr>
            <Tr>
              <Td>Team 1</Td>
              {teamOneAvgs.map((avg, index) => (
                <Td key={index}>
                  <HStack>
                    <Box>{avg}</Box>
                    {teamOne.length > 0 ? (
                      <Box
                        textColor={
                          overallAvgDiff("Team 1", index) < 0
                            ? "red.400"
                            : "green.400"
                        }
                      >
                        ({overallAvgDiff("Team 1", index)})
                      </Box>
                    ) : null}
                  </HStack>
                </Td>
              ))}
            </Tr>
            <Tr>
              <Td>Team 2</Td>
              {teamTwoAvgs.map((avg, index) => (
                <Td key={index}>
                  <HStack>
                    <Box>{avg}</Box>
                    {teamTwo.length > 0 ? (
                      <Box
                        textColor={
                          overallAvgDiff("Team 2", index) < 0
                            ? "red.400"
                            : "green.400"
                        }
                      >
                        ({overallAvgDiff("Team 2", index)})
                      </Box>
                    ) : null}
                  </HStack>
                </Td>
              ))}
            </Tr>
          </Tbody>
        </Table>
      </HStack>
      <SimpleGrid columns={3}>
        <Box
          className={utilStyles.roundedBorder}
          overflowY="auto"
          maxHeight="40em"
          m="3"
          pb="3"
          minH="16em"
        >
          <Text
            position="sticky"
            top={0}
            fontWeight="bold"
            fontSize="xl"
            bgColor="gray.100"
            p="2"
            zIndex={9998}
          >
            Unassigned Players
          </Text>
          {noTeamPlayers.map((player: Player) => (
            <HStack mt="2" pl="3" pr="3" spacing="3" key={player.id}>
              <Button
                w="5em"
                colorScheme="cyan"
                textColor="white"
                onClick={() => addToTeam("addToOne", player)}
              >
                Team 1
              </Button>
              <Button
                w="5em"
                colorScheme="yellow"
                onClick={() => addToTeam("addToTwo", player)}
              >
                Team 2
              </Button>
              <PlayerPopover player={player}></PlayerPopover>
            </HStack>
          ))}
        </Box>
        <Box
          className={utilStyles.roundedBorder}
          overflowY="auto"
          maxHeight="40em"
          m="3"
          pb="3"
          minH="16em"
        >
          <Text
            position="sticky"
            top={0}
            fontWeight="bold"
            fontSize="xl"
            bgColor="gray.100"
            p="2"
            zIndex={9998}
          >
            Team 1
          </Text>
          {teamOne.map((player, index) => (
            <HStack mt="2" pl="3" pr="3" spacing="3" key={player.id}>
              <Button
                w="5em"
                onClick={() => addToTeam("removeFromOne", player)}
              >
                Remove
              </Button>
              <Button
                w="5em"
                colorScheme="yellow"
                onClick={() => addToTeam("switchToTwo", player)}
              >
                Switch
              </Button>
              <PlayerPopover player={player}></PlayerPopover>
            </HStack>
          ))}
        </Box>
        <Box
          className={utilStyles.roundedBorder}
          overflowY="auto"
          maxHeight="40em"
          m="3"
          pb="3"
          minH="16em"
        >
          <Text
            position="sticky"
            top={0}
            fontWeight="bold"
            fontSize="xl"
            bgColor="gray.100"
            p="2"
            zIndex={9998}
          >
            Team 2
          </Text>
          {teamTwo.map((player, index) => (
            <HStack mt="2" pl="3" pr="3" spacing="3" key={player.id}>
              <Button
                w="5em"
                onClick={() => addToTeam("removeFromTwo", player)}
              >
                Remove
              </Button>
              <Button
                w="5em"
                colorScheme="cyan"
                textColor="white"
                onClick={() => addToTeam("switchToOne", player)}
              >
                Switch
              </Button>
              <PlayerPopover player={player}></PlayerPopover>
            </HStack>
          ))}
        </Box>
      </SimpleGrid>
    </VStack>
  );
}
