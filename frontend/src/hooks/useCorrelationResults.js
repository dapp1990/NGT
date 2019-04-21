import React, { useState, useEffect } from 'react';

export function useCorrelationResults(databaseRef) {
  const [table, setTable] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {  
    databaseRef.on("value", snapshot => {
        const raw_table = snapshot.val()
        const header = getHeaderLabels(raw_table)
        const rows = getRows(raw_table)
        const parsed_table = <table>{header}{rows}</table>
        setTable(parsed_table);
        setIsLoading(false);
      });
  });

  return [isLoading, table];
}

const getHeaderLabels = (raw_table) =>
  <tr><th></th>{Object.keys(raw_table).map((row) => <th id={row}>{row}</th>)}</tr>;

const getRows = (raw_table) =>
  Object.keys(raw_table).map((row) => <tr><th id={row}>{row}</th>{getColumns(raw_table,row)}</tr>);

const getColumns = (raw_table, row) =>
  Object.keys(raw_table[row]).map((val) => <td id={row + val}>{raw_table[row][val]}</td>);