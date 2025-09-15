#ifndef WIFI_UTILS_H
#define WIFI_UTILS_H

#pragma once
#include <Arduino.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <Preferences.h>
#include <WebServer.h>

extern String serverURL;      // so wifi_utils.cpp can see it
extern WiFiClient client;
extern HTTPClient http;

// Externally defined objects
extern Preferences preferences;
extern WebServer server;
extern void ledOrange();
extern void ledGreen();

// Wi-Fi config constants
const char* const AP_SSID = "ESP32-Setup";
const char* const AP_PASS = "12345678";

// Wi-Fi functions
void sendToServer(const String &serverURL);
int connectToWiFi();
void startAPServer();
void handleRoot();
void handleConnect();
void handleQR();
void sendToServer();
String generateKey();


#endif
