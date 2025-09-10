#include "button.h"
#include <Preferences.h>
extern Preferences preferences; 
#include "led.h"
#include "Arduino.h"
#include "esp_mac.h"

Button::Button(uint8_t pin, unsigned long longPressDuration)
    : pin(pin), pressStartTime(0), longPressDuration(longPressDuration),
      isPressed(false), longPressHandled(false) {}

void Button::begin() {
    pinMode(pin, INPUT_PULLUP);
}

void Button::update() {
    bool reading = digitalRead(pin) == LOW;

    if (reading && !isPressed) {
        pressStartTime = millis();
        isPressed = true;
        longPressHandled = false;
        Serial.print("Button Pressed!");
        led.orange();
    }

    if (!reading && isPressed) {
        isPressed = false;
        led.green();
    }

    if (isPressed && !longPressHandled && (millis() - pressStartTime >= longPressDuration)) {
        preferences.remove("ssid");
        preferences.remove("password");
        preferences.remove("tokenKey");
        led.red();
        delay(2000);
        ESP.restart();
        longPressHandled = true;
    }
}

bool Button::wasPressed() {
    if (!isPressed && (millis() - pressStartTime < longPressDuration)) {
        // Reset the state after reporting
        led.orange();
        pressStartTime = millis();
        return true;
    }
    return false;
}

bool Button::wasLongPressed() {
    return longPressHandled;
}
