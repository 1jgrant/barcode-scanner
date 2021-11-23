import React from "react";
import { useTable } from "react-table";

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

const Log = ({ scanHistory }) => {
  const data = React.useMemo(() => scanHistory, [scanHistory]);
  const columns = React.useMemo(
    () => [
      {
        Header: "Code",
        accessor: "code",
      },
      {
        Header: "Start",
        accessor: "startTime",
      },
      {
        Header: "End",
        accessor: "endTime",
      },
      {
        Header: "Duration",
        accessor: "duration",
      },
    ],
    []
  );

  return (
    <section className="tableContainer">
      <Table columns={columns} data={data} />
    </section>
  );
};

// const entry = (entryData) => {
//   return (
//     <div key={entryData.code} className="fakeTableRow">
//       <span>{entryData.code}</span>
//       <span>{entryData.startTime}</span>
//       <span>{entryData.endTime}</span>
//       <span>{entryData.duration}</span>
//     </div>
//   );
// };

// return (
//   <div>
//     <section className="fakeTableHeader">
//       <span>Code</span>
//       <span>Start</span>
//       <span>End</span>
//       <span>Duration</span>
//     </section>
//     {scanHistory.map((scanData) => {
//       return entry(scanData);
//     })}
//   </div>
// );

export default Log;
