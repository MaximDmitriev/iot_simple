import React, { useState, useMemo } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { formatData, getColumns, getFormDefinition } from './utils';
import { localeText } from './list-localization';
import { ModalWrapper } from '../modal';


export const ListReport = ({ data, metadata }) => {
  const [show, setShow] = useState(false);
  const [id, setId] = useState(null);

  const columns = useMemo(() => getColumns(metadata), [metadata]);
  const rows = useMemo(() => formatData(data, columns), [data, columns]);
  const { definition, totalHeight } = useMemo(() => getFormDefinition(metadata), [metadata]);

  const onClickHandler = (e) => {
    const id = e.getValue('id');
    setId(id);
    setShow(true);
  }

  const closeModal = () => {
    setId(null);
    setShow(false);
  }

  return (
    <div style={{ overflow: 'auto', height: '100%', width: '100%', background: 'rgba(255,255,255,0.95)' }}>
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
        show={show}
        onClose={closeModal}
        tableName={metadata.tablename}
        title={metadata.singleTitle}
        titleField={metadata.singleTitleField}
        id={id}
        definition={definition}
        height={totalHeight}
      />
    </div>
  )

}