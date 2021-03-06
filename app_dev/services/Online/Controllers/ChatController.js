var ChatController = {
    connection: null,
    events: {}
};


/**
 * Connect to the server
 * @param string host
 */
ChatController.connect = function (host) {
    this.connection = io(host);
    this.init();
};


/**
 * Disconnect from the server
 */
ChatController.disconnect = function () {
    this.send('search:cancel');
    this.connection = null;
};


/**
 * Init the event listeners
 */
ChatController.init = function () {
    var events = this.events;

    for (var event in events) {
        this.connection.on(event, events[event]);
    }
};


/**
 * Add an event listener
 * @param string event
 * @param function callback
 */
ChatController.on = function (event, callback) {
    this.events[event] = callback;
};


/**
 * Send an event to the server
 * @param string event
 * @param mixed datas
 */
ChatController.send = function (event, datas) {
    if (typeof datas == 'object') {
        datas = JSON.stringify(datas);
    }

    this.connection.emit(event, datas);
};


/**
 * Check if we are currently connected with socketIO
 * @return boolean
 */
ChatController.isConnected = function () {
    if (connection === null)
        return false;

    return true;
};
