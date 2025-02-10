// Test script for Micro:bit Joystick Extension
basic.showString("TEST");

// Ensure P2 (SW) is set as pull-up input to prevent false readings
pins.setPull(DigitalPin.P2, PinPullMode.PullUp);

// Function to continuously check joystick direction
basic.forever(function () {
    let direction = Joystick.getDirection();
    serial.writeLine("Joystick moved: " + direction);

    // Display direction on LED matrix
    if (direction == "UP") {
        basic.showArrow(ArrowNames.North);
    } else if (direction == "DOWN") {
        basic.showArrow(ArrowNames.South);
    } else if (direction == "LEFT") {
        basic.showArrow(ArrowNames.West);
    } else if (direction == "RIGHT") {
        basic.showArrow(ArrowNames.East);
    } else if (direction == "CLICK") {
        basic.showIcon(IconNames.Heart);
    } else {
        basic.clearScreen(); // If joystick is centered
    }

    basic.pause(100);
});

// Event-based detection test
Joystick.onMove("LEFT", function () {
    basic.showString("L");
    serial.writeLine("Event: Joystick moved LEFT");
});

Joystick.onMove("RIGHT", function () {
    basic.showString("R");
    serial.writeLine("Event: Joystick moved RIGHT");
});

Joystick.onMove("UP", function () {
    basic.showString("U");
    serial.writeLine("Event: Joystick moved UP");
});

Joystick.onMove("DOWN", function () {
    basic.showString("D");
    serial.writeLine("Event: Joystick moved DOWN");
});

Joystick.onMove("CLICK", function () {
    basic.showIcon(IconNames.Heart);
    serial.writeLine("Event: Joystick clicked!");
});
