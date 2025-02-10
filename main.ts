namespace Joystick {
    let xPin = AnalogPin.P0;
    let yPin = AnalogPin.P1;
    let swPin = DigitalPin.P2;

    // Set pull-up mode for switch pin
    pins.setPull(swPin, PinPullMode.PullUp);

    /**
     * Get the direction of the joystick
     */
    //% blockId="joystick_get_direction"
    //% block="get joystick direction"
    export function getDirection(): string {
        let x = pins.analogReadPin(xPin);
        let y = pins.analogReadPin(yPin);
        let sw = pins.digitalReadPin(swPin); // Read switch state

        if (x < 300) return "LEFT";
        if (x > 700) return "RIGHT";
        if (y < 300) return "UP";
        if (y > 700) return "DOWN";
        if (sw === 0) return "CLICK";  // Button is pressed
        return "CENTER";  // Default when no movement
    }
}
