var UserLoggedController = {

    /**
     * @url /overview
     */
    overviewAction: function () {
        Container.get('Pages').load('user.overview.hbs', $('#content'), function () {
            
        });
    }
};
