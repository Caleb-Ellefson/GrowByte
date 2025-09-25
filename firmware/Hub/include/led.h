#pragma once
#include <Arduino.h>

class Led {
public:
    Led(int redPin, int greenPin, int bluePin);
    void red();
    void green();
    void orange();
    void off();
    void toggle();

private:
    int redPin, greenPin, bluePin;
    int currentR, currentG, currentB;
    bool isOn;

    void setColor(int r, int g, int b);
    void applyColor();
};

extern Led led;
