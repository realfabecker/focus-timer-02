export class Display {
    constructor(minutesField, secondsField) {
        this.minutesField = minutesField;
        this.secondsField = secondsField;
    }

    updateDisplay(m, s) {
        this.minutesField.textContent = m.toString().padStart(2, "0")
        this.secondsField.textContent = s.toString().padStart(2, "0")
    }
}