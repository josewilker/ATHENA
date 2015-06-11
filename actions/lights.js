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
    console.log("toggle lights");
    htriggers.orelay.l1.obj.toggle();
}

module.exports = songs;
