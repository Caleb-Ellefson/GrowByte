#include "led.h"

Led led(D3, D5, D6);

Led::Led(int redPin, int greenPin, int bluePin)
    : redPin(redPin), greenPin(greenPin), bluePin(bluePin) {
    pinMode(redPin, OUTPUT);
    pinMode(greenPin, OUTPUT);
    pinMode(bluePin, OUTPUT);
    currentR = currentG = currentB = 0;
    isOn = true;
}

void Led::red()    { setColor(255, 0, 0); }
void Led::green()  { setColor(0, 255, 0); }
void Led::orange() { setColor(255, 100, 0); }
void Led::off()    { setColor(0, 0, 0); }

void Led::toggle() {
    isOn = !isOn;
    applyColor();
}

void Led::setColor(int r, int g, int b) {
    currentR = r;
    currentG = g;
    currentB = b;
    isOn = true;
    applyColor();
}

void Led::applyColor() {
    analogWrite(redPin, isOn ? currentR : 0);
    analogWrite(greenPin, isOn ? currentG : 0);
    analogWrite(bluePin, isOn ? currentB : 0);
}
