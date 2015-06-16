/* -- perfect include for groove -- */
var songs = require("j5-songs");
var mraa = require("mraa");
var five = require("johnny-five");
var edison = require("galileo-io");
var board = new five.Board({
    io: new edison()
});

// global vars of this module
mtemp = {};
mtemp.default={};
mtemp.default.pin = false;

mtemp.config = {};

mtemp.celsius = false;

/** Required methods by ATHENA **/

/**
 * Method to make basic config for this module when it's load.
 * @param  {[type]} config [description]
 * @return {[type]}        [description]
 */
mtemp.config = function(config) {
    mtemp.config = config;
    mtemp.default.pin = config.hw.sensor[0].pin;
}

/**
 * Method that execute when config.json is defined to do it.
 * @param  {[type]} context [description]
 * @param  {[type]} events  [description]
 * @param  {[type]} hw      [description]
 * @return {[type]}         [description]
 */
mtemp.default = function(context, events) {

    mtemp.showTempLoop(context, events, false, false);

    return true;

}

/** Custom methods **/

// put get temp on loop
mtemp.showTempLoop = function(context, events, cmessage, line) {

    events.speakClear();
    console.log(mtemp.default.pin);
    var myAnalogPin = new mraa.Aio(mtemp.default.pin);

    //console.log(cmessage);
    if (cmessage == undefined || !cmessage) {
        cmessage = "TEMP: {temp} :duck:";
    }

    if (line == undefined || !line) {
        line = 0;
    }

    b = setInterval(function(){

        var a = myAnalogPin.read();
        var rs = (1023 - a) * 10000 / a; // calculo de resistencia do sensor
        var ct = Math.round(1 / (Math.log(rs / 10000) / 3975 + 1 / 298.15) - 273.15); // conversão para celsius

        mtemp.celsius = ct;
        //ct = Math.random();
        cmessage = cmessage.replace("{temp}",ct);
        events.speak(line,cmessage);

    },2000);

    htriggers.queue.list['_default'] = b;

    console.log("rodando mtemp...");

    return b;

}

// get last value of temp
mtemp.getValue = function(context, events) {

    var myAnalogPin = new mraa.Aio(mtemp.default.pin);
    var a = myAnalogPin.read();
    var rs = (1023 - a) * 10000 / a; // calculo de resistencia do sensor
    var ct = Math.round(1 / (Math.log(rs / 10000) / 3975 + 1 / 298.15) - 273.15); // conversão para celsius

    return mtemp;

}

module.exports = mtemp;
