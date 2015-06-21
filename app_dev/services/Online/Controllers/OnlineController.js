var OnlineController = {
    lookingAlternance: false,
    lookingIndex: 0,
};


/**
 * When we succeeded getting user datas
 * @param object infos
 */
OnlineController._successLookingGetInfos = function (infos) {
    infos.rankName = UserLoggedController.rankNames[infos.rank];

    // Open socket.io connection
    SocketController.connect(Apis.matching.url);

    Container.get('Template').set({
        user: infos
    });

    Container.get('Pages').load('game.looking.hbs', $('#content'), function () {
        // Declenche l'animation
        OnlineController._lookingAnimation();

        // Event listeners
        $('#looking-cancel').on('click', OnlineController._eventLookingCancel);

        // Send search event
        SocketController.send('search:normal', {
            token: localStorage.getItem('token'),
            username: infos.username,
            picture: infos.picture,
            rank: infos.rank
        });
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
 * When the user click on "cancel"
 */
OnlineController._eventLookingCancel = function () {
    SocketController.disconnect();
    OnlineController._removeLookingAnimation();
    Container.get('HTTP').setURI('/overview');
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

    // Open socket.io connection
    SocketController.connect(Apis.matching.url);

    Container.get('Template').set({
        user: infos
    });

    Container.get('Pages').load('online.private.waiting.hbs', $('#content'), function () {
        // Event listeners
        $('#waiting-cancel').on('click', OnlineController._eventLookingCancel);
    });
};


/**
 * When a user click on "search for a public game"
 */
OnlineController._eventPublicGame = function () {
    Container.get('UserApi').me(localStorage.getItem('token'), {
        success: OnlineController._successLookingGetInfos
    });
};



/*****************/
/* SOCKET EVENTS */
/******************/

/**
 * When a match is found
 * @param object infos
 */
OnlineController.matchFoundEvent = function (infos) {
    Container.get('Pages').load('game.play.hbs', $('#content'), function () {});
};
