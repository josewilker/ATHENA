/* -- perfect include for groove -- */
var mraa = require("mraa");
var five = require("johnny-five");
var edison = require("galileo-io");
var board = new five.Board({
    io: new edison()
});

lights = {}

/**
 * [function description]
 * @return {[type]} [description]
 */
lights.config = function(config) {
    htriggers.load('relay');

}

lights.toggle1 = function(context, events) {
    htriggers.orelay.l1.toggle();
}

module.exports = songs;
