
require('../libs/scope.js');

var sleep = require('sleep');
var async = require('async');

athenaGreetings = {}

/**
 * [function description]
 * @return {[type]} [description]
 */
athenaGreetings.config = function(build) {

    htriggers.load('led');
    htriggers.load('lcd');

}

athenaGreetings.default = function(context, events) {

	objLed = htriggers.oled;

    htriggers.led.on(objLed.activity);

    // hello
    events.speak(0,"Hi!");
    athena.wait(seconds);

    // greetings
    events.speak(0,"Hi! I'm " + _settingsConfig.name);
    athena.wait(seconds);

    // activities
    htriggers.led.on(objLed.error);

    // showing what are doing...
    events.speak(1,"Waking up...");
    athena.wait((seconds*2));

    htriggers.led.off(objLed.error);
    htriggers.led.off(objLed.activity);

    events.speakClear();

    events.speak(0,"UP! :heart:");

}

athenaGreetings.run = function(context, events) {
	athenaGreetings.default(context, events);
}



module.exports = athenaGreetings;
