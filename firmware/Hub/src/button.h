#pragma once
#include <Arduino.h>

class Button {
public:
    Button(uint8_t pin, unsigned long longPressDuration = 5000);
    void begin();
    void update();
    bool wasPressed();
    bool wasLongPressed();

private:
    uint8_t pin;
    unsigned long pressStartTime;
    unsigned long longPressDuration;
    bool isPressed;
    bool longPressHandled;
};
