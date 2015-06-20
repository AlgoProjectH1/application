var OnlineController = {
    lookingAlternance: false,
    lookingIndex: 0,
};


/**
 * @url /looking
 */
OnlineController.lookingAction = function () {
    Container.get('UserApi').me(localStorage.getItem('token'), {
        success: OnlineController._successLookingGetInfos
    });
};


/**
 * When we succeeded getting user datas
 * @param object infos
 */
OnlineController._successLookingGetInfos = function (infos) {
    infos.rankName = UserLoggedController.rankNames[infos.rank];

    Container.get('Template').set({
        user: infos
    });

    Container.get('Pages').load('game.looking.hbs', $('#content'), function () {
        // Declenche l'animation
        OnlineController._lookingAnimation();
    });
};


/**
 * Loading animation
 */
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


/**
 * Stop loading animation
 */
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
    Container.get('UserApi').me(localStorage.getItem('token'), {
        success: OnlineController._successWaitingGetInfos
    });
};


/**
 * When we succeeded getting user datas
 * @param object infos
 */
OnlineController._successWaitingGetInfos = function (infos) {
    infos.rankName = UserLoggedController.rankNames[infos.rank];

    Container.get('Template').set({
        user: infos
    });

    Container.get('Pages').load('online.private.waiting.hbs', $('#content'), function () {});
};


/**
 * When a user click on "search for a public game"
 */
OnlineController._eventPublicGame = function () {
    Container.get('HTTP').setURI('/looking');
};
