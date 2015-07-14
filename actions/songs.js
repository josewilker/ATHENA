/* -- perfect include for groove -- */
var songsl = require("j5-songs");
var mraa = require("mraa");
var five = require("johnny-five");
var edison = require("galileo-io");
var board = new five.Board({
    io: new edison()
});

songs = {}

/**
 * [function description]
 * @return {[type]} [description]
 */
songs.config = function(config) {
    console.log("loading songs...");
}

songs.beethoven = function(context, events) {
    if (htriggers.osensor.buzz != undefined) {
        buzzer = htriggers.osensor.buzz.obj;
        var beethoven = songsl.load("beethovens-fifth");
        buzzer.play(beethoven);
    } else {
        console.log("Don't found buzzer...");
    }
}

songs.mario = function(context, events) {
    if (htriggers.osensor.buzz != undefined) {

        buzzer = htriggers.osensor.buzz.obj;
        var beethoven = songsl.load("mario-intro");
        buzzer.play(beethoven);

        if (htriggers.orelay.l1.obj != undefined) {
            htriggers.orelay.l1.obj.toggle();
        }

    } else {
        console.log("Don't found buzzer...");
    }
}

songs.sw = function(context, events) {
    if (htriggers.osensor.buzz != undefined) {
        buzzer = htriggers.osensor.buzz.obj;
        var sw = songsl.load("starwars-theme");
        buzzer.play(sw);
    } else {
        console.log("Don't found buzzer...");
    }
}

module.exports = songs;