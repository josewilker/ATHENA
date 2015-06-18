var fs = require('fs');
var path = require('path');

wdactions = {};
wdactions.io = {};

wdactions.getAll = function(path) {
    return fs.readdirSync(path).filter(function(file) {
        return fs.statSync(path.join(path, file)).isDirectory();
    });
}

wdactions.load = function() {

    objIO = wdactions.io;
    files = wdactions.getAll("./actions/"); //['greetings.js','ip.js', 'mtemp.js', 'songs.js', 'flow.js', 'lights.js', 'didact.js'];
    arrayFilesLength = Object.keys(_settingsConfig.actions).length;
    for(ari=0; ari < arrayFilesLength; ari++) {

        freplace = files[ari]; //files[ari].replace(".js","");

        eval("objIO." + freplace + "={};");
        eval("objIO." + freplace + ".obj=require('../actions/" + freplace + "/wd.js');");

        console.log("Loading action " + freplace + "...");

        eval("objIO." + freplace + ".obj.config(_settingsConfig);");


    }

    return this;

}

module.exports = wdactions;
