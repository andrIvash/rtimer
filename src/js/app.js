import '../styles/app.css'
import Timer from './roundtime'
console.log('app.js');

const seconds = 6;
const time_stmp1 = seconds + '000';
const time_stmp2 = 10 + '000'
//const time_stmp = seconds + '0'


const timer1 = Timer('#timer1', time_stmp1);
const timer2 = Timer('#timer2', time_stmp2);
//const timer2 = new Timer('#timer2', time_stmp2)
timer1.init();
timer2.init();
//timer2.init('#timer2', time_stmp2);
