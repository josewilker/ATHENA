console.log("hello World!!!");
var m = require('mraa');
var i2c = new m.I2c(1);
//i2c.address(0x63);
i2c.write("R,56.26");
console.log("Reading I2C..");
