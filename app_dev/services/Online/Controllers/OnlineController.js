var OnlineController = {
    
    /**
     * @url /looking
     */
    lookingAction: function () {
        Container.get('Pages').load('game.looking.hbs', $('#content'), function () {
            
            // Declenche l'animation
            $('.player-swipe').each(function(i) {
                OnlineController._lookingAnimation(i);
            });
        });
    },

    _lookingAnimation: function (nbre) {
        setTimeout(function () {
            $('#player_'+ (nbre - 1)).removeClass('active');
            $('#player_'+ nbre).addClass('active');
        }, (2000 * nbre));
    }
};
