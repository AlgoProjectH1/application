var GameOnlineController = {};


/**
 * Online mode selection page
 * /online
 */
GameOnlineController.setupAction = function () {
    Container.get('Pages').load('online.setup.hbs', $('#content'), function () {
        // events listeners
        $('#create-private-game').on('click', GameOnlineController._eventPrivateGame);
        $('#looking-public-game').on('click', GameOnlineController._eventPublicGame);
    });
};


/**
 * When a user click on "create a new private game"
 */
GameOnlineController._eventPrivateGame = function () {
    Container.get('Pages').load('online.private.waiting.hbs', $('#content'), function () {

    });
};

/**
 * When a user click on "search for a public game"
 */
GameOnlineController._eventPublicGame = function () {
    Container.get('HTTP').setURI('/looking');
};
