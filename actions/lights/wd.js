/* -- perfect include for groove kit -- */
var mraa = require("mraa");
var five = require("johnny-five");
var edison = require("galileo-io");
var board = new five.Board({
    io: new edison()
});

lights = {};

lights.config = function(config) {
    htriggers.load('relay');

}

lights.toggle1 = function(context, events) {
    console.log("toggle lights");
    wdactions.io.didact.obj.talk(objThis, events, "Gerando impulso elétrico remoto...", 1);
    htriggers.orelay.l1.obj.toggle();
    athena.wait(5);
    wdactions.io.didact.obj.talk(objThis, events, "Gerado com sucesso.", 1);
}

module.exports = lights;
