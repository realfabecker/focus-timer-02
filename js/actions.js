import {
    buttonPress,
    minusButton,
    minutes,
    pauseButton,
    playButton,
    plusButton,
    setButton,
    stopButton,
    coffeeAudio,
    fireAudio,
    forestAudio,
    rainAudio,
    rainButton,
    fireButton,
    coffeeButton,
    forestButton,
} from "./elements.js";

export class Actions {
    constructor(timer, display) {
        this.timer = timer
        this.display = display
    }

    init() {
        this._addTimerEventListeners();
        this._addButtonEventListeners();
        this._addFieldEventListeners();
    }

    _toggleRunning() {
        buttonPress.play();
        if (document.documentElement.classList.toggle("running")) {
            this.timer.start()
        } else {
            this.timer.pause()
        }
    }

    _reset() {
        buttonPress.play();
        document.documentElement.classList.remove("running")
        this.timer.stop()
    }

    _incMinBy(val) {
        buttonPress.play()
        this.timer.addMinutes(val);
    }

    _decMinBy(val) {
        buttonPress.play()
        this.timer.subMinutes(val)
    }

    _setMinutes() {
        buttonPress.play()
        minutes.setAttribute('contenteditable', 'true')
        minutes.focus()
    }

    _getToggleAudioHandler = (button, audio) => () => {
        if (button.classList.contains("pressed")) {
            button.classList.remove("pressed")
            audio.pause()
            audio.currentTime = 0;
        } else {
            button.classList.add("pressed")
            audio.play()
        }
    }


    _addTimerEventListeners() {
        document.addEventListener("timer:stop", this._reset.bind(this))
    }

    _addButtonEventListeners() {
        playButton.addEventListener("click", this._toggleRunning.bind(this))
        pauseButton.addEventListener("click", this._toggleRunning.bind(this))
        stopButton.addEventListener("click", this._reset.bind(this))
        setButton.addEventListener("click", this._setMinutes.bind(this))
        plusButton.addEventListener("click", () => this._incMinBy(5))
        minusButton.addEventListener("click", () => this._decMinBy(5))
        forestButton.addEventListener("click", this._getToggleAudioHandler(forestButton, forestAudio));
        rainButton.addEventListener("click", this._getToggleAudioHandler(rainButton, rainAudio))
        coffeeButton.addEventListener("click", this._getToggleAudioHandler(coffeeButton, coffeeAudio))
        fireButton.addEventListener("click", this._getToggleAudioHandler(fireButton, fireAudio))
    }

    _addFieldEventListeners() {
        minutes.addEventListener("focus", () => {
            minutes.textContent = ""
        })
        minutes.addEventListener("blur", (event) => {
            const val = event.target.textContent
            if (val > 60) {
                this.timer.setMinutes(59)
            } else {
                this.timer.setMinutes(val)
            }
            event.target.removeAttribute("contenteditable")
        })
        minutes.onkeydown = (event) => {
            if (minutes.textContent.length == 2) {
                return false;
            }
            return /\d+/.test(event.key)
        }
    }
}