import React, { useState, useMemo } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { formatData, getColumns, getFormDefinition } from './utils';
import { localeText } from './list-localization';
import { ModalWrapper } from '../modal';
import { IconButton, Tooltip } from '@material-ui/core';
import LibraryAdd from '@material-ui/icons/LibraryAdd';

import { useStyles } from './style';


export const ListReport = ({ data, metadata, update }) => {
  const classes = useStyles();

  const columns = useMemo(() => getColumns(metadata), [metadata]);
  const rows = useMemo(() => formatData(data, columns), [data, columns]);
  const { definition, totalHeight } = useMemo(() => getFormDefinition(metadata), [metadata]);

  const [modalParams, setModalParams] = useState({ open: false, mode: 'edit', id: null });

  const onClickHandler = (e) => {
    const id = e.getValue('id');
    setModalParams({ open: true, mode: 'edit', id });
  }

  const closeModal = () => {
    setModalParams({ open: false, mode: 'edit', id: null });
    update();
  }

  const createRecord = () => {
    setModalParams({ open: true, mode: 'create', id: null });
  }

  return (
    <div className={classes.wrapper}>
      <Tooltip title="Добавить запись">
        <IconButton color="primary" aria-label="add record" classes={{root: classes.root}} onClick={createRecord}>
          <LibraryAdd />
        </IconButton>
      </Tooltip>

      <DataGrid
        columns={columns}
        rows={rows}
        rowHeight={40}
        headerHeight={45}
        showColumnRightBorder
        showCellRightBorder
        showToolbar
        hideFooterSelectedRowCount
        autoHeight
        disableSelectionOnClick
        localeText={localeText}
        onRowClick={(e) => onClickHandler(e)}
      />
      <ModalWrapper
        show={modalParams.open}
        act={modalParams.mode}
        onClose={closeModal}
        tableName={metadata.tablename}
        title={metadata.singleTitle}
        titleField={metadata.singleTitleField}
        id={modalParams.id}
        definition={definition}
        height={totalHeight}
      />
    </div>
  )
}