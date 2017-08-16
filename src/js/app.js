import '../styles/app.css'
import Timer from './roundtime'
console.log('app.js');

const seconds = 6;
const time_stmp = seconds + '000'
//const time_stmp = seconds + '0'

const timer = new Timer('#inner-timer', time_stmp)
timer.init();
//timer.init('inner-timer', time_stmp);