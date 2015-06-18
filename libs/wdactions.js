var fs = require('fs');
var path = require('path');

wdactions = {};
wdactions.io = {};

wdactions.getAll = function(dirPath) {
    return fs.readdirSync(dirPath).filter(function(file) {
        return fs.statSync(path.join(dirPath, file)).isDirectory();
    });
}

wdactions.load = function() {

    objIO = wdactions.io;
    files = wdactions.getAll(_actionsPathFolder);
    arrayFilesLength = Object.keys(_settingsConfig.actions).length;
    for(ari=0; ari < arrayFilesLength; ari++) {

        freplace = files[ari];

        eval("objIO." + freplace + "={};");
        eval("objIO." + freplace + ".obj=require('" + _actionsRelativeFolder + freplace + "/" + _actionsDefaultFile + "');");

        console.log("Loading action " + freplace + "...");

        eval("objIO." + freplace + ".obj.config(_settingsConfig);");


    }

    return this;

}

module.exports = wdactions;
