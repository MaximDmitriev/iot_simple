import React, { useState, useMemo, useCallback } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { formatData, getColumns, getFormDefinition } from './utils';
import { localeText } from './list-localization';
import { ModalWrapper } from '../modal';
import { IconButton, Tooltip } from '@material-ui/core';
import LibraryAdd from '@material-ui/icons/LibraryAdd';

import { useStyles } from './style';

/**
 * - создание компонента
 * - null вместо update
 */
// создать контейнер для логики
export const ListReport = ({ data, metadata, update }) => {
  const classes = useStyles();

  const columns = useMemo(() => getColumns(metadata), [metadata]);
  const rows = useMemo(() => formatData(data, columns), [data, columns]);
  const { definition, totalHeight } = useMemo(() => getFormDefinition(metadata), [metadata]);

  const [modalParams, setModalParams] = useState({ open: false, mode: 'update', id: null });

  const onClickHandler = useCallback(e => {
    const id = e.getValue('id');
    setModalParams({ open: true, mode: 'update', id });
  }, []);

  const closeModal = useCallback(() => {
    setModalParams({ open: false, mode: 'update', id: null });
    update();
  }, []);

  const createRecord = () => {
    setModalParams({ open: true, mode: 'create', id: null });
  };

  return (
    <div className={classes.wrapper}>
      <Tooltip title="Добавить запись">
        <IconButton color="primary" aria-label="add record" classes={{ root: classes.root }} onClick={createRecord}>
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
        onRowClick={onClickHandler}
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
  );
};
