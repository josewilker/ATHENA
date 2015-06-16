
require('../../libs/scope.js');

var sleep = require('sleep');
var async = require('async');

greetings = {};

/**
 * [function description]
 * @return {[type]} [description]
 */
greetings.config = function(build) {

    htriggers.load('led');
    htriggers.load('lcd');

}

greetings.default = function(context, events) {

	seconds = 1;

	objLed = htriggers.oled;

    htriggers.led.on(objLed.activity);

    // hello
    helloMessage = "Hi!";
    events.speak(0,helloMessage);
    console.log(wdactions.io);
    wdactions.io.didact.obj.talk(objThis, events, helloMessage, 1);

    athena.wait(seconds);

    // greetings
    greetingsMessage = "I am " + _settingsConfig.name
    events.speak(0,greetingsMessage);
    wdactions.io.didact.obj.talk(objThis, events, greetingsMessage, 1);

    athena.wait(seconds);

    // activities
    htriggers.led.on(objLed.error);

    // showing what are doing...
    loadingMessage = "Waking up...";
    events.speak(1,loadingMessage);
    wdactions.io.didact.obj.talk(objThis, events, loadingMessage, 1);

    athena.wait((seconds*2));

    htriggers.led.off(objLed.error);
    htriggers.led.off(objLed.activity);

    events.speakClear();

    events.speak(0,"UP! :heart:");

}

greetings.begin = function(context, events) {
	greetings.default(context, events);
	console.log("greetins run...");
}



module.exports = greetings;
