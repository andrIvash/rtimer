import '../styles/app.css'
import Timer from './roundtime'
console.log('app.js');

const seconds = 6;
const time_stmp1 = seconds;
const time_stmp2 = 10;



const timer1 = Timer('#timer1').init(5, {
    lang: 'bb',
    tcolor: 'red'
});

timer1.startTime();

// const timer2 = Timer('#timer2').init();


// timer2.startTime(5, () => {
//     console.log('BIG END');
// });

// let semi = null;

// setTimeout(() => {
//     semi = timer1.stopTime();
    
// }, 3000)
// setTimeout(() => {
//     timer1.startTime(semi);
// }, 6000)

