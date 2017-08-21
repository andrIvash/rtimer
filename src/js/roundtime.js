import '../styles/roundtime.css'



class RoundTime {
    
    constructor(containerId) {
       
        this.timerName = containerId;
        this.container = document.querySelector(containerId);
        this.time = null;

        this._privateData = {
            isRunning: false,
            callback: () => {},
            deadline: null,
            
            daysElem: null,
            hoursElem: null,
            minutesElem: null,
            secondsElem: null,

            circleDay:null,
            circleHour: null,
            circleMin: null,
            circleSec: null,

            language: 'ru',
            tcolor: 'grey',
            rcolor: 'grey',
            bcolor: 'grey'

        }
    }

    init(time, obj) {
        if (time && parseInt(time) !== null) {
            this.time = time * 1000;
            this._privateData.deadline = new Date(Date.parse(new Date()) + parseInt(this.time));
        }
        if(arguments[1] && arguments[1] === Object(arguments[1])) {
            (obj.tcolor && obj.tcolor !== 'grey') ? this._privateData.tcolor = obj.tcolor : this._privateData.tcolor = 'grey';
            (obj.rcolor && obj.rcolor !== 'grey') ? this._privateData.rcolor = obj.rcolor : this._privateData.rcolor = 'grey'; 
            (obj.bcolor && obj.bcolor !== 'grey') ? this._privateData.bcolor = obj.bcolor : this._privateData.bcolor = 'grey'; 
            (obj.lang && obj.lang === 'en') ? this._privateData.language = 'en' : this._privateData.language = 'ru';

            console.log({
                lang: this._privateData.language,
                tcolor: this._privateData.tcolor,
                rcolor: this._privateData.rcolor,
                bcolor: this._privateData.bcolor
            })
        } 
        
        this.addTemplate();

        this._privateData.daysElem = this.container.querySelector('.rt-day'),
        this._privateData.hoursElem = this.container.querySelector('.rt-hour'),
        this._privateData.minutesElem = this.container.querySelector('.rt-min'),
        this._privateData.secondsElem = this.container.querySelector('.rt-sec'),
        this._privateData.circleDay = this.container.querySelector('.rt__day'),
        this._privateData.circleHour = this.container.querySelector('.rt__hour'),
        this._privateData.circleMin = this.container.querySelector('.rt__min'),
        this._privateData.circleSec = this.container.querySelector('.rt__sec');

        this.updateClock();
        return this;
    }

    startTime(time = null , callback = () => {}) {
        if(this._privateData.isRunning) {
            console.error('you should set time');
        } else { 
            this.time = typeof time !== 'function' && time !== null ? time * 1000 : this.time;
            if (this.time !== 0) {
                console.log(`timer ${this.timerName} start`);
                this._privateData.deadline = new Date(Date.parse(new Date()) + parseInt(this.time));        
                this._privateData.isRunning = true;
                typeof time === 'function' ? this._privateData.callback = time : this._privateData.callback = callback;
                this.updateClock();
                this._privateData.timeInterval = setInterval(() => {this.updateClock()}, 1000);
            } else {
                console.error('you should set time');
            }
        }
        return this;
    }

    updateClock() {
        const timeRemain = this.timeRemaining();

        this.renderData(timeRemain);

        if (timeRemain.total <= 0) {
            this.stopTime();
            this._privateData.isRunning = false;
            
        }
    }
    timeRemaining() {
        const timeRemain = Date.parse(this._privateData.deadline) - Date.parse(new Date()), 
            seconds = Math.floor((timeRemain / 1000) % 60),
            minutes = Math.floor((timeRemain / 1000 / 60) % 60),
            hours = Math.floor((timeRemain / (1000 * 60 * 60)) % 24),
            days = Math.floor(timeRemain / (1000 * 60 * 60 * 24)),

            // percentDays = 100/31 * days,
            // percentHours = 100/24 * hours,
            // percentMinutes = 100/60 * minutes,
            // percentSeconds = 100/60 * seconds;


            total =  252, // значение stroke-dasharray круга подбирается опытным путем
            offsetDays =  (total / 100) * (100 - (100/31 * days)),
            offsetHours =  (total / 100) * (100 - (100/24 * hours)),
            offsetMinutes =  (total / 100) * (100 - (100/60 * minutes)),
            offsetSeconds =  (total / 100) * (100 - (100/60 * seconds));

        
        return {
            'total': timeRemain || 0,
            'days': days || 0,
            'hours': hours || 0,
            'minutes': minutes || 0, 
            'seconds': seconds || 0,
            'off_days': offsetDays || 0,
            'off_hours': offsetHours || 0,
            'off_min': offsetMinutes || 0,
            'off_sec': offsetSeconds || 0
        }    
    }
    renderData(timeRemain) {
        const data = {
            d: timeRemain.days,
            h: ('0' + timeRemain.hours).slice(-2),
            m: ('0' + timeRemain.minutes).slice(-2),
            s: ('0' + timeRemain.seconds).slice(-2)
        };
        
        this._privateData.daysElem.innerHTML = timeRemain.days;
        this._privateData.hoursElem.innerHTML = timeRemain.hours;
        this._privateData.minutesElem.innerHTML = timeRemain.minutes;
        this._privateData.secondsElem.innerHTML = timeRemain.seconds;
        this._privateData.circleDay.style.strokeDashoffset = timeRemain.off_days + 'px';
        this._privateData.circleHour.style.strokeDashoffset = timeRemain.off_hours + 'px';
        this._privateData.circleMin.style.strokeDashoffset = timeRemain.off_min + 'px';
        this._privateData.circleSec.style.strokeDashoffset = timeRemain.off_sec + 'px';  

        console.log(`hours: ${data.h}, minutes: ${timeRemain.minutes}, seconds: ${data.s}`);
    }

    stopTime() {
        if(this._privateData.timeInterval !== null) {
            clearInterval(this._privateData.timeInterval);
            console.log(`timer ${this.timerName} stop`);
            this._privateData.isRunning = false;
            
        }
        
        this._privateData.callback();
        return Date.parse(this._privateData.deadline) - Date.parse(new Date());
         
        
    }
    
    addTemplate() {
        const fragment = document.createDocumentFragment();
        const newElement = document.createElement('div');
        const template = `
            <svg class="rt__circle rt__circle_d" width="90" height="90" viewbox="0 0 90 90">
                <g>
                    <circle class="rt__back" transform="rotate(-90, 45, 45)" r="40" cx="45" cy="45"></circle>
                    <circle class="rt__front rt__day" transform="rotate(-90, 45, 45)" r="40" cx="45" cy="45"></circle>
                    <text class="rt__sign rt-day" x="50%" y="50%" text-anchor="middle"  dy="-5%" >0</text>
                    <text class="rt__desq rt-day-text" x="50%" y="50%" text-anchor="middle"  dy="15%">дней</text>
                </g>
            </svg>
            <svg class="rt__circle rt__circle_h" width="90" height="90" viewbox="0 0 90 90">
                <g>
                    <circle class="rt__back" transform="rotate(-90, 45, 45)" r="40" cx="45" cy="45"></circle>
                    <circle class="rt__front rt__hour" transform="rotate(-90, 45, 45)" r="40" cx="45" cy="45"></circle>
                    <text class="rt__sign rt-hour" x="50%" y="50%" text-anchor="middle"  dy="-5%" >0</text>
                    <text class="rt__desq rt-hour-text" x="50%" y="50%" text-anchor="middle"  dy="15%">часов</text>
                </g>
            </svg>
            <svg class="rt__circle rt__circle_m" width="90" height="90" viewbox="0 0 90 90">
                <g>
                    <circle class="rt__back" transform="rotate(-90, 45, 45)" r="40" cx="45" cy="45"></circle>
                    <circle class="rt__front rt__min" transform="rotate(-90, 45, 45)" r="40" cx="45" cy="45"></circle>
                    <text class="rt__sign rt-min" x="50%" y="50%" text-anchor="middle"  dy="-5%" >0</text>
                    <text class="rt__desq rt-min-text" x="50%" y="50%" text-anchor="middle"  dy="15%">минут</text>
                </g>
            </svg>
            <svg class="rt__circle rt__circle_s" width="90" height="90" viewbox="0 0 90 90">
                <g>
                    <circle class="rt__back" transform="rotate(-90, 45, 45)" r="40" cx="45" cy="45"></circle>
                    <circle class="rt__front rt__sec" transform="rotate(-90, 45, 45)" r="40" cx="45" cy="45"></circle>
                    <text class="rt__sign rt-sec" x="50%" y="50%" text-anchor="middle"  dy="-5%" >0</text>
                    <text class="rt__desq rt-sec-text" x="50%" y="50%" text-anchor="middle"  dy="15%">секунд</text>
                </g>
            </svg>
        `;
        newElement.classList.add('rt-timer')
        newElement.innerHTML = template;
        fragment.appendChild(newElement);
        this.container.appendChild(fragment);
    }
}


//const roundTime = RoundTime;
//Foo = function(...args) { return new _old(...args) };
//export default RoundTime;
export default function(...args) { return new RoundTime(...args) };