require('./scope.js');

// NodeJS - libs
var sleep = require('sleep');
var async = require('async');
var http = require('http');
var mosca = require('mosca');

// ATHENA - Libs and globalVars
athenaHWT = require('./htriggers.js');
objAthenaHW = athenaHWT.init();

athenaEvents = require('./events.js');

require('../states/default.js');

athenaActions = require('./wdactions.js');
objAthenaActions = athenaActions.load();

rc = require('../rc.json');

athena = {};
athena.default = {};
athena.default.state = {};

athena.init = function() {

    //athena.greetings(3);

    if (athena.isReady()) {

        objThis = this;

        this.waiting=true;

        objButton = objAthenaHW.obutton;
        objLed = objAthenaHW.oled;
        objThis.buttonActive = false;

        var asyncButtons = [];

        btnLength = Object.keys(_settingsConfig.hw.button).length;

        // - up mosca server (socket)
        var server = new mosca.Server(_settingsConfig.socket);

        server.on('clientConnected', function(client) {
            console.log("Client connected...", client.id);
        });

        server.on('published', function(packet, client) {
            topic = packet.topic;
            for(i=0; i < rc.length; i++) {

                if (rc[i]['topic'] == topic) {
                    fc = rc[i]['cmd'].charAt(0);

                    switch(fc) {
                        case "-": // working with states

                            if (htriggers.queue.list['_default'] != undefined) {
                                clearInterval(htriggers.queue.list['_default']);
                            }

                            stateName = rc[i]['cmd'].substr(1);
                            if (rc[i]['type'] == "input") {
                                htriggers.queue.states[stateName]["input"]();
                            } else if (rc[i]['type'] == "output") {
                                htriggers.queue.states[stateName]["output"]();
                            } else {
                                console.log("invalid type of remote action!!!!");
                            }

                        break;
                        case "_": // working with actions

                            console.log("working with a remote call...");
                            cdot = rc[i]['cmd'].indexOf(".",1);
                            eval("wdactions.io."+rc[i]['cmd'].substr(1,cdot)+"obj."+rc[i]['cmd'].substr(cdot+1,rc[i]['cmd'].length)+";");

                            console.log("waiting ... " + rc[i]['wait'] + " seconds");
                            eval("athena.wait(" + rc[i]['wait'] + ");");

                            events.speakClear();

                        break;
                        default:

                        break;
                    }

                }
            }
        });

        server.on('ready', function(){
            console.log('Mosca server is up and running.');
        });

        // -- do parallel actions

        if (_settingsConfig.actionDefault) {
            asyncButtons.push(function(callback){
                //console.log(wdactions);
                eval("athena.default.state=wdactions.io." + _settingsConfig.actionDefault + ".obj.default(objThis, events, objAthenaHW);");
                //eval("wdactions.io.songs.obj.beethoven(this, events);");
            });
        }

        // @todo :P
        // HOUSTON! WE HAVE A PROBLEM HERE!
        // So, we need fix it, but I don't have time now and I don't have two buttons. ;P
        // @todo :P

        asyncButtons.push(function(callback){
            require("./btn0.js")(objThis, objButton, objLed);
        });

        asyncButtons.push(function(callback){
            require("./btn1.js")(objThis, objButton, objLed);
        });

        async.parallel(asyncButtons, false);

    }

}

/*
athena.greetings = function(seconds) {

    objLed = objAthenaHW.oled;

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

}*/

athena.wait = function(t) {
    sleep.sleep(t);
}

athena.isReady = function() {
    return true;
}

athena.log = function() {
    console.log("registrando log de dados");
}

module.exports = athena;
