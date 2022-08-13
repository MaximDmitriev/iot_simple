import { useState, useMemo, useCallback } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import LibraryAdd from '@material-ui/icons/LibraryAdd';
import { ModalWrapper } from '../modal';
import { localeText } from './list-localization';
import { useStyles } from './style';
import { formatData, getColumns, getFormDefinition } from './utils';

/**
 * - создание компонента.
 * - null вместо update.
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
  }, [update]);

  const createRecord = () => {
    setModalParams({ open: true, mode: 'create', id: null });
  };

  return (
    <div className={classes.wrapper}>
      <Tooltip title="Добавить запись">
        <IconButton aria-label="add record" classes={{ root: classes.root }} color="primary" onClick={createRecord}>
          <LibraryAdd />
        </IconButton>
      </Tooltip>

      <DataGrid
        autoHeight
        disableSelectionOnClick
        hideFooterSelectedRowCount
        showCellRightBorder
        showColumnRightBorder
        showToolbar
        columns={columns}
        headerHeight={45}
        localeText={localeText}
        rowHeight={40}
        rows={rows}
        onRowClick={onClickHandler}
      />
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
