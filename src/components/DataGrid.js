import React from 'react';
import { DataGrid } from '@material-ui/data-grid';

function DataGridRender({rows, columns, onEditCellChange, pageSize}) {
  return (
    <DataGrid rows={rows} columns={columns} pageSize={pageSize} onEditCellChange={onEditCellChange} disableSelectionOnClick  />
  );
}

export default DataGridRender;