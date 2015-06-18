
require('../../libs/scope.js');

var sleep = require('sleep');
var async = require('async');
var mqtt = require('mqtt');

didact = {};
didact.client = false;

/**
 * [function description]
 * @return {[type]} [description]
 */
didact.config = function(build) {

    var settings = {
        host : _settingsConfig.interface.voice.host,
        port : _settingsConfig.interface.voice.port,
        keepalive: 10000,
        protocolId: 'MQIsdp',
        protocolVersion: 3,
        clientId: 'DIDACT'
    }

    if (didact.client == false) {
        didact.client = mqtt.connect("mqtt://" + _settingsConfig.interface.voice.host,settings);
    }

}

didact.talk = function(context, events, message, talkType) {

    if (didact.client == false) {
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

    async.parallel([function(){
        didact.client.publish(tTalk + message, tTalk + message);
    }]);

}

module.exports = didact;
