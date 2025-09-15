<<<<<<< Updated upstream
=======
#include <Arduino.h>
#include <WiFi.h>
#include "wifi_utils.h"
#include "led.h"
#include "button.h"

Button resetButton(D10, 5000);
String serverURL = "http://192.168.1.173:5100/api/v1/devices";
WiFiClient client;
HTTPClient http;

void setup() {
    Serial.begin(115200);
    led.orange();
    resetButton.begin();
    preferences.begin("wifi-config", false);

    if (connectToWiFi() != 0) {
        startAPServer(); // only start AP if no Wi-Fi
    } else {
        Serial.println("Wi-Fi connected in STA mode, normal operation...");
    }
}

void loop() {
    server.handleClient();
    resetButton.update();
    //sendToServer(serverURL);
}
>>>>>>> Stashed changes
