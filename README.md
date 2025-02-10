# Micro:bit Joystick Extension

This extension provides an easy way to use a **joystick module** with the BBC Micro:bit.  
Students can detect **LEFT, RIGHT, UP, DOWN, CENTER, or CLICK** without complex coding.

---

## Features
✅ **Detects joystick movements easily**  
✅ **Prevents false clicks using a pull-up resistor**  
✅ **Works with AnalogPin P0 (X), P1 (Y), and DigitalPin P2 (SW)**  
✅ **Includes event-based and continuous checking functions**  

---

## Hardware Setup
1. **Connect the joystick module to the Micro:bit**:  
   | Joystick Pin | Micro:bit Pin |
   |-------------|--------------|
   | GND         | GND          |
   | +5V        | 3.3V         |
   | VRX        | P0           |
   | VRY        | P1           |
   | SW         | P2           |

2. **Upload the example code to Micro:bit.**  

---

## Installation

### **Option 1: Add via MakeCode**
1. Open [Micro:bit MakeCode](https://makecode.microbit.org/).
2. Go to **Advanced** → **Extensions**.
3. Paste this GitHub link:  
   📌 `https://github.com/YOUR_GITHUB_USERNAME/microbit-joystick-extension`
4. Click **Search** → **Import**.

### **Option 2: Manually Include in Your Project**
- Copy the **`main.ts`** file from this repository into your Micro:bit project.

---

## How to Use

### **1️⃣ Get Joystick Direction**
This function returns the current direction of the joystick.

```typescript
basic.forever(function () {
    let direction = Joystick.getDirection();
    serial.writeLine("Joystick moved: " + direction);
    basic.pause(100);
});

### **2️⃣ Event-Based Detection**
Run specific code only when the joystick moves in a certain direction.
Joystick.onMove("LEFT", function () {
    basic.showString("L");
    serial.writeLine("Joystick moved LEFT");
});

Joystick.onMove("RIGHT", function () {
    basic.showString("R");
    serial.writeLine("Joystick moved RIGHT");
});

Joystick.onMove("UP", function () {
    basic.showString("U");
    serial.writeLine("Joystick moved UP");
});

Joystick.onMove("DOWN", function () {
    basic.showString("D");
    serial.writeLine("Joystick moved DOWN");
});

Joystick.onMove("CLICK", function () {
    basic.showIcon(IconNames.Heart);
    serial.writeLine("Joystick clicked!");
});

