import '../styles/roundtime.css'

class RoundTime {
    constructor(containerId, time) {
        this.container = document.querySelector(containerId);
        this.time = time;
        this._timeInterval = null;
        this._deadline = null;

        this.daysElem = null;
        this.hoursElem = null;
        this.minutesElem = null;
        this.secondsElem = null;

        this.circleDay = null;
        this.circleHour = null;
        this.circleMin = null;
        this.circleSec = null;
        
        // this.rt__sign-day = null;
        // this.rt__sign-hour = null;
        // this.rt__sign-min = null;
    }
    init() {
        this._deadline = new Date(Date.parse(new Date()) + parseInt(this.time));
        console.log('timer start');
        this.addTemplate();

        this.daysElem = this.container.querySelector('.rt__sign-day'),
        this.hoursElem = this.container.querySelector('.rt__sign-hour'),
        this.minutesElem = this.container.querySelector('.rt__sign-min'),
        this.secondsElem = this.container.querySelector('.rt__sign-sec'),
        this.circleDay = this.container.querySelector('.rt__day'),
        this.circleHour = this.container.querySelector('.rt__hour'),
        this.circleMin = this.container.querySelector('.rt__min'),
        this.circleSec = this.container.querySelector('.rt__sec');
        
        this.initializeClock();
    }

    initializeClock() {
        this.updateClock();
        this._timeInterval = setInterval(this.updateClock.bind(this), 1000);
    }

    updateClock() {
        const timeRemain = this.timeRemaining();

        this.renderData(timeRemain);

        if (timeRemain.total <= 0) {
            this.stopTimer();
        }
    }
    timeRemaining() {
        const timeRemain = Date.parse(this._deadline) - Date.parse(new Date()),
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
            'total': timeRemain,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
            'off_days': offsetDays,
            'off_hours': offsetHours,
            'off_min': offsetMinutes,
            'off_sec': offsetSeconds
        }    
    }
    renderData(timeRemain) {
        const data = {
            d: timeRemain.days,
            h: ('0' + timeRemain.hours).slice(-2),
            m: ('0' + timeRemain.minutes).slice(-2),
            s: ('0' + timeRemain.seconds).slice(-2)
        };
        
        this.daysElem.innerHTML = timeRemain.days;
        this.hoursElem.innerHTML = timeRemain.hours;
        this.minutesElem.innerHTML = timeRemain.minutes;
        this.secondsElem.innerHTML = timeRemain.seconds;
        this.circleDay.style.strokeDashoffset = timeRemain.off_days + 'px';
        this.circleHour.style.strokeDashoffset = timeRemain.off_hours + 'px';
        this.circleMin.style.strokeDashoffset = timeRemain.off_min + 'px';
        this.circleSec.style.strokeDashoffset = timeRemain.off_sec + 'px';  




        console.log(`hours: ${data.h}, minutes: ${timeRemain.minutes}, seconds: ${data.s}`);
    }
    stopTimer() {
        if(this._timeInterval !== null) {
            clearInterval(this._timeInterval);
            console.log('timer stop');
            // return new Promise((resolve, reject)=> {
            //     resolve('timer stop')
            // }, () => {
            //     reject('timer fail')
            // })
        }
    }
    addTemplate() {
        const fragment = document.createDocumentFragment();
        const newElement = document.createElement('div');
        const template = `
            <svg class="rt__circle rt__circle_d" width="90" height="90" viewbox="0 0 90 90">
                <g>
                    <circle class="rt__back" transform="rotate(-90, 45, 45)" r="40" cx="45" cy="45"></circle>
                    <circle class="rt__front rt__day" transform="rotate(-90, 45, 45)" r="40" cx="45" cy="45"></circle>
                    <text class="rt__sign" id ="rt-day" x="50%" y="50%" text-anchor="middle"  dy="-5%" >0</text>
                    <text class="rt__desq" id ="rt-day-text" x="50%" y="50%" text-anchor="middle"  dy="15%">дней</text>
                </g>
            </svg>
            <svg class="rt__circle rt__circle_h" width="90" height="90" viewbox="0 0 90 90">
                <g>
                    <circle class="rt__back" transform="rotate(-90, 45, 45)" r="40" cx="45" cy="45"></circle>
                    <circle class="rt__front rt__hour" transform="rotate(-90, 45, 45)" r="40" cx="45" cy="45"></circle>
                    <text class="rt__sign" id ="rt-hour" x="50%" y="50%" text-anchor="middle"  dy="-5%" >0</text>
                    <text class="rt__desq" id ="rt-hour-text" x="50%" y="50%" text-anchor="middle"  dy="15%">часов</text>
                </g>
            </svg>
            <svg class="rt__circle rt__circle_m" width="90" height="90" viewbox="0 0 90 90">
                <g>
                    <circle class="rt__back" transform="rotate(-90, 45, 45)" r="40" cx="45" cy="45"></circle>
                    <circle class="rt__front rt__min" transform="rotate(-90, 45, 45)" r="40" cx="45" cy="45"></circle>
                    <text class="rt__sign" id ="rt-min" x="50%" y="50%" text-anchor="middle"  dy="-5%" >0</text>
                    <text class="rt__desq" id ="rt-min-text" x="50%" y="50%" text-anchor="middle"  dy="15%">минут</text>
                </g>
            </svg>
            <svg class="rt__circle rt__circle_s" width="90" height="90" viewbox="0 0 90 90">
                <g>
                    <circle class="rt__back" transform="rotate(-90, 45, 45)" r="40" cx="45" cy="45"></circle>
                    <circle class="rt__front rt__sec" transform="rotate(-90, 45, 45)" r="40" cx="45" cy="45"></circle>
                    <text class="rt__sign" id ="rt-sec" x="50%" y="50%" text-anchor="middle"  dy="-5%" >0</text>
                    <text class="rt__desq" id ="rt-sec-text" x="50%" y="50%" text-anchor="middle"  dy="15%">секунд</text>
                </g>
            </svg>
        `;
        newElement.classList.add('rt-timer')
        newElement.innerHTML = template;
        fragment.appendChild(newElement);
        this.container.appendChild(fragment);
    }
}

export default RoundTime;