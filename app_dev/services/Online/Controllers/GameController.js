var GameController = {};

/**
 * When the user click on "Quitter"
 */
GameController._eventQuitGame = function () {
    SocketController.disconnect();
    Container.get('HTTP').setURI('/overview');
};


/**
 * When we are kicked off
 */
GameController.disconnectEvent = function () {
    SocketController.connection = null;
    Container.get('HTTP').setURI('/overview');
};
