## Проект IoT

Суть проекта в контроле за автоматикой, хранении данных, полученных от автоматических систем и построении отчетов на основании этих данных.
Проект включает в себя серверную часть, клиентскую часть и прошивки для микроконтроллеров.

### Backend
Node.js + Typescript + Express, MongoDB<br>
Для соединения кластеров автоматики между собой и сервером используется MQTT Mosquitto (пакет mqtt.js)

[swagger](https://app.swaggerhub.com/apis-docs/MaximDmitriev/iot4fun/1.0.0-oas3)

### Frontend
React + Typescript + Redux

[storybook]()

### Автоматика
Автоматика собрана на Arduino и ESP8266 или их аналогах. Прошивки написаны на Arduino(C++)
