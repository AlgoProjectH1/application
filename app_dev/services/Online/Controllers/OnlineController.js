var OnlineController = {
    lookingAlternance: false,
    lookingIndex: 0,
};


/**
 * @url /looking
 */
OnlineController.lookingAction = function () {
    Container.get('Pages').load('game.looking.hbs', $('#content'), function () {

        // Declenche l'animation
        OnlineController._lookingAnimation();
    });
};

OnlineController._lookingAnimation = function () {
    OnlineController.lookingAlternance = setInterval(function () {
        var index = OnlineController.lookingIndex;
        var previous = OnlineController.lookingIndex - 1;
        var playersLength = $('.player-swipe').length;

        if (index == playersLength) {
            index = 0;
            OnlineController.lookingIndex = 0;
        }

        $('#player_'+ previous).removeClass('active');
        $('#player_'+ index).addClass('active');

        OnlineController.lookingIndex++;
    }, 1500);
};

OnlineController._removeLookingAnimation = function () {
    clearInterval(OnlineController.lookingAlternance);
    OnlineController.lookingIndex = 0;
};


/**
 * Online mode selection page
 * /online
 */
OnlineController.setupAction = function () {
    Container.get('Pages').load('online.setup.hbs', $('#content'), function () {
        // events listeners
        $('#create-private-game').on('click', OnlineController._eventPrivateGame);
        $('#looking-public-game').on('click', OnlineController._eventPublicGame);
    });
};


/**
 * When a user click on "create a new private game"
 */
OnlineController._eventPrivateGame = function () {
    Container.get('Pages').load('online.private.waiting.hbs', $('#content'), function () {

    });
};


/**
 * When a user click on "search for a public game"
 */
OnlineController._eventPublicGame = function () {
    Container.get('HTTP').setURI('/looking');
};
