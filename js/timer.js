const timerStopEvent = new Event("timer:stop");

export class Timer {
    constructor(display, minutes, seconds) {
        this.display = display;
        this.minutes = minutes;
        this.seconds = seconds;
        this.counter = null;
        this.running = false;
        this.display.updateDisplay(this.minutes, this.seconds)
    }

    start() {
        this.running = true;
        this._countdown();
    }

    pause() {
        this.running = false;
    }

    stop() {
        this.running = false;
        this.minutes = 0;
        this.seconds = 0;
        this.display.updateDisplay(0, 0)
    }

    setMinutes(minutes) {
        this.minutes = minutes
    }

    addMinutes(minutes) {
        if ((this.minutes + minutes) > 59) {
            this.minutes = 59;
        } else {
            this.minutes += minutes;
        }
        if (this.running) return
        this.display.updateDisplay(this.minutes, this.seconds)
    }

    subMinutes(minutes) {
        this.minutes -= this.minutes - minutes < 0 ? this.minutes : minutes;
        if (this.running) return
        this.display.updateDisplay(this.minutes, this.seconds)
    }

    _countdown() {
        if (this.counter) {
            clearInterval(this.counter)
        }
        this.counter = setInterval(() => {
            if (!this.running) {
                return clearInterval(this.counter);
            }
            this.seconds--;
            if (this.seconds < 0) {
                this.seconds = 59;
                this.minutes--;
            }
            if (this.minutes < 0) {
                clearInterval(this.counter);
                document.dispatchEvent(timerStopEvent)
                return this.stop();
            }
            this.display.updateDisplay(this.minutes, this.seconds)
        }, 1000)
    }
}