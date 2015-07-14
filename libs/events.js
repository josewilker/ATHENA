events = {}

/**
 * [function description]
 * @return {[type]} [description]
 */
events.speak = function(l,m) {
    athenaHWT.lcd.write(l,0,m);
}

events.speakClear = function() {
    events.speak(0,"                  ");
    events.speak(1,"                  ");
}

events.buzz = function() {
    //var buzzer = new five.Piezo(mtemp.config.hw.sensor[1].pin);
    var beethoven = songs.load("beethovens-fifth");
    buzzer.play(beethoven);
}

module.exports = events;
