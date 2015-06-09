var OnlineController = {
    lookingAlternance: false,
    lookingIndex: 0,
    
    /**
     * @url /looking
     */
    lookingAction: function () {
        Container.get('Pages').load('game.looking.hbs', $('#content'), function () {
            
            // Declenche l'animation
            OnlineController._lookingAnimation();
        });
    },

    _lookingAnimation: function () {
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
    },

    _removeLookingAnimation: function () {
        clearInterval(OnlineController.lookingAlternance);
        OnlineController.lookingIndex = 0;
    }
};
