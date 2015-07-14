/** STATES **/

// 1. Index
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

// 2. MSG 1
htriggers.queue.states['msg1'] = [];
htriggers.queue.states['msg1']['input'] = function() {

    htriggers.led.on(htriggers.oled.activity);

    events.speak(0,"GO A HEAD:");
    events.speak(1,"Don't Worry!");

    htriggers.led.off(htriggers.oled.activity);

};
htriggers.queue.states['msg1']['output'] = function() {
    wdactions.io.mtemp.obj.default(this, events);
};

// 3. TEMP ATUAL
htriggers.queue.states['temp'] = [];
htriggers.queue.states['temp']['input'] = function() {

    htriggers.led.on(htriggers.oled.activity);

    events.speak(0,"TEMPERATURA :heart:");
    events.speak(1,"ATUAL: XC");

    htriggers.led.off(htriggers.oled.activity);

};
htriggers.queue.states['temp']['output'] = function() {
    wdactions.io.mtemp.obj.default(this, events);
};

// 4. CHECK REPO
htriggers.queue.states['check-repo'] = [];
htriggers.queue.states['check-repo']['input'] = function() {

    htriggers.led.on(htriggers.oled.activity);

    events.speak(0," > CHECAR                ");
    events.speak(1," > REPOSITÓRIOS          ");

    htriggers.led.off(htriggers.oled.activity);

};
htriggers.queue.states['check-repo']['output'] = function() {

    htriggers.led.on(htriggers.oled.error);

    events.speak(0," > CHECANDO           ");
    events.speak(1," > REPO GIT           ");

    htriggers.led.off(htriggers.oled.error);

    athena.wait(5);

    wdactions.io.mtemp.obj.default(this, events);

};

// 5. CHECK TEMPO
htriggers.queue.states['check-temp'] = [];
htriggers.queue.states['check-temp']['input'] = function() {

    htriggers.led.on(htriggers.oled.activity);

    events.speak(0," > CHECAR                ");
    events.speak(1," > TEMPO                 ");

    htriggers.led.off(htriggers.oled.activity);

};
htriggers.queue.states['check-temp']['output'] = function() {
    wdactions.io.mtemp.obj.default(this, events);
};

/* -- states end -- */
