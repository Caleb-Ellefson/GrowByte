#include "devices.h"
#include <HTTPClient.h>
#include <WiFi.h>
#include <ArduinoJson.h>
#include <vector>
#include <wifi_utils.h>

std::vector<std::array<uint8_t, 6>> deviceMACs;
std::vector<Device> devices;
uint8_t hubMACBytes[6];
String hubMac;
const char* espNowKey= ESP_NOW_KEY;


int get_Devices(const String &url) {
    if (WiFi.status() != WL_CONNECTED) return 0;

    key = preferences.getString("key", "");
    HTTPClient http;
    http.begin(url);
    http.addHeader("x-device-key", key);

    int httpCode = http.GET();
    if (httpCode == 200) {
        String payload = http.getString();
        Serial.println(payload);

        deviceMACs.clear();

        DynamicJsonDocument doc(4096);
        if (deserializeJson(doc, payload)) {
            Serial.println("Failed to parse JSON");
            http.end();
            return 0;
        }

        JsonArray arr = doc["devices"].as<JsonArray>();
        for (JsonObject obj : arr) {
            String macStr = obj["deviceId"].as<String>();

            std::array<uint8_t, 6> macBytes;
            if (macStringToBytes(macStr, macBytes.data())) {
                deviceMACs.push_back(macBytes);
            }
        }

        Serial.printf("Stored %d MAC addresses\n", deviceMACs.size());
    } else {
        Serial.printf("Error fetching devices, code: %d\n", httpCode);
        http.end();
        return 0;
    }

    http.end();
    return 1;
}

void onDataSent(const uint8_t *mac_addr, esp_now_send_status_t status) {
    Serial.print("Last Packet Send Status: ");
    if (status == ESP_NOW_SEND_SUCCESS) {
        Serial.println("Success");
    } else {
        Serial.println("Fail");
    }
}


// Convert MAC string "24:0A:C4:12:34:56" to uint8_t[6]
bool macStringToBytes(const String &macStr, uint8_t *macBytes) {
    int values[6];
    if (sscanf(macStr.c_str(), "%x:%x:%x:%x:%x:%x",
               &values[0], &values[1], &values[2],
               &values[3], &values[4], &values[5]) != 6) {
        return false;
    }
    for (int i = 0; i < 6; i++) macBytes[i] = (uint8_t)values[i];
    return true;
}

// Send hub MAC to all devices
void sendHandshakeToAll() {
    Serial.println("Sending handshake to all devices...");
    for (auto &mac : deviceMACs) {
        if (addDevicePeer(mac.data())) {
            esp_err_t result = esp_now_send(mac.data(), hubMACBytes, sizeof(hubMACBytes));
            if (result == ESP_OK) Serial.println("Handshake sent.");
            else Serial.println("Failed to send handshake.");
        }
    }
}

void onAckReceived(const uint8_t *mac, const uint8_t *incomingData, int len) {
    if (len != 1 || incomingData[0] != 0x01) return;

    Serial.print("Handshake ACK received from device: ");
    for (int i = 0; i < 6; i++) {
        Serial.printf("%02X", mac[i]);
        if (i < 5) Serial.print(":");
    }
    Serial.println();
}


bool addDevicePeer(const uint8_t* deviceMac) {
    esp_now_peer_info_t peerInfo = {};
    memcpy(peerInfo.peer_addr, deviceMac, 6);
    peerInfo.channel = WiFi.channel();
    peerInfo.encrypt = true;

    uint8_t keyBytes[16];
    for (int i = 0; i < 16; i++) {
        sscanf(&ESP_NOW_KEY[i*2], "%2hhx", &keyBytes[i]);
    }
    memcpy(peerInfo.lmk, keyBytes, 16);

    if (esp_now_add_peer(&peerInfo) == ESP_OK) {
        Serial.print("Device added as encrypted peer: ");
        for (int i = 0; i < 6; i++) {
            Serial.printf("%02X", deviceMac[i]);
            if (i < 5) Serial.print(":");
        }
        Serial.println();
        return true;
    } else {
        Serial.println("Failed to add encrypted device peer");
        return false;
    }
}

void onSoilDataRecv(const uint8_t *mac, const uint8_t *incomingData, int len) {
    if (len != sizeof(SoilData)) return;

    SoilData sensorData;
    memcpy(&sensorData, incomingData, sizeof(SoilData));

    Serial.print("Soil sensor ");
    for (int i = 0; i < 6; i++) {
        Serial.printf("%02X", mac[i]);
        if (i < 5) Serial.print(":");
    }
    Serial.printf(" -> Moisture: %d%%, Temp: %d, Light: %d\n",
                  sensorData.moisture, sensorData.temperature, sensorData.light);

    sendToServer(sensorData, mac);
}
