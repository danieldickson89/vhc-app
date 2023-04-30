import { SimpleGrid, Table, Thead, Th, Tbody, Tr, Td } from "@chakra-ui/react";
import calculateOverall from "@/services/calculateOverall";

export default function PlayerPopoverStats({ player }: { player: Player }) {
  return (
    <SimpleGrid>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Overall</Th>
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
            <Td>{calculateOverall(player)}</Td>
            <Td>{player.offense}</Td>
            <Td>{player.defense}</Td>
            <Td>{player.skating}</Td>
            <Td>{player.passing}</Td>
            <Td>{player.shot}</Td>
            <Td>{player.stick}</Td>
          </Tr>
        </Tbody>
      </Table>
    </SimpleGrid>
  );
}
