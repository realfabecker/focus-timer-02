import {Display} from "./display.js";
import {seconds, minutes} from "./elements.js";
import {Timer} from "./timer.js";
import {Actions} from "./actions.js";

const display = new Display(minutes, seconds);
const timer = new Timer(display, 0, 2);
new Actions(timer, display).init();