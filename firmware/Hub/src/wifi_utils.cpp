#include "wifi_utils.h"
#include <ArduinoJson.h>
#include <HTTPClient.h>
#include "led.h"

String ssid;
String password;
String verificationCode = "";
String serverURL = "http://192.168.1.173:5100/api/v1/devices";
WiFiClient client;
HTTPClient http;

int connectToWiFi() {
    ssid = preferences.getString("ssid", "");
    password = preferences.getString("password", "");

    if (ssid.isEmpty()) {
        Serial.println("[ERROR] No Wi-Fi credentials found. Starting AP Mode...");
        led.orange();
        startWebServer();
        return 1;
    }

    WiFi.mode(WIFI_STA);
    WiFi.begin(ssid.c_str(), password.c_str());
    Serial.print("Connecting to WiFi ..");

    unsigned long startTime = millis();
    const unsigned long timeout = 5000;

    while (WiFi.status() != WL_CONNECTED) {
        if (millis() - startTime >= timeout) {
            Serial.println("\n[ERROR] Wi-Fi connection timed out. Please Try Again.");
            server.send(408, "text/plain", "Wi-Fi connection timed out. Please Try Again.");
            led.red();
            return 1;
        }
        Serial.print('.');
        delay(500);
    }

    if (WiFi.status() == WL_CONNECTED) {
      Serial.println("\nConnected to WiFi:");
      Serial.println(WiFi.localIP());
      led.green();
      return 0;
    }
    return 1;
}

void startWebServer() {
    WiFi.softAP(AP_SSID, AP_PASS);
    IPAddress IP = WiFi.softAPIP();
    Serial.print("AP IP Address: ");
    Serial.println(IP);

    server.on("/", handleRoot);
    server.on("/connect", handleConnect);
    server.begin();

    Serial.println("[INFO] Web server started successfully!");
    led.orange();
}

void handleConnect() {
    ssid = server.arg("ssid");
    password = server.arg("password");

    Serial.println("[INFO] Received new Wi-Fi credentials:");
    Serial.println("SSID: " + ssid);
    Serial.println("Password: " + password);

    // Store the new credentials
    if (WiFi.status() == WL_CONNECTED){
      preferences.putString("ssid", ssid);
      preferences.putString("password", password);
    }

    // Display a confirmation message
    server.send(200, "text/plain", "Credentials saved. Rebooting Device.");
    Serial.println("[INFO] Credentials saved, rebooting device...");

    delay(3000);
    server.stop();
    ESP.restart();
}

void sendToServer() {
    String url = serverURL + "/" + WiFi.macAddress() + "/report";
    
    // Create the JSON document
    DynamicJsonDocument doc(1024);
    doc["temperature"] = random(20, 30);
    doc["light"] = random(50, 100);
    doc["hydration"] = random(30, 70);

    // Serialize JSON to string
    String payload;
    serializeJson(doc, payload);

    // Initialize HTTP client
    http.begin(client, url);
    http.addHeader("Content-Type", "application/json");

    // Send the PATCH request
    int httpResponseCode = http.PATCH(payload);

    // Handle the response
    if (httpResponseCode > 0) {
        Serial.printf("[INFO] HTTP Response code: %d\n", httpResponseCode);
        String response = http.getString();
        Serial.println("Server Response:");
        Serial.println(response);
    } else {
        Serial.printf("[ERROR] PATCH failed, error: %s\n", http.errorToString(httpResponseCode).c_str());
    }

    // End the HTTP connection
    http.end();
}

void handleRoot() {
    String html = R"rawliteral(
    <!DOCTYPE html>
    <html>
    <body>
        <h2>WiFi Setup</h2>
        <form action="/connect" method="post">
            SSID:<br>
            <input type="text" name="ssid"><br>
            Password:<br>
            <input type="password" name="password"><br><br>
            <input type="submit" value="Submit">
        </form> 
    </body>
    </html>
    )rawliteral";

    server.send(200, "text/html", html);
}