#include <ArduinoJson.h> 
#include "wifi_utils.h"
#include "led.h"
#undef LOW
#undef HIGH 
#include "qrcodegen.hpp"
using namespace qrcodegen;

Preferences preferences;
WebServer server(80);

String ssid;
String password;
String key = "";

String generateKey() {
    char buf[13];
    for (int i = 0; i < 12; i++) {
        buf[i] = "0123456789abcdef"[esp_random() % 16];
    }
    buf[12] = '\0';
    return String(buf);
}

int connectToWiFi() {
    ssid = preferences.getString("ssid", "");
    password = preferences.getString("password", "");

    if (ssid.isEmpty()) return 1; // no creds

    WiFi.mode(WIFI_STA);
    WiFi.begin(ssid.c_str(), password.c_str());
    Serial.print("Connecting to Wi-Fi ...");

    unsigned long startTime = millis();
    while (WiFi.status() != WL_CONNECTED && millis() - startTime < 5000) {
        Serial.print(".");
        delay(500);
    }

    if (WiFi.status() == WL_CONNECTED) {
        Serial.println("\nConnected: " + WiFi.localIP().toString());
        return 0;
    }
    return 1;
}

void startAPServer() {
    WiFi.softAP("ESP_SETUP");
    Serial.println("AP started at " + WiFi.softAPIP().toString());

    server.on("/", handleRoot);
    server.on("/connect", HTTP_POST, handleConnect);
    server.on("/qr", handleQR);

    server.begin();
    Serial.println("AP Server running...");
}

void handleRoot() {
    String html = R"rawliteral(
        <html><body>
        <h2>Wi-Fi Setup</h2>
        <form action="/connect" method="post">
        SSID:<br><input type="text" name="ssid"><br>
        Password:<br><input type="password" name="password"><br><br>
        <input type="submit" value="Submit">
        </form>
        </body></html>
    )rawliteral";
    server.send(200, "text/html", html);
}

void handleConnect() {
    ssid = server.arg("ssid");
    password = server.arg("password");
    preferences.putString("ssid", ssid);
    preferences.putString("password", password);

    // Generate key if not exists
    key = preferences.getString("key", "");
    if (key.isEmpty()) {
        key = generateKey();
        preferences.putString("key", key);
    }

    server.sendHeader("Location", "/qr");
    server.send(302, "text/plain", "Redirecting to QR code...");
}

void handleQR() {
    key = preferences.getString("key", "");

    String mac = (WiFi.getMode() & WIFI_AP) ? WiFi.softAPmacAddress() : WiFi.macAddress();

    String url = "http://localhost:5173/verify?key=" + key + "&mac=" + mac;
    Serial.println(url);
    const QrCode::Ecc err = QrCode::Ecc::MEDIUM;
    QrCode qr = QrCode::encodeText(url.c_str(), err);

    int size = qr.getSize();
    int border = 4;
    int canvasSize = (size + border * 2) * 10; // 10px per module

    //Trying with normal tables will break the browser....
    String html = "<html><body>";
    html += "<h1>Scan QR</h1>";
    html += "<p><strong>URL:</strong> " + url + "</p>";
    html += "<p><strong>MAC:</strong> " + mac + "</p>";
    
    html += "<canvas id='qrcanvas' width='" + String(canvasSize) + "' height='" + String(canvasSize) + "'></canvas>";
    html += "<script>";
    html += "var canvas = document.getElementById('qrcanvas');";
    html += "var ctx = canvas.getContext('2d');";
    html += "ctx.fillStyle = 'white';";
    html += "ctx.fillRect(0,0,canvas.width,canvas.height);";
    html += "ctx.fillStyle = 'black';";
    
    for (int y = 0; y < size; y++) {
        for (int x = 0; x < size; x++) {
            if (qr.getModule(x, y)) {
                int px = (x + border) * 10;
                int py = (y + border) * 10;
                html += "ctx.fillRect(" + String(px) + "," + String(py) + ",10,10);";
            }
        }
    }

    html += "</script></body></html>";
    server.send(200, "text/html", html);
}


// Send to server using HTTP PATCH
void sendToServer(const SoilData &data, const uint8_t *macAddr) {
    if (WiFi.status() != WL_CONNECTED) {
        Serial.println("[WARN] Cannot send data, Wi-Fi not connected.");
        return;
    }

    WiFiClient client;
    HTTPClient http;

    // Convert MAC to string
    char macStr[18];
    sprintf(macStr, "%02X:%02X:%02X:%02X:%02X:%02X",
            macAddr[0], macAddr[1], macAddr[2],
            macAddr[3], macAddr[4], macAddr[5]);

    String url = "http://192.168.1.146:5173/api/v1/devices/" + String(macStr) + "/report";

    DynamicJsonDocument doc(256);
    doc["moisture"] = data.moisture;
    doc["temperature"] = data.temperature;
    doc["light"] = data.light;

    String payload;
    serializeJson(doc, payload);

    http.begin(client, url);
    http.addHeader("Content-Type", "application/json");

    int httpResponseCode = http.PATCH(payload);

    if (httpResponseCode > 0) {
        Serial.printf("[INFO] HTTP Response code: %d\n", httpResponseCode);
        String response = http.getString();
        Serial.println("Server Response:");
        Serial.println(response);
    } else {
        Serial.printf("[ERROR] PATCH failed, error: %s\n", http.errorToString(httpResponseCode).c_str());
    }

    http.end();
}