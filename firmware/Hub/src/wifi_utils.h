#ifndef WIFI_UTILS_H
#define WIFI_UTILS_H

#include <Arduino.h>
#include <WiFi.h>
#include <Preferences.h>
#include <WebServer.h>

// Externally defined objects
extern Preferences preferences;
extern WebServer server;
extern void handleRoot();
extern void handleConnect();
extern void ledOrange();
extern void ledGreen();

// Wi-Fi config constants
const char* const AP_SSID = "ESP32-Setup";
const char* const AP_PASS = "12345678";

// Wi-Fi functions
int connectToWiFi();
void startWebServer();


#endif
