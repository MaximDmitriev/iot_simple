/** Описание путей (экранных форм). */
interface Root {
  /** Путь. */
  url: string;
  /** Название экранной формы. */
  name: string;
}

/** Пути. */
export const roots: Root[] = [
  { url: 'users', name: 'Пользователи' },
  { url: 'sensors', name: 'Датчики' },
  { url: 'relays', name: 'Исполнительные механизмы' },
  { url: 'devices', name: 'Устройства' },
  { url: 'dashboards', name: 'Дашборды' },
];
