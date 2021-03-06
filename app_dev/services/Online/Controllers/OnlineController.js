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
        setTimeout(function () {
            SocketController.send('search:normal', {
                token: localStorage.getItem('token'),
                username: infos.username,
                picture: infos.picture,
                rank: infos.rank
            });
        }, 1000);
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

    // Send private create event
    SocketController.send('search:create', {
        token: localStorage.getItem('token'),
        username: infos.username,
        picture: infos.picture,
        rank: infos.rank
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


/**
 * /join/{gameID}
 */
OnlineController.joinAction = function (params) {
    Container.get('UserApi').me(localStorage.getItem('token'), {
        success: function (infos) { OnlineController._successJoinGetInfos(params.game, infos); }
    });
};


/**
 * When we succeeded getting user datas
 * @param object infos
 */
OnlineController._successJoinGetInfos = function (game, infos) {
    // Open socket.io connection
    SocketController.connect(Apis.matching.url);

    // Send private create event
    setTimeout(function () {
        SocketController.send('search:join', {
            game: game,
            user: {
                token: localStorage.getItem('token'),
                username: infos.username,
                picture: infos.picture,
                rank: infos.rank
            }
        });
    }, 1000);
};


/*****************/
/* SOCKET EVENTS */
/******************/

/**
 * When a match is found
 * @param object infos
 */
OnlineController.matchFoundEvent = function (infos) {
    infos = JSON.parse(infos);
    infos.me.turn = (infos.me.color == 'black') ? true : false;

    // Open socket.io chat connection
    ChatController.connect(Apis.chat.url);

    Container.get('Template').set({
        me: infos.me,
        adversary: infos.adversary
    });

    // Set Players
    GameController.setPlayers(infos.me, infos.adversary);
    GameController.gameID = infos.gameIdentifier;

    // Stop anim
    OnlineController._removeLookingAnimation();

    // Delete all the other users
    $('.player-right #player_0').removeClass('active');
    $('.player-right #player_1').removeClass('active');
    $('.player-right #player_2').removeClass('active');

    // Update user infos
    $('.player-right #player_0 img').attr('src', 'http://gravatar.com/avatar/'+ infos.adversary.picture +'?s=50');
    $('.player-right #player_0 .infos h3').html(infos.adversary.username);
    $('.player-right #player_0 .infos span').html('Débutant');
    $('.player-right #player_0 ').addClass('active');

    // Fire animation
    $('.loading-anim').fadeOut();
    $('.loading-title').fadeOut();
    $('.player-left').animate({left: "-70px"});
    $('.player-right').animate({right: "-70px"});

    // Display game page
    setTimeout(function () {
        Container.get('Pages').load('game.play.hbs', $('#content'), GameController.init);

        // Connect to chat channel
        ChatController.send('channel:join', JSON.stringify({
            gameID: infos.gameIdentifier,
            user: {username: infos.me.username}
        }));
    }, 1500);
};


/**
 * When the private game is created
 */
OnlineController.privateCreatedEvent = function (infos) {
    infos = JSON.parse(infos);
    infos.user.rankName = UserLoggedController.rankNames[infos.user.rank];

    Container.get('Template').set({
        user: infos.user,
        game: infos.game
    });

    Container.get('Pages').load('online.private.waiting.hbs', $('#content'), function () {
        // Event listeners
        $('#waiting-cancel').on('click', OnlineController._eventLookingCancel);
    });
};
