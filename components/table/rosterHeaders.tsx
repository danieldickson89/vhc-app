import sortData from "../../services/sortData";
import utilStyles from "../../styles/utils.module.css";
import SortIcon from "./sortIcon";

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
  //   const [tableHeaders, setTableHeaders] = useState(initialTableHeaders);

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
            {/* <SortIcon tableHeaders={tableHeaders} index={index} /> */}
            {tableHeader.title}
          </div>
        ))}
      </div>
    </>
  );
}
