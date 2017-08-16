module.exports = (function () {
    var timeInterval = null;

    function init (timerId, time) {
        var clock = document.getElementById(timerId);


        if (clock) {
            var deadline = new Date(parseInt(time));
            console.log('timer start', deadline);
            stopTimer();
            initializeClock(clock, deadline);

        } else {
            console.warn('timer error');
            throw new Error('таймер не подключен');
        }

    }
    function stopTimer() {
        if(timeInterval !== null) {
            clearInterval(timeInterval);
        }
    }

    function getTimeRemaining(endTime) {
        var timeRemain = Date.parse(endTime) - Date.parse(new Date()),
            seconds = Math.floor((timeRemain / 1000) % 60),
            minutes = Math.floor((timeRemain / 1000 / 60) % 60),
            hours = Math.floor((timeRemain / (1000 * 60 * 60)) % 24),
            days = Math.floor(timeRemain / (1000 * 60 * 60 * 24)),

            percentDays = 100/31 * days,
            percentHours = 100/24 * hours,
            percentMinutes = 100/60 * minutes,
            percentSeconds = 100/60 * seconds;


        var total =  252; // значение stroke-dasharray круга
        console.log(Date.parse(endTime))
        console.log(Date.parse(new Date()))
        console.log(timeRemain)
        console.log(minutes)

        var offsetDays =  (total / 100) * (100 - percentDays),
            offsetHours =  (total / 100) * (100 - percentHours),
            offsetMinutes =  (total / 100) * (100 - percentMinutes),
            offsetSeconds =  (total / 100) * (100 - percentSeconds);

        return {
            'total': timeRemain,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
            'offset_d': offsetDays,
            'offset_h': offsetHours,
            'offset_m': offsetMinutes,
            'offset_s': offsetSeconds
        };
    }

    function initializeClock(clock, endTime) {

        // var days = clock.querySelector('.inner-timer__sign-day'),
        //     hours = clock.querySelector('.inner-timer__sign-hour'),
        //     minutes = clock.querySelector('.inner-timer__sign-min'),
        //     circleDay = clock.querySelector('.inner-timer__day'),
        //     circleHour = clock.querySelector('.inner-timer__hour'),
        //     circleMin = clock.querySelector('.inner-timer__min');
        //var secondsSpan = clock.querySelector('.seconds');

        function updateClock() {
            var timeRemain = getTimeRemaining(endTime);

            // days.innerHTML = timeRemain.days;
            // hours.innerHTML = ('0' + t.hours).slice(-2);
            // minutes.innerHTML = ('0' + t.minutes).slice(-2);
            //secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

            // circleDay.style.strokeDashoffset = timeRemain.offset_d + 'px';
            // circleHour.style.strokeDashoffset = timeRemain.offset_h + 'px';
            // circleMin.style.strokeDashoffset = timeRemain.offset_m + 'px';
            var d = timeRemain.days,
                h = ('0' + timeRemain.hours).slice(-2),
                m = ('0' + timeRemain.minutes).slice(-2),
                s = ('0' + timeRemain.seconds).slice(-2);
            console.log(`hours: ${h}, minutes: ${m}, seconds: ${s}`);

            if (timeRemain.total <= 0) {
                stopTimer();
            }
        }

        updateClock();
        timeInterval = setInterval(updateClock, 1000);
    }

    return {
        init: init,
        stopTimer: stopTimer
    };
})();
