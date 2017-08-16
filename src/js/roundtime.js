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
        
        // this.inner-timer__sign-day = null;
        // this.inner-timer__sign-hour = null;
        // this.inner-timer__sign-min = null;
    }
    init() {
        this._deadline = new Date(Date.parse(new Date()) + parseInt(this.time));
        console.log('timer start');
        this.addTemplate();

        this.daysElem = this.container.querySelector('.inner-timer__sign-day'),
        this.hoursElem = this.container.querySelector('.inner-timer__sign-hour'),
        this.minutesElem = this.container.querySelector('.inner-timer__sign-min'),
        this.secondsElem = this.container.querySelector('.inner-timer__sign-sec'),
        this.circleDay = this.container.querySelector('.inner-timer__day'),
        this.circleHour = this.container.querySelector('.inner-timer__hour'),
        this.circleMin = this.container.querySelector('.inner-timer__min'),
        this.circleSec = this.container.querySelector('.inner-timer__sec');
        
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
        }
    }
    addTemplate() {
        const fragment = document.createDocumentFragment();
        const newElement = document.createElement('div');
        const template = `
                <div class="inner-timer__circle-wrap">
                    <svg class="inner-timer__circle" width="90" height="90">
                        <circle class="inner-timer__back" transform="rotate(-90, 45, 45)" r="40" cx="45" cy="45"></circle>
                        <circle class="inner-timer__front inner-timer__day" transform="rotate(-90, 45, 45)" r="40" cx="45" cy="45"></circle>
                    </svg>
                    <div class="inner-timer__digit">
                        <div class="inner-timer__sign inner-timer__sign-day">0</div>
                        <div class="inner-timer__desq inner-timer__desq-day">дней</div>
                    </div>
                </div>
                <div class="inner-timer__circle-wrap">
                    <svg class="inner-timer__circle" width="90" height="90" viewbox="0 0 90 90">
                        <circle class="inner-timer__back" transform="rotate(-90, 45, 45)" r="40" cx="45" cy="45"></circle>
                        <circle class="inner-timer__front inner-timer__hour" transform="rotate(-90, 45, 45)" r="40" cx="45" cy="45"></circle>
                    </svg>
                    <div class="inner-timer__digit">
                        <div class="inner-timer__sign inner-timer__sign-hour">0</div>
                        <div class="inner-timer__desq inner-timer__desq-hour">часов</div>
                    </div>
                </div>
                <div class="inner-timer__circle-wrap">
                    <svg class="inner-timer__circle" width="90" height="90">
                        <circle class="inner-timer__back" transform="rotate(-90, 45, 45)" r="40" cx="45" cy="45"></circle>
                        <circle class="inner-timer__front inner-timer__min" transform="rotate(-90, 45, 45)" r="40" cx="45" cy="45"></circle>
                    </svg>
                    <div class="inner-timer__digit">
                        <div class="inner-timer__sign inner-timer__sign-min">0</div>
                        <div class="inner-timer__desq inner-timer__desq-min">минут</div>
                    </div>
                </div>
                <div class="inner-timer__circle-wrap">
                    <svg class="inner-timer__circle" width="90" height="90">
                        <circle class="inner-timer__back" transform="rotate(-90, 45, 45)" r="40" cx="45" cy="45"></circle>
                        <circle class="inner-timer__front inner-timer__sec" transform="rotate(-90, 45, 45)" r="40" cx="45" cy="45"></circle>
                    </svg>
                    <div class="inner-timer__digit">
                        <div class="inner-timer__sign inner-timer__sign-sec">0</div>
                        <div class="inner-timer__desq inner-timer__desq-sec">секунд</div>
                    </div>
                </div>
        `;
        newElement.innerHTML = template;
        fragment.appendChild(newElement);
        this.container.appendChild(fragment);
    }
}

export default RoundTime;