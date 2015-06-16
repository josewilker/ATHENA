var fs = require('fs');

wdactions = {};
wdactions.io = {};

wdactions.load = function() {

    objIO = wdactions.io;
    files = ['greetings.js','ip.js', 'mtemp.js', 'songs.js', 'flow.js', 'lights.js', 'didact.js'];
    arrayFilesLength = Object.keys(_settingsConfig.actions).length;
    for(ari=0; ari < arrayFilesLength; ari++) {
        freplace = files[ari].replace(".js","");

        eval("objIO." + freplace + "={};");
        eval("objIO." + freplace + ".obj=require('../actions/" + freplace + "/wd.js');");

        console.log("Loading action " + freplace + "...");

        eval("objIO." + freplace + ".obj.config(_settingsConfig);");


    }

    return this;

}

module.exports = wdactions;
