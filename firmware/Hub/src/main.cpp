#include <Arduino.h>
#include <WiFi.h>
#include "wifi_utils.h"
#include "led.h"
#include "button.h"
#include <esp_now.h>
#include <devices.h>

Button resetButton(D10, 5000);
const String url = "http://192.168.1.146:5173/api/v1/devices";
WiFiClient client;
HTTPClient http;

void setup() {
    Serial.begin(115200);
    led.orange();
    resetButton.begin();
    preferences.begin("wifi-config", false);

    if (connectToWiFi() != 0) {
        startAPServer(); // start AP if no Wi-Fi
    } else {
        Serial.println("Wi-Fi connected in STA mode, normal operation...");

        // Hub MAC
        hubMac = (WiFi.getMode() & WIFI_AP) ? WiFi.softAPmacAddress() : WiFi.macAddress();
        if (!macStringToBytes(hubMac, hubMACBytes)) {
            Serial.println("Failed to convert hub MAC to bytes!");
            return;
        }
        Serial.print("Hub MAC: ");
        Serial.println(hubMac);

        // ESP-NOW init
        if (esp_now_init() != ESP_OK) Serial.println("Error initializing ESP-NOW");

        // Register callbacks
        esp_now_register_send_cb(onDataSent);
        esp_now_register_recv_cb([](const esp_now_recv_info_t *recv_info, const uint8_t *incomingData, int len){
            const uint8_t* mac = recv_info->src_addr;
            if (len == 1 && incomingData[0] == 0x01) {
                onAckReceived(mac, incomingData, len);
            } else if (len == sizeof(SoilData)) {
                onSoilDataRecv(mac, incomingData, len);
            }
        });

        // Fetch devices and handshake
        get_Devices(url);
        sendHandshakeToAll();
    }
}

void loop() {
    server.handleClient();
    resetButton.update();
    //sendToServer(serverURL);
}
