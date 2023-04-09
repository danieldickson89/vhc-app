import utilStyles from "../../styles/utils.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpAZ,
  faArrowDownZA,
  faArrowUp19,
  faArrowDown91,
} from "@fortawesome/free-solid-svg-icons";

export default function SortIcon({ tableHeaders, index }: any) {
  for (let i = 0; i < tableHeaders.length; i++) {
    if (tableHeaders[index].sortActive) {
      if (tableHeaders[index].type === "abc" && tableHeaders[index].sortAsc) {
        return (
          <FontAwesomeIcon
            className={utilStyles.fontAwesomeIcon}
            icon={faArrowUpAZ}
          />
        );
      } else if (
        tableHeaders[index].type === "abc" &&
        !tableHeaders[index].sortAsc
      ) {
        return (
          <FontAwesomeIcon
            className={utilStyles.fontAwesomeIcon}
            icon={faArrowDownZA}
          />
        );
      } else if (
        tableHeaders[index].type === "123" &&
        tableHeaders[index].sortAsc
      ) {
        return (
          <FontAwesomeIcon
            className={utilStyles.fontAwesomeIcon}
            icon={faArrowUp19}
          />
        );
      } else if (
        tableHeaders[index].type === "123" &&
        !tableHeaders[index].sortAsc
      ) {
        return (
          <FontAwesomeIcon
            className={utilStyles.fontAwesomeIcon}
            icon={faArrowDown91}
          />
        );
      }
    }
    return;
  }
}
