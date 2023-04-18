import styles from "./toolbar.module.css";
import utilStyles from "../../styles/utils.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardUser,
  faHome,
  faPeopleArrows,
} from "@fortawesome/free-solid-svg-icons";
import { Flex, HStack } from "@chakra-ui/react";

export default function Toolbar() {
  return (
    <Flex
      as="header"
      position="fixed"
      w="100%"
      h="3em"
      backgroundColor="cyan.500"
      justify="center"
      zIndex="9999"
    >
      <HStack spacing="4">
        <Link href={`/players/roster`} className={styles.navbarItem}>
          <FontAwesomeIcon
            className={utilStyles.fontAwesomeIcon}
            icon={faClipboardUser}
          />
          Roster
        </Link>
        <Link href={`/`} className={styles.navbarItem}>
          <FontAwesomeIcon
            className={utilStyles.fontAwesomeIcon}
            icon={faHome}
          />
          VHC
        </Link>
        <Link href={`/teams/setTeams`} className={styles.navbarItem}>
          <FontAwesomeIcon
            className={utilStyles.fontAwesomeIcon}
            icon={faPeopleArrows}
          />
          Teams
        </Link>
      </HStack>
    </Flex>
  );
}
