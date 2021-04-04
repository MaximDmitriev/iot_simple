#include <Arduino.h>

#include <Wire.h>               // Библиотека для работы с I2C-устройствами
#include <Adafruit_ADS1015.h>   // Библиотека для работы с АЦП
#include "DHT.h"
#include <Adafruit_Sensor.h>
#include <ArduinoJson.h>
#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include <ESP8266HTTPClient.h>

#define DHTPIN 13
#define DHTTYPE DHT11

Adafruit_ADS1115 ads;    // Если, кроме АЦП, нет других I2C-устройств и ADDR не подключен или подключен к GND
DHT dht(DHTPIN, DHTTYPE);
// Adafruit_ADS1115 ads(0x48);  // Если, кроме АЦП, есть другие I2C-устройства и ADDR не подключен или подключен к GND 
// Adafruit_ADS1115 ads(0x49);  // Если ADDR подключен к VCC
// Adafruit_ADS1115 ads(0x4A);  // Если ADDR подключен к SDA
// Adafruit_ADS1115 ads(0x4B);  // Если ADDR подключен к SCL
StaticJsonDocument<100> doc;

WiFiClient client;
ESP8266WebServer server(80);
// IPAddress ipAddres(192,168,1,71);
HTTPClient http;
JsonObject sensors = doc.createNestedObject("sensors");

void setup() {
  Serial.begin(9600);
  WiFi.begin("***", "***");

  while(WiFi.status() != WL_CONNECTED) {
    Serial.println("...connecting to Wi-FI");
    delay(1000);
  }

  Serial.println("connected to wifi!");
  ads.begin();
  dht.begin();
}

String prepareJSON() {
  int soilSensor_1 = ads.readADC_SingleEnded(0);
  delay(100);
  int soilSensor_2 = ads.readADC_SingleEnded(1);
  delay(100);
  int lightSensor = ads.readADC_SingleEnded(2);
  float h = dht.readHumidity();
  float t = dht.readTemperature();
  
  String json;
  sensors["soil1"] = soilSensor_1;
  sensors["soil2"] = soilSensor_2;
  sensors["hum"] = h;
  sensors["temp"] = t;
  sensors["light"] = lightSensor;
  serializeJson(doc, json);

  return json;
}

void loop() {
  String json = prepareJSON();

  http.begin(client, "http://192.168.1.71:3001/json/sensors/esp");
  http.addHeader("Content-type", "application/json");
  int httpCode = http.POST(json);
  http.end();
  Serial.print("status code: "); Serial.println(httpCode);
  delay(5000);
}


//   server.on("/led", []() {
//     server.send(200, "text/html", "led on");
//     Serial.println("incoming");
//   });
//   server.begin();
//   Serial.println("esp server started");
    

//****************************************

// const char SD_CARD_PIN = 4;
// int id = 0;

// File file;


// void write2SD() {
//   const short data = analogRead(A0);
//   Serial.println(data);

//   file = SD.open("test_json.json");

//   if (!SD.exists("test_json.json")) {
//     file = SD.open("test_json.json", FILE_WRITE);
//     file.close();
//   }
  
//   if (file) {
//     const int size = file.size() + 256;
//     DynamicJsonDocument doc(size);
//     deserializeJson(doc, file);
//     file.close();

//     JsonObject obj = doc.createNestedObject();
//     obj["id"] = id; //id = 0 приходит 2 раза подряд!
//     obj["sensor"] = data;
//     id++;

//     file = SD.open("test_json.json", FILE_WRITE);
    
//     char json[1024];
//     serializeJson(doc, json);
//     file.seek(0);
//     file.write(json, strlen(json));
//     file.close();
//   } else {
//     Serial.println("Error opening file");
//   }
// }


// Ticker mainTimer(write2SD, 5000);

// void setup() {
//   pinMode(SD_CARD_PIN, OUTPUT);
//   Serial.begin(9600);

//   while (!Serial) {
//     ;
//   }

//   mainTimer.start();
//   if (!SD.begin(SD_CARD_PIN)) {
//     Serial.println("sd connetion faild");
//     return;
//   }
//   Serial.println("card initialized!");
//   write2SD();
// }

// void loop() {
//   mainTimer.update();
// }