import styles from "./toolbar.module.css";
import utilStyles from "../../styles/utils.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardUser,
  faHome,
  faPeopleArrows,
} from "@fortawesome/free-solid-svg-icons";

export default function Toolbar() {
  return (
    <div className={`${styles.navbar}`}>
      <Link href={`/players/roster`} className={styles.navbarItem}>
        <FontAwesomeIcon
          className={utilStyles.fontAwesomeIcon}
          icon={faClipboardUser}
        />
        Roster
      </Link>
      <Link href={`/`} className={styles.navbarItem}>
        <FontAwesomeIcon className={utilStyles.fontAwesomeIcon} icon={faHome} />
        Home
      </Link>
      <Link href={`/teams/setTeams`} className={styles.navbarItem}>
        <FontAwesomeIcon
          className={utilStyles.fontAwesomeIcon}
          icon={faPeopleArrows}
        />
        Pick Teams
      </Link>
    </div>
  );
}
