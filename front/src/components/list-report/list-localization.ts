const SHOW_FILTERS = 'Показать фильтры';

export const localeText = {
  // Root
  rootGridLabel: 'grid',

  // Density selector toolbar button text
  toolbarDensity: 'Плотность',
  toolbarDensityLabel: 'Плотность',
  toolbarDensityCompact: 'Компакт',
  toolbarDensityStandard: 'Стандарт',
  toolbarDensityComfortable: 'Комфорт',

  // Columns selector toolbar button text
  toolbarColumns: 'Колонки',
  toolbarColumnsLabel: 'Показать выбор колонок',

  // Filters toolbar button text
  toolbarFilters: 'Фильтры',
  toolbarFiltersLabel: SHOW_FILTERS,
  toolbarFiltersTooltipHide: 'Спрятать фильтры',
  toolbarFiltersTooltipShow: SHOW_FILTERS,
  toolbarFiltersTooltipActive: count => `${count} активных фильтров`,

  // Columns panel text
  columnsPanelTextFieldLabel: 'Найти колонку',
  columnsPanelTextFieldPlaceholder: 'Заголовок колонки',
  columnsPanelDragIconLabel: 'Поменять порядок',
  columnsPanelShowAllButton: 'Показать все',
  columnsPanelHideAllButton: 'Скрыть все',

  // Filter panel text
  filterPanelAddFilter: 'Добавить фильтр',
  filterPanelDeleteIconLabel: 'Удалить',
  filterPanelOperators: 'Операторы',
  filterPanelOperatorAnd: 'И',
  filterPanelOperatorOr: 'ИЛИ',
  filterPanelColumns: 'Колонки',

  // Column menu text
  columnMenuLabel: 'Меню',
  columnMenuShowColumns: 'Показать колонки',
  columnMenuFilter: 'Фильтр',
  columnMenuHideColumn: 'Скрыть',
  columnMenuUnsort: 'Отменить сортировку',
  columnMenuSortAsc: 'Сорт. по возрастающей',
  columnMenuSortDesc: 'Сорт. по убывающей',

  // Column header text
  columnHeaderFiltersTooltipActive: count => `${count} активных фильтров`,
  columnHeaderFiltersLabel: SHOW_FILTERS,
  columnHeaderSortIconLabel: 'Сортировать',

  // Rows selected footer text
  footerRowSelected: count => (count !== 1 ? `${count.toLocaleString()} выделенных строк` : `${count.toLocaleString()} выделенная строка`),

  // Total rows footer text
  footerTotalRows: 'Всего строк:',

  // Pagination footer text
  footerPaginationRowsPerPage: 'Строк на странице:',
};
