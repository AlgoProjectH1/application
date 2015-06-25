var UserLoggedController = {
    rankNames: {
        1: 'Débutant',
        2: 'Confirmé',
        3: 'Maitre',
        4: 'Grand Maitre'
    }
};


/**
 * Menu page
 * @url /overview
 */
UserLoggedController.overviewAction = function () {
    Container.get('UserApi').me(localStorage.getItem('token'), {
        success: UserLoggedController._successGetInfos
    });
};


/**
 * History page
 * @url /overview
 */
UserLoggedController.historyAction = function () {
    Container.get('UserApi').history(localStorage.getItem('token'), {
        success: UserLoggedController._successGetHistory
    });
};


/**
 * When we get the infos
 * @param object infos
 */
UserLoggedController._successGetInfos = function (infos) {
    infos.rankName = UserLoggedController.rankNames[infos.rank];

    Container.get('Template').set({
        user: infos
    });

    Container.get('Pages').load('user.overview.hbs', $('#content'), function () {
        // event listener
        $('#nav-solo-choice').on('click', UserLoggedController._eventSoloChoice);
        $('#nav-online-choice').on('click', UserLoggedController._eventOnlineChoice);
        $('#nav-history-choice').on('click', UserLoggedController._eventOptChoice);
    });
};


/**
 * When we get the infos
 * @param object infos
 */
UserLoggedController._successGetHistory = function (infos) {
    Container.get('Template').set({
        games: infos
    });

    console.log(infos);

    Container.get('Pages').load('user.history.hbs', $('#content'), function () {});
};


/**
 * When a user click on "Solo vs AI"
 */
UserLoggedController._eventSoloChoice = function () {
    Container.get('HTTP').setURI('/solo');
};

/**
 * When a user click on "Multijoueur"
 */
UserLoggedController._eventOnlineChoice = function () {
    Container.get('HTTP').setURI('/online');
};

/**
 * When a user click on "Historique"
 */
UserLoggedController._eventOptChoice = function () {
    Container.get('HTTP').setURI('/history');
};
