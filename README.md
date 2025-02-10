# Micro:bit Joystick Extension

This extension provides an easy way to use a joystick module with the BBC Micro:bit.  
Students can detect **LEFT, RIGHT, UP, DOWN, CENTER, or CLICK** without complex coding.

## Features
✅ Simple joystick direction detection  
✅ Runs in the background  
✅ Works with AnalogPin P0 (X), P1 (Y), and DigitalPin P2 (SW)

## Installation
1. Open [Micro:bit MakeCode](https://makecode.microbit.org/).
2. Go to **Advanced** → **Extensions**.
3. Paste this GitHub link:  
   📌 `https://github.com/YOUR_GITHUB_USERNAME/microbit-joystick-extension`
4. Click **Search** → **Import**.

## How to Use
### **Detect Direction**
```typescript
let direction = Joystick.getDirection();
serial.writeLine("Direction: " + direction);
