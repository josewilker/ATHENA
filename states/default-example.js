/**
 *
 * States example
 *
 * It's a file of example how you can create a states for your machine
 * and put some usefull actions on it.
 *
 * States have two ways of work with data to predict a unique flow for
 * your application.
 *
 * ways:
 * - input: you can use this way to start a flow for get the data and save it.
 * - output: and you can use this way to start a flow for output data do calls before get data.
 *
 * @author  José Wilker <jose.wilker@smartapps.com.br>
 *
 */

/**
 * Pay atention! in this case, 'index' is a name of your state.
 */

htriggers.queue.states['index'] = [];
htriggers.queue.states['index']['input'] = function() {

    /**
     * Put here the flow of input.
     */

};
htriggers.queue.states['index']['output'] = function() {

    /**
     * Put here the flow of ouput.
     */

};