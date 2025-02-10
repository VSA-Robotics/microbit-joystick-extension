namespace Joystick {
    let xPin = AnalogPin.P0;
    let yPin = AnalogPin.P1;
    let swPin = DigitalPin.P2;

    /**
     * Get the direction of the joystick
     */
    //% blockId="joystick_get_direction"
    //% block="get joystick direction"
    export function getDirection(): string {
        let x = pins.analogReadPin(xPin);
        let y = pins.analogReadPin(yPin);
        let sw = pins.digitalReadPin(swPin);

        if (x < 300) return "LEFT";
        if (x > 700) return "RIGHT";
        if (y < 300) return "UP";
        if (y > 700) return "DOWN";
        if (sw === 0) return "CLICK";
        return "CENTER";
    }

    /**
     * Runs when joystick moves in a specific direction
     */
    //% blockId="joystick_on_move"
    //% block="on joystick move %direction"
    export function onMove(direction: string, handler: () => void): void {
        control.inBackground(function () {
            while (true) {
                if (getDirection() === direction) {
                    handler();
                }
                basic.pause(50);
            }
        });
    }
}
