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
