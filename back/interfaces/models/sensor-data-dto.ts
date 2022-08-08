/** Данные датчика. */
export interface SensorDataDto {
  /** Идентификатор датчика. */
  sensorId: string;
  /** Идентификатор кластера. */
  clusterId: string;
  /** Время замера (мс). */
  datetime: number;
  /** Значение датчика. */
  value: number;
}
