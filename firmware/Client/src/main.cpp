#include <Arduino.h>
#include <WiFi.h>
#include <esp_now.h>
#include <Preferences.h>
#include <ArduinoJson.h>

const char* espNowKey = ESP_NOW_KEY;
const int soilPin = A0;
const int dryValue = 2650;
const int wetValue = 1200;

Preferences preferences;

// Helper: send 1-byte ACK back to hub
void sendAck(const uint8_t* hubMac) {
    uint8_t ack = 0x01;
    esp_err_t result = esp_now_send(hubMac, &ack, sizeof(ack));
    if (result == ESP_OK) Serial.println("ACK sent to hub.");
    else Serial.println("Error sending ACK.");
}

// ESP-NOW receive callback
void onDataRecv(const esp_now_recv_info_t *recv_info, const uint8_t *data, int len) {
    const uint8_t *hubMac = recv_info->src_addr;

    Serial.print("Received handshake from hub MAC: ");
    for (int i = 0; i < 6; i++) {
        Serial.printf("%02X", hubMac[i]);
        if (i < 5) Serial.print(":");
    }
    Serial.println();

    if (len == 6) {
        preferences.begin("hub", false);
        preferences.putBytes("mac", data, 6);
        preferences.end();
        Serial.println("MAC stored in preferences.");

        // Add hub as peer with encryption
        esp_now_peer_info_t peerInfo = {};
        memcpy(peerInfo.peer_addr, hubMac, 6);
        peerInfo.channel = 0;        // current Wi-Fi channel
        peerInfo.encrypt = true;

        // Copy 16-byte key from .env
        uint8_t keyBytes[16];
        for (int i = 0; i < 16; i++) {
            sscanf(&ESP_NOW_KEY[i*2], "%2hhx", &keyBytes[i]);
        }

        memcpy(peerInfo.lmk, keyBytes, 16);

        if (esp_now_add_peer(&peerInfo) == ESP_OK) {
            Serial.println("Hub added as encrypted peer.");
            sendAck(hubMac);
        } else {
            Serial.println("Failed to add encrypted peer.");
        }
    }
}

struct SoilData {
    uint16_t moisture;
    int16_t temperature;
    uint16_t light;
};

void sendSoilData() {
    preferences.begin("hub", true);
    uint8_t hubMac[6];
    if (preferences.getBytes("mac", hubMac, 6) != 6) {
        Serial.println("No hub MAC stored, cannot send data.");
        preferences.end();
        return;
    }
    preferences.end();

    SoilData data;
    int soilValue = analogRead(soilPin);
    data.moisture = map(soilValue, dryValue, wetValue, 0, 100);
    data.moisture = constrain(data.moisture, 0, 100);
    data.temperature = 0;
    data.light = 0;

    esp_err_t result = esp_now_send(hubMac, (uint8_t*)&data, sizeof(data));
    if (result == ESP_OK) Serial.println("Soil data sent to hub.");
    else Serial.println("Error sending soil data to hub.");
}

void setup() {
    Serial.begin(115200);
    delay(100);
    String mac = (WiFi.getMode() & WIFI_AP) ? WiFi.softAPmacAddress() : WiFi.macAddress();

    Serial.print(mac);

    WiFi.mode(WIFI_STA);
    if (esp_now_init() != ESP_OK) Serial.println("Error initializing ESP-NOW");

    esp_now_register_recv_cb(onDataRecv);

    // Send soil data to hub
    sendSoilData();

    // Sleep for 4 hours
    const uint64_t sleepTimeUs = 4ULL * 60 * 60 * 1000000;
    Serial.println("Entering deep sleep for 4 hours...");
    esp_deep_sleep(sleepTimeUs);
}

void loop() {}
