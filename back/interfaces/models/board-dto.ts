/** Плата (по сути это кластер: плата + датчики и реле и тд). */
export interface BoardDto {
  /** Название устройства. */
  name: string;
  /** Идентификатор. */
  id: number;
  /** Идентификатор кластера. */
  clusterId: number;
  /** Местонахождение. */
  location: string;
  /** Название платы. */
  boardName: string;
  /** Описание. */
  description: string;
  /** Изображение. */
  image: string;
  /** Список идентификаторов компонентов кластера. */
  components: number[];
}
