#pragma once
#include <Arduino.h>
#include <vector>
#include "ArduinoJson.h"
#include <esp_now.h>
#include "esp_mac.h"

struct Device {
    String id;
    String name;
    String user;
    String deviceId;
    int hydration;
    int temperature;
    int light;
};

extern std::vector<Device> devices;
extern uint8_t hubMACBytes[6];
extern String hubMac;

int get_Devices(const String &url);
void sendToServer(const String &serverURL);
void onDataSent(const uint8_t *mac_addr, esp_now_send_status_t status);
bool macStringToBytes(const String &macStr, uint8_t *macBytes);
void onDataRecv(const uint8_t *macAddr, const uint8_t *incomingData, int len);
void onAckReceived(const uint8_t *macAddr, const uint8_t *incomingData, int len);
void onSoilDataRecv(const uint8_t *macAddr, const uint8_t *incomingData, int len);
bool addDevicePeer(const uint8_t* deviceMac);
void sendHandshakeToAll();
