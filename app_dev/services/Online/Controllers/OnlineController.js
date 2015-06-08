var OnlineController = {
    
    /**
     * @url /looking
     */
    lookingAction: function () {
        Container.get('Pages').load('game.looking.hbs', $('#content'), function () {
            // Declenche la recherche
        });
    }
};
