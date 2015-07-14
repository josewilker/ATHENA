var fs = require('fs');

wdactions = {};
wdactions.io = {};

wdactions.load = function() {

    objIO = wdactions.io;
    files = ['ip.js', 'mtemp.js', 'songs.js'];
    arrayFilesLength = Object.keys(_settingsConfig.actions).length;
    for(ari=0; ari < arrayFilesLength; ari++) {
        freplace = files[ari].replace(".js","");
        eval("objIO." + freplace + "={};");
        eval("objIO." + freplace + ".obj=require('../actions/" + freplace + ".js');");
        eval("objIO." + freplace + ".obj.config(_settingsConfig);");
    }

    return this;

}

module.exports = wdactions;
