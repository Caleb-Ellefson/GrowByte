#include <Arduino.h>
<<<<<<< HEAD
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
=======
#include "led.h"
#include <WiFi.h>
#include <Preferences.h>
#include <WebServer.h>
#include <HTTPClient.h>

Led led(2, 3, 4);
Preferences preferences;

//------------------SENSOR DATA------------------------------
typedef struct {
    float soilMoisture;
    float temperature;
} SensorData;

// Initialize sensordata
SensorData incomingData;

//------------------Web Server----------------------
WebServer server(80);

const char* AP_SSID = "ESP32-Setup";
const char* AP_PASS = "12345678";

//------------------Led----------------------
unsigned long lastToggle = 0;
const unsigned long blinkInterval = 1000;

//------------------WI-FI----------------------
String ssid = "";
String password = "";
String verificationCode = "";
String serverURL = "http://192.168.1.173:5100/api/v1/generateHubVerification";

//---------------------------------------------
//          FUNCTION DECLARATIONS
//---------------------------------------------
void connectToWiFi();
void sendVerificationCode();
void handleRoot();
void handleConnect();
void startWebServer();
void onDataReceive(const uint8_t *mac, const uint8_t *incomingDataBuffer, int len);
void sendToServer(float moisture, float temperature);
String generateVerificationCode();

//------------------SETUP----------------------
void setup() {
    Serial.begin(115200);
    preferences.begin("wifi-config", false); 
    led.red();

    // Generate a unique verification code
    verificationCode = generateVerificationCode();
    Serial.println("Generated Verification Code: " + verificationCode);

    // Attempt to connect to Wi-Fi
    connectToWiFi();
}

//------------------MAIN LOOP----------------------
void loop() {
    if (WiFi.status() != WL_CONNECTED) {
        server.handleClient();
    }

>>>>>>> 924a67c (GrowByte: Firmware: Added Hub Firmware to repo)
    if (millis() - lastToggle >= blinkInterval) {
        lastToggle = millis();
        led.toggle();
    }
<<<<<<< HEAD

    //sendToServer();
}



=======
}

//------------------WI-FI CONNECTION----------------------
void connectToWiFi() {
    ssid = preferences.getString("ssid", "");
    password = preferences.getString("password", "");

    if (ssid.length() > 0) {
        Serial.println("Connecting to Wi-Fi...");
        WiFi.begin(ssid.c_str(), password.c_str());

        led.orange();
        unsigned long startAttemptTime = millis();
        while (WiFi.status() != WL_CONNECTED && millis() - startAttemptTime < 15000) {
            Serial.print(".");
            delay(500);
        }

        if (WiFi.status() == WL_CONNECTED) {
            Serial.println("\nConnected!");
            Serial.println(WiFi.localIP());
            led.green();

            // Send Verification Code to Server
            sendVerificationCode();
            return;
        }
    }

    // If not connected, start the Access Point
    Serial.println("\nStarting Access Point...");
    led.red();
    startWebServer();
}

//------------------SEND VERIFICATION CODE----------------------
void sendVerificationCode() {
    HTTPClient http;

    if (http.begin(serverURL)) {
        http.addHeader("Content-Type", "application/json");

        String jsonData = "{\"macAddress\": \"" + WiFi.macAddress() + 
                          "\", \"verificationCode\": \"" + verificationCode + "\"}";

        int httpResponseCode = http.POST(jsonData);

        if (httpResponseCode > 0) {
            String response = http.getString();
            Serial.println("Server Response: " + response);
        } else {
            Serial.printf("POST failed, error: %s\n", http.errorToString(httpResponseCode).c_str());
        }
        http.end();
    } else {
        Serial.println("Failed to connect to server.");
    }
}

//------------------WEB SERVER FOR AP MODE----------------------
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

void handleConnect() {
    ssid = server.arg("ssid");
    password = server.arg("password");

    // Store values in EEPROM
    preferences.putString("ssid", ssid);
    preferences.putString("password", password);

    server.send(200, "text/plain", "Credentials saved. Rebooting Device.");
    Serial.println("Credentials saved, Rebooting Device.");
    delay(2000);
    ESP.restart();
}

void startWebServer() {
    WiFi.softAP(AP_SSID, AP_PASS);
    IPAddress IP = WiFi.softAPIP();
    Serial.print("AP IP Address: ");
    Serial.println(IP);

    server.on("/", handleRoot);
    server.on("/connect", handleConnect);
    server.begin();
}

//------------------SENSOR DATA------------------------------
void onDataReceive(const uint8_t *mac, const uint8_t *incomingDataBuffer, int len) {
    memcpy(&incomingData, incomingDataBuffer, sizeof(incomingData));
    Serial.printf("Received data: Moisture = %.2f, Temp = %.2f\n", incomingData.soilMoisture, incomingData.temperature);

    sendToServer(incomingData.soilMoisture, incomingData.temperature);
}

void sendToServer(float moisture, float temperature) {
    HTTPClient http;

    if (http.begin(serverURL)) {
        http.addHeader("Content-Type", "application/json");

        String jsonData = "{\"moisture\":" + String(moisture, 2) + 
                          ", \"temperature\":" + String(temperature, 2) + "}";

        int httpResponseCode = http.POST(jsonData);

        if (httpResponseCode > 0) {
            Serial.printf("HTTP Response code: %d\n", httpResponseCode);
            String payload = http.getString();
            Serial.println("Server Response:");
            Serial.println(payload);
        } else {
            Serial.printf("POST failed, error: %s\n", http.errorToString(httpResponseCode).c_str());
        }
        http.end();
    } else {
        Serial.println("Failed to connect to server.");
    }
}

//------------------GENERATE UNIQUE CODE----------------------
String generateVerificationCode() {
    String mac = WiFi.macAddress();
    long timestamp = millis();
    String uniqueCode = mac + String(timestamp);
    uniqueCode.replace(":", ""); // Remove colons
    return uniqueCode;
}
>>>>>>> 924a67c (GrowByte: Firmware: Added Hub Firmware to repo)
