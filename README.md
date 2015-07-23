#A.T.H.E.N.A
First, ATHENA is a small word for, **A**dvanced **T**iny **H**yper and **E**ndless **N**ode of **A**ctions**** created by José Wilker.

## Introduction
ATHENA is a virtual machine state to do actions using NodeJS for small devices to Internet of Things, like Intel Edison and Galileo. You can use it to do a lot of things with your little computer. We recomend install it on Galileo or Edison because ATHENA use MRAA library and jhonny-five for work on base level of devices.

```
examples of applications:
    check home sensors for security,
    put your coffee machine to do a coffee remote,
    home lights info remote,
    send a email,
    deploy applications,
    monitor social networks,
    private message network,
    check wheater and
    much more.
```

## Requirements
For that you can use ATHENA you need two things listed below.

1. Intel Galileo GEN2 / Intel Edison
2. Ubilinux 8.0.2 (Debian Wheezy, you can see details about it in ubilinux.org)

## Installation
Athena need NodeJS installed on your computer. So, install it before all.

1. Install **NodeJS** (you can see how to do it on google, so, google it!)
2. Install **MRAA** Library (it's installed by default on ubilinux)
3. Download **A.T.H.E.N.A** source from repository.
4. You need install **jhonny-five** (npm install jhonny-five)
5. You need install **ip** package (npm install ip)

####Basic NodeJS packages.
Install galileo-io
(you need do it manually, because **Intel** think that you have use **Yocto** to work with it. I don't know why and nobody tell me a good thing at now, so... let's do it! :P)

[galileo-io]
git clone https://github.com/rwaldron/galileo-io.git galileo-io

[es6-shim]
git clone https://github.com/paulmillr/es6-shim.git es6-shim

[remapped]
git clone https://github.com/tkellen/js-remapped.git remapped

[traverse]
git clone https://github.com/substack/js-traverse.git traverse

[getobject]
git clone https://github.com/cowboy/node-getobject.git getobject

# Easy setup (config.json)
ATHENA help you work with hardware for **Internet of Things** of Intel products. Intel help you make a connection between physical world with virtual. So, below you can see how setup your sensors, leds, piezo, buttons, relay. fast and easy, see below:

````
{
    "name" : "A.T.H.E.N.A",
    "version" : "1.0",
    "socket" : {
        "port" : 1884
    },
    "hw" : { // hardware nodes, all objects can be loaded with htriggers object.
        "lcd" : { // hardware type (this case, LCD) - I2C port
            "id" : "JHD1313M1" // in this case we need unique param, the id of I2C.
        },
        "button" : { // hardware type
            "0" : {
                "obj" : "one", // if need access this button in a action
                "pname" : "B.Select 1", // a text name for the button
                "pin" : 8, // pin of GPIO
                "file" : "btn0.js" // file of state flow for this button
            },
            "1" : {
                "obj" : "two",
                "pname" : "B.Select 2",
                "pin" : 7,
                "file" : "btn1.js",
                "action" : [{ // if need work with states and call action in a specific time.
                    "times" : 3,
                    "name" : "athenaIp.ip"
                }]
            }
        },
        "led" : {
            "0" : {
                "obj" : "activity",
                "pname" : "LED Blue",
                "pin" : 4
            },
            "1" : {
                "obj" : "error",
                "pname" : "LED Red",
                "pin" : 2
            }
        },
        "sensor" : {
            "0" : {
                "obj" : "temp",
                "pname" : "Temperatura",
                "pin" : 0
            },
            "1" : {
                "obj" : "buzz",
                "pname" : "Buzzer",
                "pin" : 6,
                "type" : "five-piezo"
            }
        },
        "relay" : {
            "0" : {
                "obj" : "l1",
                "pname" : "Luz 1",
                "pin"   : 5
            }
        }
    },
    "actionDefault" : "mtemp", // when machine starts, it's the first action.
    "actions" : { // actions that you want load
        "0" : {
            "text" : "Temperatura",
            "action" : "mtemp.js",
            "lib" : "mtemp"
        },
        "1" : {
            "text" : "Endereço IP",
            "lib" : "ip",
            "action" : "ip.js"
        },
        "2" : {
            "text" : "Sons",
            "lib" : "songs",
            "action" : "songs.js"
        }
    }
}
````
Basically, before you put right data on **config.json** you can run your machine with default installation of packages and see the results.

# Actions
You can create custom actions to do a lot of things. But, all actions are programmed with basic functions for work with request and response.

###Methods

Title | Description
-|-
.config(build)        | this method help you to config your action with basic loaded libraries.
.run(context, events) | this method enable your action run.

#### Details about arguments

**Build**, are related because when action are loaded by core, send to the action a object with details, this object are called **build** and you can work with it.

**Context**, are related because when ATHENA perform an action sometimes we need access the actual context of the call.

**Events**, are related because sometimes we need use a event to do new things on a real world like a LCD display or a Sensor.

###_Example_ of file action:

````
/** Action name **/
athenaIp = {}

/** Global vars **/
athenaIp.ip = false;

/** Config method **/
athenaIp.config = function(build) {
    athenaIp.ip = require('ip');
}

/** Run method **/
athenaIp.run = function(context, events) {

    events.speakClear(); // clear all events related before

    if (athena.ip !== false) {

        // speak a new thing
        events.speak(0,"MY IP: :heart: :duck: :check:");
        events.speak(1,athenaIp.ip.address());

    }

}

/** create action globally **/
module.exports = athenaIp;

````
This is a example of action **ip.js** included by default on A.T.H.E.N.A.

#### WD IO
**WD.IO** is a part of ATHENA that concentrate **all actions** of the core for input and ouput, good or bad actions. When you are in states and actions files, you can call loaded actions to do some actions using **wdactions**.io.{action} (all actions before loaded transform into a global object).

# Events
With events you have access to perform basic events that are called a lot of times when your machine are doing actions.

> by default **events** are calling with _I2C RGB_ to write messages on a display of Edison included in the **seed eletronic kit**, but you can custom it, to do anything you want.

###Methods

Name(args) | Description
-|-
.speakClear(**build**) | this method help clear last speak related, on athena case, we use to show a info o LCD.
.speak(**context**, **events**) | this method enable your action run.

# States
With states you can define what you machine do, when need stay on a state. So, imagine if you have a state that check if lights are on, and other if TV are on. So, you can call the first state for check if lights are on and get the response about this call, to perform another action. And, you can do it whit a lot of states.

But states have a singularity, all of states have two callback actions, when you're calling a action remotelly you can do it with one or more CPU. So, you can use it to do a lot of things when you put the machine in a input state or output state. See more below:

####Input state
You can put your machine in a state of input data, doing actions about this context.

####Output state
You can put your machine in a state of output data. So, this state it's do the same action of input, but when you are working with no human interference, so, you maybe need monitor all contexts, to do new actions.

On a example below you can see a state with error and activity led blinking and writing on a I2C LCD menssages in the line 0 and 1, see details of it:

```
// State function (Index is a name of this state)

// (ACTION 1) Hardware trigger for Blink and Write with events object.
htriggers.queue.states['index'] = [];
htriggers.queue.states['index']['input'] = function() {

    htriggers.led.off(htriggers.oled.error);
    htriggers.led.off(htriggers.oled.activity);
    events.speak(0,"A.T.H.E.N.A");
    events.speak(1,"B1/M  B2/I");

};

// in this context, we are calling a action of
// other file and getting data of sensor temperature .

htriggers.queue.states['index']['output'] = function() {
    wdactions.io.mtemp.obj.default(this, events);
};

// (ACTION 2) CHECK REPO
htriggers.queue.states['check-repo'] = [];
htriggers.queue.states['check-repo']['input'] = function() {

    // LED on
    htriggers.led.on(htriggers.oled.activity);

    // write on I2C LCD
    events.speak(0," > CHECAR                ");
    events.speak(1," > REPOSITÓRIOS          ");

    // LED off
    htriggers.led.off(htriggers.oled.activity);

};
htriggers.queue.states['check-repo']['output'] = function() {

    // LED on
    htriggers.led.on(htriggers.oled.error);

    // write on I2C LCD
    events.speak(0," > CHECANDO           ");
    events.speak(1," > REPO GIT           ");

    // LED off
    htriggers.led.off(htriggers.oled.error);

    // utility function (wait)
    athena.wait(5);

    wdactions.io.mtemp.obj.default(this, events);

};

```

Pay atention! You can create a n states, but becareful with it, i don't test more than 25, if u make more, tell me.

# Work Flow
ATHENA enable you make a work flow of actions to-do something. let's think about it... think, you have a door that when it's open light it's on and when it's closed light is off. You can do a flow to do it. Below I show a simple flow to working with buttons, and i'm working to enable other ways.

Flow example:
````
module.exports = function(objThis, objButton, objLed){

    // button select
    if (objButton.one != undefined) {

        objButton.one.pressed = false;
        objThis.nextStep=0;

        athenaHWT.button.flow(objButton.one, 1000, function(c, htriggers){

            objThis.buttonActive = 'one';
            objButton.one.pressed = true;
            if (objThis.nextStep == undefined) { objThis.nextStep=0; }
            objThis.nextStep++;

            if (htriggers.queue.list['_default'] != undefined) { clearInterval(htriggers.queue.list['_default']); }

            objThis.nextStep = (objThis.nextStep>5) ? 5 : objThis.nextStep;

            events.speakClear();

            tact = 'input';
            console.log("oie");
            switch(objThis.nextStep) {
                case 1: // initial state

                    // all leds off
                    htriggers.queue.states['index'][tact]();

                break;
                case 2: // show info state

                    htriggers.queue.states['msg1'][tact]();

                break;
                case 3: // show temp atual

                    htriggers.queue.states['temp'][tact]();

                break;
                case 4: // show options to check repo

                    htriggers.queue.states['check-repo'][tact]();

                break;
                case 5: // show options to check repo

                    htriggers.queue.states['check-temp'][tact]();

                break;

            }

        }, function(c){

            objButton.one.pressed = false;
            tact = 'output';

            if (objThis.buttonActive == 'one') {

                htriggers.led.off(objLed.error);
                htriggers.led.off(objLed.activity);

                console.log("released button + " + objButton.one.name + " " + objThis.nextStep);

                events.speakClear();

                switch(objThis.nextStep) {
                    case 1:
                    case 2:
                    case 3:
                        htriggers.queue.states['temp'][tact]();
                    break;
                    case 4:
                        htriggers.queue.states['check-repo'][tact]();
                    break;
                    case 5:
                        htriggers.queue.states['check-temp'][tact]();
                    break;
                }

                objThis.nextStep=objThis.defaultStep;
            }

        });
    }

}
````

### Explanation

Flow's have a number that represents the actual states, and need be added on a queue to be loaded. So, so imagine that you have a button that when it's pressed start  a machine to do a thing and other, and other, and other... so it's a flow.

# Some magic! Control machine over network.
When ATHENA start's she up a socket server that allow you connect on it using a mobile phone or other computer. So, you can transform your device in a small remote automated computer, doing a lot of actions everyday remotelly.

> If you can extend skills of your device, put on him a dedicated ip address and control athena actions and states remote.

Remote command file example (rc.json):
````
[
    {
        "topic" : "rc.ip",
        "cmd" : "_ip.run(this, events)",
        "wait" : "10"
    },
    {
        "topic" : "rc.mario",
        "cmd" : "_songs.mario(this, events)",
        "wait" : "2"
    },
    {
        "topic" : "state.index", // input direct command
        "cmd" : "-index",
        "type" : "input"
    },
    {
        "topic" : "state.indexo", // output direct command
        "cmd" : "-index",
        "type" : "output"
    }
]
````
All commands are avaiable with TCP protocol, so if you have a application on your network, that send a message by socket, you can send message to your device.

**PAY ATENTION!** Look the file, if you want send a message that action is a state, you need put command (cmd) option with -, if you want call to a action directly, you maybe that have use the _ .

# Third-party
Sometimes we try put more fun in our things. So, on this time, we added a libraries that put songs on a buzzer and print images on I2C lcd.

###j5-songs
**j5-songs** is a library that have songs for buzzers.

- Starwars (mom like it)
- Beethoven's Symphony (earth need it)
- Super Mario (dad like it)


###Icons
icons are included with **jhonny-five**.

Icon | description
-|-
::duck:: | it's a duck
::heart:: | it's a hearth

----
created with resources of SMARTAPPS, because of things like that, we love it.

Author: José Wilker <wilker@wilker.com.br> / <jose.wilker@smartapps.com.br>
