import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { fade, makeStyles } from '@material-ui/core/styles';

export default function CartoList() {
  const [cartoTables, setCartoTables] = useState([]);

  const fetchCartoTables = async () => {
    const cartoTablesPromise = await fetch("https://planninglabs.carto.com:443/api/v2/sql?q=select * from carto_tables");

    const { rows: tableNames } = await cartoTablesPromise.json();

    console.log(tableNames);
    setCartoTables(tableNames);
  }

  useEffect(() => {
    fetchCartoTables();
  }, [])

  return (
    <div>
      {cartoTables.map(table => (
        <Paper
          key={table.cartodb_id}
          style={
            {
              margin: '10px',
              padding: '15px'
            }
          }
        >
          {table.cdb_usertables}
        </Paper>
      ))}
    </div>
  )
} 