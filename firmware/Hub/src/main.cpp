#include <Arduino.h>
#include <WiFi.h>
#include <Preferences.h>
#include <esp_now.h>
#include <mbedtls/aes.h>
#include <led.h>
#include "wifi_utils.h"
#include "button.h"

Preferences preferences;
WebServer server(80);

const unsigned long blinkInterval = 1000;
unsigned long lastToggle = 0;
Button resetButton(D10, 5000);

void sendToServer();

// SETUP
void setup() {
    Serial.begin(115200);
    led.orange();
    resetButton.begin();
    // Wi-Fi
    preferences.begin("wifi-config", false); // False = RW True = RO
    WiFi.mode(WIFI_STA);
    connectToWiFi();

}

void loop() {
    server.handleClient();
    resetButton.update();
    if (millis() - lastToggle >= blinkInterval) {
        lastToggle = millis();
        led.toggle();
    }

    //sendToServer();
}



