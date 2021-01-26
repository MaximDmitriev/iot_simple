#include <Arduino.h>
#include <Ticker.h>
#include <SPI.h>
#include <SD.h>
#include <ArduinoJson.h>


const char SD_CARD_PIN = 4;
int id = 0;

File file;


void write2SD() {
  const short data = analogRead(A0);
  Serial.println(data);

  file = SD.open("test_json.json");

  if (!SD.exists("test_json.json")) {
    file = SD.open("test_json.json", FILE_WRITE);
    file.close();
  }
  
  if (file) {
    const int size = file.size() + 256;
    DynamicJsonDocument doc(size);
    deserializeJson(doc, file);
    file.close();

    JsonObject obj = doc.createNestedObject();
    obj["id"] = id; //id = 0 приходит 2 раза подряд!
    obj["sensor"] = data;
    id++;

    file = SD.open("test_json.json", FILE_WRITE);
    
    char json[1024];
    serializeJson(doc, json);
    file.seek(0);
    file.write(json, strlen(json));
    file.close();
  } else {
    Serial.println("Error opening file");
  }
}


Ticker mainTimer(write2SD, 5000);

void setup() {
  pinMode(SD_CARD_PIN, OUTPUT);
  Serial.begin(9600);

  while (!Serial) {
    ;
  }

  mainTimer.start();
  if (!SD.begin(SD_CARD_PIN)) {
    Serial.println("sd connetion faild");
    return;
  }
  Serial.println("card initialized!");
  write2SD();
}

void loop() {
  mainTimer.update();
}