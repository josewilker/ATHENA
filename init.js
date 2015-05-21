/*
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

function char(x) { return parseInt(x, 16); }

x = new m.I2c(0)
x.address(0x62)
x.writeReg(0, 0)
x.writeReg(1, 0)

x.writeReg(char('0x08'), char('0xAA'))
x.writeReg(char('0x04'), 255)
x.writeReg(char('0x02'), 255)
*/

var five = require("johnny-five");
var Edison = require("libs/galileo-io/lib/galileo.js");
var board = new five.Board({
  io: new Galileo()
});

board.on("ready", function() {
  var lcd = new five.LCD({
    controller: "JHD1313M1"
  });

  lcd.useChar("heart");
  lcd.cursor(0, 0).print("I :heart: Johnny-Five");
});
