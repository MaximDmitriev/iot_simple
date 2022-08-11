/** Тип устройства. */
export enum DEVICE_TYPE {
  /** Датчик. */
  SENSOR = 'SENSOR',
  /** Реле. */
  RELAY = 'RELAY',
}

/** Исполнительный механизм, устройство или датчик. */
export interface DeviceDto {
  /** Наименование. */
  name: string;
  /** Идентификатор. */
  id: number;
  /** Идентификатор кластера. */
  clusterId: number;
  /** Местонахождение. */
  location: string;
  /** Тип. */
  type: DEVICE_TYPE;
  /** Описание. */
  description: string;
  /** Изображение. */
  image: string;
  /** ???. */
  prodNumber: string;
}
