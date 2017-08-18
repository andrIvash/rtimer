import '../styles/app.css'
import Timer from './roundtime'
console.log('app.js');

const seconds = 6;
const time_stmp1 = seconds + '000';
const time_stmp2 = 10 + '000'
//const time_stmp = seconds + '0'


const timer1 = Timer('#timer1').init(time_stmp1).startTime();
Timer('#timer2').init(time_stmp2);

setTimeout(() => {
    timer1.stopTime();
}, 3000)
setTimeout(() => {
    timer1.startTime();
}, 6000)
//const timer2 = new Timer('#timer2', time_stmp2)
//timer1.init(time_stmp1);
//timer2.init(time_stmp2);
//timer2.init('#timer2', time_stmp2);
