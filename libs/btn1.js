module.exports = function(objThis, objButton, objLed){

    if (objButton.two != undefined) {
        objButton.two.pressed = false;
        objThis.nextStep=0;
        athenaHWT.button.flow(objButton.two, 1000, function(c){

            events.speakClear();

            objThis.buttonActive = 'two';
            objButton.two.pressed = true;

            if (objThis.nextStep == undefined) { objThis.nextStep=0; }
            objThis.nextStep++;
            console.log(objThis.nextStep);
            console.log(c);
            console.log("pressed + " + objButton.two.name + " " + objThis.nextStep);

            clearInterval(htriggers.queue.list['_default']);

            objThis.nextStep = (objThis.nextStep>=9) ? 9 : objThis.nextStep;

            switch(objThis.nextStep) {
                case 1:
                case 2:
                case 3:
                    htriggers.led.on(objLed.error);
                break;
                case 4:
                case 5:
                case 6:
                    htriggers.led.off(objLed.error);
                    htriggers.led.on(objLed.activity);
                break;
                case 7:
                case 8:
                case 9:
                    htriggers.led.off(objLed.activity);
                    htriggers.led.on(objLed.error);
                    wdactions.io.ip.obj.run(this, events);
                break;
            }

        }, function(c){

            console.log("two " + c);
            objButton.two.pressed = false;

            if (objThis.buttonActive == 'two') {

                htriggers.led.off(objLed.error);
                htriggers.led.off(objLed.activity);

                console.log("released button + " + objButton.two.name + " " + objThis.nextStep);

                wdactions.io.mtemp.obj.default(this, events);

                objThis.nextStep=0;

            }

            events.speakClear();

        });
    }

}
