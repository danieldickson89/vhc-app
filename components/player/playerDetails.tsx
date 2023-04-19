import utilStyles from "../../styles/utils.module.css";
import Toolbar from "../../components/toolbar/toolbar";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import {
  Button,
  HStack,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  SimpleGrid,
  Container,
  VStack,
} from "@chakra-ui/react";

export default function PlayerDetails({
  player,
  isNew,
  apiBaseUrl,
}: {
  player: Player;
  isNew: boolean;
  apiBaseUrl: string;
}) {
  const router = useRouter();

  let [currName, setName] = useState<string>(isNew ? "" : player.name);
  let [currOffense, setOffense] = useState<number>(isNew ? 60 : player.offense);
  let [currDefense, setDefense] = useState<number>(isNew ? 60 : player.defense);
  let [currSkating, setSkating] = useState<number>(isNew ? 60 : player.skating);
  let [currPassing, setPassing] = useState<number>(isNew ? 60 : player.passing);
  let [currShot, setShot] = useState<number>(isNew ? 60 : player.shot);
  let [currStick, setStick] = useState<number>(isNew ? 60 : player.stick);

  async function savePlayer() {
    const currPlayer = {
      name: currName,
      offense: currOffense,
      defense: currDefense,
      skating: currSkating,
      passing: currPassing,
      shot: currShot,
      stick: currStick,
      attending: isNew ? true : player.attending,
    };
    const reqUrl = isNew
      ? `${apiBaseUrl}player`
      : `${apiBaseUrl}player?id=${player.id}`;
    await fetch(reqUrl, {
      method: isNew ? "POST" : "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currPlayer),
    });
    router.push("/players/roster");
  }

  async function deletePlayer() {
    const reqUrl = `${apiBaseUrl}player?id=${player.id}`;
    await fetch(reqUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    router.push("/players/roster");
  }

  return (
    <Container>
      <VStack>
        <SimpleGrid w="20em" mt="4em" columns={2} spacingY={3}>
          <label>Full Name </label>
          <Input
            w="12em"
            defaultValue={currName}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Offense </label>
          <NumberInput
            defaultValue={currOffense}
            size="md"
            maxW={20}
            min={0}
            max={100}
            onChange={(valueString) => setOffense(+valueString)}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <label>Defense </label>
          <NumberInput
            defaultValue={currDefense}
            size="md"
            maxW={20}
            min={0}
            max={100}
            onChange={(valueString) => setDefense(+valueString)}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <label>Skating </label>
          <NumberInput
            defaultValue={currSkating}
            size="md"
            maxW={20}
            min={0}
            max={100}
            onChange={(valueString) => setSkating(+valueString)}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <label>Passing </label>
          <NumberInput
            defaultValue={currPassing}
            size="md"
            maxW={20}
            min={0}
            max={100}
            onChange={(valueString) => setPassing(+valueString)}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <label>Shot </label>
          <NumberInput
            defaultValue={currShot}
            size="md"
            maxW={20}
            min={0}
            max={100}
            onChange={(valueString) => setShot(+valueString)}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <label>Stick </label>
          <NumberInput
            defaultValue={currStick}
            size="md"
            maxW={20}
            min={0}
            max={100}
            onChange={(valueString) => setStick(+valueString)}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </SimpleGrid>
      </VStack>
      <HStack mt="5" justify="center">
        <Button w="7em" colorScheme="gray">
          <Link href={`/players/roster`}>Cancel</Link>
        </Button>
        {!isNew ? (
          <Button w="7em" colorScheme="red" onClick={deletePlayer}>
            Delete
          </Button>
        ) : null}

        <Button w="7em" colorScheme="cyan" textColor="white" onClick={savePlayer}>
          Save
        </Button>
      </HStack>
    </Container>
  );
}
