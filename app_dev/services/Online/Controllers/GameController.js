var GameController = {};

/**
 * When we are kicked off
 */
GameController.disconnectEvent = function () {
    Container.get('HTTP').setURI('/overview');
};
