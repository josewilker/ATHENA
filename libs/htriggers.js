var async = require('async');
var mraa = require("mraa");
var five = require("johnny-five");
var edison = require("galileo-io");
var board = new five.Board({
    io: new edison()
});

htriggers = {};
htriggers.olcd = false;
htriggers.obutton = {};
htriggers.oled = {};
htriggers.osensor = {};
htriggers.orelay = {};

htriggers.queue = {};
htriggers.queue.list = [];
htriggers.queue.states = [];

var asyncTriggers = [];

var asyncLed = [];
var asyncLcd = [];
var asyncButton = [];
var asyncSensor = [];
var asyncRelay = [];

htriggers.init = function() {

    btnLength = Object.keys(_settingsConfig.hw.button).length;
    ledLength = Object.keys(_settingsConfig.hw.led).length;
    sensLength = Object.keys(_settingsConfig.hw.sensor).length;
    relayLength = Object.keys(_settingsConfig.hw.relay).length;
    lcdLength = Object.keys(_settingsConfig.hw.lcd.id).length;

    if (ledLength > 0) {

        for(i=0; i < ledLength; i++) {

            eval("htriggers.oled." + _settingsConfig.hw.led[i].obj + "={};");
            eval("htriggers.oled." + _settingsConfig.hw.led[i].obj + ".obj=false;");
            eval("htriggers.oled." + _settingsConfig.hw.led[i].obj + ".name='" + _settingsConfig.hw.led[i].pname + "';");
            eval("htriggers.oled." + _settingsConfig.hw.led[i].obj + ".pin='" + _settingsConfig.hw.led[i].pin + "';");

            asyncLed.push(async.apply(function(pin, objName, callback){
                eval("htriggers.oled." + objName + ".obj=new five.Led(" + pin + ");");
            },_settingsConfig.hw.led[i].pin, _settingsConfig.hw.led[i].obj));

        }

    }

    if (lcdLength > 0) {

        asyncLcd.push(async.apply(function(id, callback){

            var lcd = new five.LCD({
                controller: id
            });

            htriggers.olcd = lcd;

        },_settingsConfig.hw.lcd.id));

    }

    if (btnLength > 0) {

        for(i=0; i < btnLength; i++) {

            eval("htriggers.obutton." + _settingsConfig.hw.button[i].obj + "={};");
            eval("htriggers.obutton." + _settingsConfig.hw.button[i].obj + ".obj=false;");
            eval("htriggers.obutton." + _settingsConfig.hw.button[i].obj + ".name='" + _settingsConfig.hw.button[i].pname + "';");
            eval("htriggers.obutton." + _settingsConfig.hw.button[i].obj + ".pin='" + _settingsConfig.hw.button[i].pin + "';");

            asyncButton.push(async.apply(function(name, pin, callback){
                eval("htriggers.obutton." + name + ".obj=new mraa.Gpio(pin);");
            },_settingsConfig.hw.button[i].obj,_settingsConfig.hw.button[i].pin));

        }

    }

    if (sensLength > 0) {

        for(i=0; i < sensLength; i++) {

            if (_settingsConfig.hw.sensor[i].type != undefined) {

                switch(_settingsConfig.hw.sensor[i].type) {
                    case "five-piezo":

                        eval("htriggers.osensor." + _settingsConfig.hw.sensor[i].obj + "={};");
                        eval("htriggers.osensor." + _settingsConfig.hw.sensor[i].obj + ".obj=false;");
                        eval("htriggers.osensor." + _settingsConfig.hw.sensor[i].obj + ".name='" + _settingsConfig.hw.sensor[i].pname + "';");
                        eval("htriggers.osensor." + _settingsConfig.hw.sensor[i].obj + ".pin='" + _settingsConfig.hw.sensor[i].pin + "';");

                        asyncSensor.push(async.apply(function(name, pin, callback){
                            eval("htriggers.osensor." + name + ".obj=new five.Piezo(pin);");
                        },_settingsConfig.hw.sensor[i].obj,_settingsConfig.hw.sensor[i].pin));

                    break;
                }

            }

        }

    }

    if (relayLength > 0) {

        for(i=0; i < relayLength; i++) {

            relayPin = _settingsConfig.hw.relay[i].pin;
            relayName = _settingsConfig.hw.relay[i].pname;

            eval("htriggers.orelay." + _settingsConfig.hw.relay[i].obj + "={};");
            eval("htriggers.orelay." + _settingsConfig.hw.relay[i].obj + ".obj=false;");
            eval("htriggers.orelay." + _settingsConfig.hw.relay[i].obj + ".name='" + relayName + "';");
            eval("htriggers.orelay." + _settingsConfig.hw.relay[i].obj + ".pin='" + relayPin + "';");

            asyncRelay.push(async.apply(function(name, pin, callback){
                eval("htriggers.orelay." + name + ".obj=new five.Relay(pin);");
            },_settingsConfig.hw.relay[i].obj,_settingsConfig.hw.relay[i].pin));

        }

    }

    //async.parallel(asyncTriggers, false);

    htriggers.icon('check');
    htriggers.icon('heart');
    htriggers.icon('duck');

    return this;

}

htriggers.load = function(type) {
    switch(type) {
        case "led":
            if (asyncLed) {
                async.parallel(asyncLed, false);
                asyncLed=false;
            }
        break;
        case "lcd":
            if (asyncLcd) {
                async.parallel(asyncLcd, false);
                asyncLcd=false;
            }

        break;
        case "button":
            if (asyncButton) {
                async.parallel(asyncButton, false);
                asyncLcd=false;
            }
        break;
        case "sensor":
            if (asyncSensor) {
                async.parallel(asyncSensor, false);
                asyncSensor=false;
            }
        break;
        case "relay":
            if (asyncRelay) {
                async.parallel(asyncRelay, false);
                asyncRelay=false;
            }
        break;
    }
}

// usefull functions
htriggers.icon = function(icon) {

    if (!htriggers.olcd) {
        async.parallel(asyncLcd, false);
    }

    htriggers.olcd.useChar(icon);

}

// - LCD
htriggers.lcd = {};
htriggers.lcd.write = function(line, position, message) {

    if (!htriggers.olcd) {
        async.parallel(asyncLcd, false);
    }

    console.log(line + " " + position + " " + message);
    htriggers.olcd.cursor(line, position).print(message);
}

// - BUTTON
htriggers.button = {};
htriggers.button.flow = function(button, checkPressTime, press, release) {

    htriggers.load('button');

    button.obj.dir(mraa.DIR_IN);

    init=0;

    function readDataButton(button, htriggers) {

        bval = button.obj.read();

        if (bval==0 && init==1 && button.pressed) {
            init=0;
            release(button, htriggers);
        }

        if (bval==1) {
            init=1;
            button.pressed = true;
            press(button, htriggers);
        }

    }

    htriggers.queue.list[button.name] = setInterval(function(){
        readDataButton(button, htriggers);
    }, checkPressTime);

}

// - LED
htriggers.led = {};
htriggers.led.on = function(led) {

    if (!led.obj) {
        async.parallel(asyncLed, false);
    }

    led.obj.on();
}
htriggers.led.off = function(led) {

    if (!led.obj) {
        async.parallel(asyncLed, false);
    }

    led.obj.off();
}

module.exports = htriggers;
