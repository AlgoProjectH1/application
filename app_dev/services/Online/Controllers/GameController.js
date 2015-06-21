var GameController = {};

/**
 * When we are kicked off
 */
GameController.disconnectEvent = function () {
    SocketController.connection = null;
    Container.get('HTTP').setURI('/overview');
};
