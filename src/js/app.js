import '../styles/app.css'
import Timer from './roundtime'
console.log('app.js');

const seconds = 6;
const time_stmp1 = seconds + '000';
const time_stmp2 = 10 + '000'



const timer1 = Timer('#timer1').init('000');

timer1.startTime();
//const timer2 = Timer('#timer2').init(time_stmp2);


// timer2.startTime(() => {
//     console.log('BIG END');
// });

// let semi = null;

// setTimeout(() => {
//     semi = timer1.stopTime();
    
// }, 3000)
// setTimeout(() => {
//     timer1.startTime(semi);
// }, 6000)

