<<<<<<< HEAD
<<<<<<< HEAD
#pragma once
=======
>>>>>>> 924a67c (GrowByte: Firmware: Added Hub Firmware to repo)
=======
#pragma once
>>>>>>> 440237f (GrowByte: Firmware: Added Hub Firmware to repo)
#include <Arduino.h>

class Led {
public:
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 440237f (GrowByte: Firmware: Added Hub Firmware to repo)
    Led(int redPin, int greenPin, int bluePin);
    void red();
    void green();
    void orange();
    void off();
    void toggle();
<<<<<<< HEAD
=======
    Led(int redPin, int greenPin, int bluePin)
        : redPin(redPin), greenPin(greenPin), bluePin(bluePin) {
        pinMode(redPin, OUTPUT);
        pinMode(greenPin, OUTPUT);
        pinMode(bluePin, OUTPUT);
        currentR = currentG = currentB = 0;
        isOn = true;
    }

    void red()    { setColor(255, 0, 0); }
    void green()  { setColor(0, 255, 0); }
    void orange() { setColor(255, 100, 0); }

    void toggle() {
        isOn = !isOn;
        applyColor();
    }
>>>>>>> 924a67c (GrowByte: Firmware: Added Hub Firmware to repo)
=======
>>>>>>> 440237f (GrowByte: Firmware: Added Hub Firmware to repo)

private:
    int redPin, greenPin, bluePin;
    int currentR, currentG, currentB;
    bool isOn;

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 440237f (GrowByte: Firmware: Added Hub Firmware to repo)
    void setColor(int r, int g, int b);
    void applyColor();
};

extern Led led;
<<<<<<< HEAD
=======
    void setColor(int r, int g, int b) {
        currentR = r;
        currentG = g;
        currentB = b;
        isOn = true;
        applyColor();
    }

    void applyColor() {
        analogWrite(redPin,   isOn ? currentR : 0);
        analogWrite(greenPin, isOn ? currentG : 0);
        analogWrite(bluePin,  isOn ? currentB : 0);
    }
};
>>>>>>> 924a67c (GrowByte: Firmware: Added Hub Firmware to repo)
=======
>>>>>>> 440237f (GrowByte: Firmware: Added Hub Firmware to repo)
