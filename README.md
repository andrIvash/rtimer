# Round Timer plugin

- Lightweight, well tested JS timer plugin
- Start, Stop, Resume and Remove a timer inside any HTML element.
- Get notified after specific time intervals.
- Edit time while timer is running!
- Enable __multiple timers__ on the same page.

[Demo & Instructions][demo] | [Download][min]

[demo]: http://
[min]: http://

## Getting started

Load the plugin in a script tag directly  or from CDNjs using this URL,

```html
https://rtimer.js
```

If you are using npm

```bash
npm install -S timer.jquery
```

```javascript
import Timer from ('rtimer.js');

var timer = Timer('#block').init(6, {options});
timer.startTime();

```

Alternatively you can [download][min] the Round Timer plugin and host it relative to your HTML file. Once you have your preferred way to get the Round timer plugin, in your web page:

```html

<script src="path/to/rtimer.js"></script>
<script>

  //start a timer
  var timer = Timer('#block').init(6);  // -  6 sec , #block - DOM element id's
  timer.startTime();

</script>

```

### Usage

To start a timer with options:

```javascript

var timer = Timer('#block').init(6, {options});

```

#### Options for timer:

```javascript

var timer = Timer('#block').init(6, {
    color: {String} // Color of the text
    lang: {String} // ru - eng localisation
    });

```

### Methods available on an initialized timer:

```javascript

//start an existing timer
timer.startTime();

//reassign time to start
timer.startTime(10); // 10 - time in seconds

//stop an existing timer
var rest = timer.stopTime(); // - rest => how many seconds left

//resume a paused timer
var rest = timer.stopTime();
timer.startTime(rest);

//remove an existing timer
timer.removeTime();  //leaves the display intact

```


### Timed Events

Start a timer and execute a function after a certain duration. You can use this to simulate a timed event.

```javascript
 var timer = Timer('#block').init();
//start a timer & execute a function in 30 seconds
timer.startTime(30, () => {
    alert('Time up!');
});

```

Stop a timer in a certain time and then resume the timer.

```javascript
 var timer = Timer('#block').init();
//stop a timer in a certain time & execute a function & resume the timer
timer.startTime30); // - 30 sec
setTimeout(() => {
    var resumeTime = timer.stopTime();
    customFn();
    timer.startTime(resumeTime);
}, 3000);

```

Stop a timer in a certain time and then and then reset the timer.

```javascript
var timer = Timer('#block').init();
//Stop a timer in a certain time & reset the timer.
timer.startTime(30); // - 30 sec
setTimeout(() => {
    timer.stopTime();
    timer.startTime(50); // - 50 sec
}, 3000);

```

