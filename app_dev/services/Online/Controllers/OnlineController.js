var OnlineController = {
    
    /**
     * @url /looking
     */
    lookingAction: function () {
        Container.get('Pages').load('game.looking.hbs', $('#content'), function () {
            
            // Declenche la recherche
            setTimeout(function () {
                $('#player_0').removeClass('active');
                $('#player_0').addClass('active');

                setTimeout(function () {
                    $('#player_0').removeClass('active');
                    $('#player_1').addClass('active');

                    setTimeout(function () {
                        $('#player_1').removeClass('active');
                        $('#player_2').addClass('active');
                    }, 2000);
                }, 2000);
            }, 100);
        });
    }
};
