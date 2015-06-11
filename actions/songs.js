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

    htriggers.load('sensor');

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
        var mario = songsl.load("mario-intro");
        buzzer.play(mario);

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
