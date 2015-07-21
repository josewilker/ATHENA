#A.T.H.E.N.A
First, ATHENA is a small word for, **A**dvanced **T**iny **H**yper and **E**ndless **N**ode of **A**ctions****

## Introduction
Athena is a virtual machine state to do actions using NodeJS. You can use it to do a lot of things with your little computer. We recomend install it on Galileo and Edison. Athena use mraa libraries and jhonny-five for work on base level of devices.

```
examples of actions:
    send a email,
    deploy applications,
    check wheater and much more.
```

## Installation
Athena need NodeJS installed on your computer. So, install it before all.

1. Install **NodeJS** (you can see how to do it on google, so, google it!)
2. Install **MRAA** Library (it's installed by default on ubilinux)
3. Download **A.T.H.E.N.A** source from repository.
4. You need install **jhonny-five** (npm install jhonny-five)
5. You need install **ip** package (npm install ip)

####Basic NodeJS packages.
Install galileo-io
(you need it manually, because Intel think that you have use Yocto to work with it.)

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

# Actions
You can create custom actions to do a lot of things. But, all actions are programmed with basic functions for work with request and response.

**Methods**
--
    .config(build)        : this method help you to config your action with basic loaded libraries.
    .run(context, events) : this method enable your action run.

## Arguments

**Build**, are related because when action are loaded by core, send to the action a object with details, this object are called **build** and you can work with it.

**Context**, are related because when ATHENA perform an action sometimes we need access the actual context of the call.

**Events**, are related because sometimes we need use a event to do new things on a real world like a LCD display or a Sensor.

**_Example_ of file action:**

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
This is a example of action **ip.js** installed by default on A.T.H.E.N.A.

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

On a example below you can see a state with error and activity led blinking and writing on a I2C LCD menssages in the line 0 and 1, see details of it:

```
// State function (Index is a name of this state)

htriggers.queue.states['index'] = [];
htriggers.queue.states['index']['input'] = function() {

    htriggers.led.off(htriggers.oled.error);
    htriggers.led.off(htriggers.oled.activity);
    events.speak(0,"A.T.H.E.N.A");
    events.speak(1,"B1/M  B2/I");

};

htriggers.queue.states['index']['output'] = function() {
    wdactions.io.mtemp.obj.default(this, events);
};
```

Pay atention! You can create a n states, but becareful with it, i don't test more than 25, if u make more, tell me.

# W&D
**WD** is a part of ATHENA that concentrate **all actions** on the core, good or bad actions. When you are in states and actions files, you can call loaded actions to do some actions using **wdactions**.{method} (it's a global object).

# Third-party
Sometimes we try put more fun in our things. So, on this time, we added a libraries that put songs on a buzzer and print images on I2C lcd.

###j5-songs
**j5-songs** is a library that have songs for buzzers.

###Icons
icons are included with **jhonny-five**.

Icon | description
-|-
::duck:: | it's a duck
::heart:: | it's a hearth

----
created with resources of SMARTAPPS, because things like that, we love it.

Author: José Wilker <wilker@wilker.com.br> / <jose.wilker@smartapps.com.br>
