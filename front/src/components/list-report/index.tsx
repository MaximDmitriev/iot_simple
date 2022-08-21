// @ts-nocheck
import React, { useState, useMemo, useCallback } from 'react';
// import { DataGrid } from '@material-ui/data-grid';
import { LibraryAdd } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { ModalWrapper } from '../modal';
// import { localeText } from './list-localization';
import { getFormDefinition } from './utils';

/**
 * - создание компонента.
 * - null вместо update.
 */
// TODO создать контейнер для логики

/** Компонент список (таблица). */
export const ListReport: React.FC<{ data: any; metadata: any; update(): void }> = ({ data, metadata, update }) => {
  // const columns = useMemo(() => getColumns(metadata), [metadata]);
  // const rows = useMemo(() => formatData(data, columns), [data, columns]);
  const { definition, totalHeight } = useMemo(() => getFormDefinition(metadata), [metadata]);

  const [modalParams, setModalParams] = useState({ open: false, mode: 'update', id: null });

  // const onClickHandler = useCallback((e: GridRowParams) => {
  //   const id = e.getValue('id');
  //
  //   setModalParams({ open: true, mode: 'update', id });
  // }, []);

  const closeModal = useCallback(() => {
    setModalParams({ open: false, mode: 'update', id: null });
    update();
  }, [update]);

  const createRecord = () => {
    setModalParams({ open: true, mode: 'create', id: null });
  };

  return (
    <div>
      <Tooltip title="Добавить запись">
        <IconButton aria-label="add record" color="primary" onClick={createRecord}>
          <LibraryAdd />
        </IconButton>
      </Tooltip>

      {/* <DataGrid */}
      {/*  autoHeight */}
      {/*  disableSelectionOnClick */}
      {/*  hideFooterSelectedRowCount */}
      {/*  showCellRightBorder */}
      {/*  showColumnRightBorder */}
      {/*  showToolbar */}
      {/*  columns={columns} */}
      {/*  headerHeight={45} */}
      {/*  localeText={localeText} */}
      {/*  rowHeight={40} */}
      {/*  rows={rows} */}
      {/*  onRowClick={onClickHandler} */}
      {/* /> */}
      <ModalWrapper
        act={modalParams.mode}
        definition={definition}
        height={totalHeight}
        id={modalParams.id}
        show={modalParams.open}
        tableName={metadata.tablename}
        title={metadata.singleTitle}
        titleField={metadata.singleTitleField}
        onClose={closeModal}
      />
    </div>
  );
};
