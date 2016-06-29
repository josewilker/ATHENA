
require('../../libs/scope.js');

var sleep = require('sleep');
var async = require('async');
var SSH = require('simple-ssh');

deploy = {};

deploy.config = function(build) {

    htriggers.load('led');
    htriggers.load('lcd');

}

deploy.default = function(context, events) {

	var ssh = new SSH({
	    host: '177.71.182.171',
	    user: 'ec2-user',
	    key: 'keys/uiskizin.pem'
	});

	ssh.exec('echo $PATH', {
	    out: function(stdout) {
	        console.log(stdout);
	    }
	}).start();

}

deploy.begin = function(context, events) {
	deploy.default(context, events);
	console.log("deploy run...");
}

module.exports = deploy;

