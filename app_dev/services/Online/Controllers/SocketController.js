var SocketController = {
    connection: null,
    events: {}
};


/**
 * Connect to the server
 * @param string host
 */
SocketController.connect = function (host) {
    this.connection = io(host);
    this.init();
};


/**
 * Init the event listeners
 */
SocketController.init = function () {
    for (var event in this.events) {
        this.connection.on(event, this.events[event]);
    }
};


/**
 * Add an event listener
 * @param string event
 * @param function callback
 */
SocketController.on = function (event, callback) {
    this.events[event] = callback;
};


/**
 * Send an event to the server
 * @param string event
 * @param mixed datas
 */
SocketController.send = function (event, datas) {
    if (typeof datas == 'object') {
        datas = JSON.stringify(datas);
    }

    this.connection.emit(event, datas);
};


/**
 * Check if we are currently connected with socketIO
 * @return boolean
 */
SocketController.isConnected = function () {
    if (connection === null)
        return false;

    return true;
};
