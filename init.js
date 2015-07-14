/**
 * It's a project called 'Athena'
 * @author José Wilker <wilker@wilker.com.br>
 *
 * this project uses last version of johnny-five and mraa libraries.
 */

var five = require("johnny-five");
var edison = require("galileo-io");
var board = new five.Board({
    io: new edison()
});

var athena = require('./libs/a.js');

board.on("ready", function() {

    athena.init();

});
