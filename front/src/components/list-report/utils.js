import dayjs from 'dayjs';

function convertWidth(str, totalWidth) {
  const index = str.indexOf('px');
  return +str.substring(0, index);
}

export function getColumns({ definition }) {
  const columns = definition.columns.reduce((acc, col) => {
      return acc.concat([{
        field: col.systemname || col.name,
        headerName: col.name,
        width: convertWidth(col.width),
        hidden: !col.visible,
        order: col.order,
        style: col.style || null
      }]);
    }, [])
    .sort((a, b) => {
      if (a.order < b.order) return -1;
      return 1;
    });
  columns[columns.length -1]['flex'] = 1;

  return columns;
}

function formatCell(row, stylesMap) {
  Object.keys(row).map(name => {
    if (stylesMap[name]) {
      if (stylesMap[name] === 'datetime') {
        const val = dayjs(row[name]).format('DD/MM/YYYY HH:mm');
        row[name] = val;
      }
    }
  });

  return row;
}

export function formatData(data, columns) {
  const stylesMap = columns.reduce((acc, col) => {
    if (col.style) acc[col.field] = col.style;
    return acc;
  }, {});
  return data.map(row => {
    return formatCell(row, stylesMap);
  });
}