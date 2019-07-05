#include <SPI.h>
#include <LoRa.h>

String receivedPacket = "";

void setup() {
  Serial.begin(9600);
  while (!Serial);

  Serial.println("LoRa Sender");

  if (!LoRa.begin(433E6)) {
    Serial.println("Starting LoRa failed!");
    while (1);
  }
}

void loop() {
  Serial.print("Sending packet: ");
  while (Serial.available()) {
    // send packet
    receivedPacket = Serial.readString();
    LoRa.beginPacket();
    LoRa.print(receivedPacket);
    LoRa.endPacket();
  }

  delay(5000);
}
