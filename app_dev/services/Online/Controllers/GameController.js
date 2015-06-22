var GameController = {
    goban: "",
    intersections: ""
};


/**
 * Game init
 */
GameController.init = function () {
    GameController.goban = new Goban(13, $('#goban'));
    GameController.intersections = new Intersections(GameController.goban.getSize(), false);

    GameController.goban.draw();
    GameController.intersections.draw();

    // event listeners
    $('#game-quit').on('click', GameController._eventQuitGame);
};


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
