import React, { useState, useEffect } from 'react';
import CardListItem from './CartoListItem'
import { fade, makeStyles } from '@material-ui/core/styles';

export default function CartoList() {
  const [cartoTables, setCartoTables] = useState([]);

  const fetchCartoTables = async () => {
    const cartoTablesPromise = await fetch("https://planninglabs.carto.com:443/api/v2/sql?q=select * from carto_tables");

    const { rows: tableNames } = await cartoTablesPromise.json();

    setCartoTables(tableNames);
  }

  useEffect(() => {
    fetchCartoTables();
  }, [])

  return (
    <div>
      {cartoTables.map(table => (
        <CardListItem
          key={table.cartodb_id}
          item={table}
        />
      ))}
    </div>
  )
} 