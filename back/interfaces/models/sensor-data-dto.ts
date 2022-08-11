/** Данные датчика. */
export interface SensorDataDto {
  /** Идентификатор датчика. */
  sensorId: number;
  /** Идентификатор кластера. */
  clusterId: number;
  /** Время замера (мс). */
  datetime: number;
  /** Значение датчика. */
  value: number;
}
