var m = require('mraa'); //require mraa
console.log('MRAA Version: ' + m.getVersion()); //write the mraa version to the console

var myLed = new m.Gpio(13); //LED hooked up to digital pin 13 (or built in pin on Galileo Gen1 & Gen2)
myLed.dir(m.DIR_OUT); //set the gpio direction to output
var ledState = true; //Boolean to hold the state of Led

periodicActivity(); //call the periodicActivity function

function periodicActivity()
{
  myLed.write(ledState?1:0); //if ledState is true then write a '1' (high) otherwise write a '0' (low)
  ledState = !ledState; //invert the ledState
  setTimeout(periodicActivity,1000); //call the indicated function after 1 second (1000 milliseconds)
}

var i2c = new m.I2c(0);
i2c.address(0x62);
i2c.write("R,56.26");
console.log("Reading I2C..");
function readPH() {
    var d = i2c.read(7);
    console.log(">> " + d);
}
setTimeout(function (e) { readPH(); }, 1000);
