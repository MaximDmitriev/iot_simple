import dayjs from 'dayjs';


const ROW_HEIGHT = 85;
const NUMBER_COLUMNS = 12;

function convertWidth(str, totalWidth) {
  const index = str.indexOf('px');
  return +str.substring(0, index);
}

export function getColumns({ definition }) {
  const columns = definition.columns
    .filter(col => col.visible)
    .reduce((acc, col) => {
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

export function getFormDefinition({ definition: {columns}}) {
  const rowPositions = columns.reduce((obj, widget) => {
    if (!obj[widget.position[1]] || obj[widget.position[1]] < widget.size[1]) {
      obj[widget.position[1]] = widget.size[1];
    }
    return obj;
  }, {});
  const maxRowNumber = Math.max(...Object.keys(rowPositions).map(k => parseInt(k)));

  //общая высота сетки
  const totalHeight = rowPositions[maxRowNumber] > 1
    ? (maxRowNumber + rowPositions[maxRowNumber]) * ROW_HEIGHT
    : (maxRowNumber + 1) * ROW_HEIGHT;

  //параметры одной ячейки в процентах
  const colHeight = (100 * ROW_HEIGHT)/totalHeight;
  const colWidth = 100/NUMBER_COLUMNS;

  const definition = columns
    .filter(c => c.show_in_form)
    .map(c => ({
      fieldName: c.systemname,
      label: c.name || c.systemname,
      fieldFormat: c.style,
      pattern: c.pattern || null,
      readonly: c.readonly || false,
      required: c.required || false,
      onlyCreatedMode: c.onlyCreated || null,
      width: `${colWidth * c.size[0]}%`,
      height: `${colHeight * c.size[1]}%`,
      top: c.position[1] * colHeight + '%',
      left: c.position[0] * colWidth + '%'
    }));
  return {
    totalHeight,
    definition
  }
}