namespace Joystick {
    // Default pin assignments
    let xPin: AnalogPin = AnalogPin.P0;
    let yPin: AnalogPin = AnalogPin.P1;
    let swPin: DigitalPin = DigitalPin.P2;

    // Default thresholds for joystick movement detection
    let lowThreshold: number = 300;  // Below this value for LEFT/UP
    let highThreshold: number = 700; // Above this value for RIGHT/DOWN

    // Debouncing variables for the switch
    let lastSwitchState: number = 1;  // 1 = not pressed, 0 = pressed (pull-up)
    let lastDebounceTime: number = 0;
    const debounceDelay: number = 50; // 50ms debounce delay

    // Initialize pull-up mode for the switch pin
    pins.setPull(swPin, PinPullMode.PullUp);

    /**
     * Configure the pins for the joystick.
     * @param xAxisPin The pin for the X-axis (analog), e.g., AnalogPin.P0
     * @param yAxisPin The pin for the Y-axis (analog), e.g., AnalogPin.P1
     * @param switchPin The pin for the switch (digital), e.g., DigitalPin.P2
     */
    //% blockId="joystick_set_pins"
    //% block="set joystick pins | X-axis %xAxisPin| Y-axis %yAxisPin| Switch %switchPin"
    export function setPins(xAxisPin: AnalogPin, yAxisPin: AnalogPin, switchPin: DigitalPin): void {
        xPin = xAxisPin;
        yPin = yAxisPin;
        swPin = switchPin;
        pins.setPull(swPin, PinPullMode.PullUp); // Reapply pull-up for new switch pin
    }

    /**
     * Set the thresholds for detecting joystick movement.
     * @param low The low threshold (0-1023), e.g., 300
     * @param high The high threshold (0-1023), e.g., 700
     */
    //% blockId="joystick_set_thresholds"
    //% block="set joystick thresholds | low %low| high %high"
    //% low.min=0 low.max=1023
    //% high.min=0 high.max=1023
    export function setThresholds(low: number, high: number): void {
        lowThreshold = Math.clamp(0, 1023, low);  // Ensure within valid range
        highThreshold = Math.clamp(0, 1023, high);
    }

    /**
     * Get the direction of the joystick.
     * Returns "UP", "DOWN", "LEFT", "RIGHT", "CLICK", or "CENTER".
     */
    //% blockId="joystick_get_direction"
    //% block="get joystick direction"
    export function getDirection(): string {
        // Read analog values for X and Y axes
        let x: number = pins.analogReadPin(xPin);
        let y: number = pins.analogReadPin(yPin);

        // Read the switch state with debouncing
        let currentSwitchState: number = pins.digitalReadPin(swPin);
        let currentTime: number = input.runningTime();
        let switchPressed: boolean = false;

        // Debounce the switch
        if (currentSwitchState !== lastSwitchState) {
            lastDebounceTime = currentTime;
        }
        if ((currentTime - lastDebounceTime) > debounceDelay) {
            if (currentSwitchState === 0) { // Switch is pressed (active low due to pull-up)
                switchPressed = true;
            }
        }
        lastSwitchState = currentSwitchState;

        // Determine direction based on analog readings
        if (switchPressed) {
            return "CLICK";
        } else if (x < lowThreshold) {
            return "LEFT";
        } else if (x > highThreshold) {
            return "RIGHT";
        } else if (y < lowThreshold) {
            return "UP";
        } else if (y > highThreshold) {
            return "DOWN";
        } else {
            return "CENTER"; // Default when no movement or click
        }
    }
}
