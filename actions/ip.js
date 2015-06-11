athenaIp = {}

/**
 * [function description]
 * @return {[type]} [description]
 */
athenaIp.ip = false;

athenaIp.config = function(build) {
    athenaIp.ip = require('ip');
    console.log("Building ip...");
}

athenaIp.run = function(context, events) {

    events.speakClear();

    if (athena.ip !== false) {
        events.speak(0,"MY IP: :heart: :duck: :check:");
        events.speak(1,athenaIp.ip.address());
    }
}

module.exports = athenaIp;
