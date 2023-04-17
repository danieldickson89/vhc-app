import sortData from "../../services/sortData";
import utilStyles from "../../styles/utils.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpAZ,
  faArrowDownZA,
  faArrowUp19,
  faArrowDown91,
} from "@fortawesome/free-solid-svg-icons";

export default function RosterHeaders({
  tableHeaders,
  pushTableHeaders,
  players,
  pushSortedPlayers,
}: {
  tableHeaders: Header[];
  pushTableHeaders: any;
  players: Player[];
  pushSortedPlayers: any;
}) {
  // const [tableHeaders, setTableHeaders] = useState(initialTableHeaders);

  function sortPlayers(header: Header) {
    const updatedPlayersData = [...players];
    sortData(
      updatedPlayersData,
      header.title.toLowerCase(),
      header.type,
      header.sortAsc
    );
    pushSortedPlayers(updatedPlayersData);
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

  function getHeaderClassName(header: Header) {
    if (header.title === "Name") {
      return utilStyles.myTableCellLg;
    } else if (header.title === "Attending") {
      return utilStyles.myTableCellMd;
    } else {
      return utilStyles.myTableCellSm;
    }
  }

  return (
    <>
      <div className={utilStyles.myTableRow}>
        {tableHeaders.map((tableHeader: Header, index: any) => (
          <div
            className={`${getHeaderClassName(tableHeader)} ${
              utilStyles.myTableHeader
            }`}
            key={tableHeader.title}
            onClick={() => handleSortChange(index)}
          >
            {/* Need to try and figure out how to import the sortIcon component later so I can clean this up */}
            {/* <SortIcon tableHeaders={tableHeaders} index={index} /> */}
            {tableHeader.sortActive ? (
              tableHeader.type === "abc" && tableHeader.sortAsc ? (
                <FontAwesomeIcon
                  className={utilStyles.fontAwesomeIcon}
                  icon={faArrowUpAZ}
                />
              ) : tableHeader.type === "abc" && !tableHeader.sortAsc ? (
                <FontAwesomeIcon
                  className={utilStyles.fontAwesomeIcon}
                  icon={faArrowDownZA}
                />
              ) : tableHeader.type === "123" && tableHeader.sortAsc ? (
                <FontAwesomeIcon
                  className={utilStyles.fontAwesomeIcon}
                  icon={faArrowUp19}
                />
              ) : tableHeader.type === "123" && !tableHeader.sortAsc ? (
                <FontAwesomeIcon
                  className={utilStyles.fontAwesomeIcon}
                  icon={faArrowDown91}
                />
              ) : null
            ) : null}
            {tableHeader.title}
          </div>
        ))}
      </div>
    </>
  );
}
