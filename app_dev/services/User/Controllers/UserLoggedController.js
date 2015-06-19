var UserLoggedController = {};


/**
 * Menu page
 * @url /overview
 */
UserLoggedController.overviewAction = function () {
    Container.get('Pages').load('user.overview.hbs', $('#content'), function () {
        // event listener
        $('#nav-solo-choice').on('click', UserLoggedController._eventSoloChoice);
        $('#nav-online-choice').on('click', UserLoggedController._eventOnlineChoice);
        $('#nav-opt-choice').on('click', UserLoggedController._eventOptChoice);
    });
};


/**
 * When a user click on "Solo vs AI"
 */
UserLoggedController._eventSoloChoice = function () {

};

/**
 * When a user click on "Multijoueur"
 */
UserLoggedController._eventOnlineChoice = function () {
    Container.get('HTTP').setURI('/online');
};
