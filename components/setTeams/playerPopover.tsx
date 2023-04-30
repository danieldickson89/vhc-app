import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
import PlayerPopoverStats from "./playerPopoverStats";

export default function PlayerPopover({ player }: { player: Player }) {
  return (
    <Popover>
      <PopoverTrigger>
        <Button w="10em">{player.name}</Button>
      </PopoverTrigger>
      <PopoverContent w="40em">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Stats for {player.name}:</PopoverHeader>
        <PopoverBody>
          <PlayerPopoverStats player={player}></PlayerPopoverStats>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
