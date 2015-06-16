
require('../libs/scope.js');

var sleep = require('sleep');
var async = require('async');

didact = {};

/**
 * [function description]
 * @return {[type]} [description]
 */
didact.config = function(build) {

    if (didact.server == undefined) {
        var didact.server = new mosca.Server(_settingsConfig.interface.voice);
    }

}

didact.talk = function(context, events, message, talkType) {

    if (didact.server == undefined) {
        didact.config();
    }

    tTalk = false;

    switch(talkType) {
        case 0:
            tTalk = "##";
        break;
        case 1:
            tTalk = "#-";
        break;
    }

    var message = {
        topic: tTalk + message,
        qos: 0, // 0, 1, or 2
        retain: false // or true
    };

    didact.server.publish(message, function() {
      console.log('done!');
    });

}

module.exports = didact;
