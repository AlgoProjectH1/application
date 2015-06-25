var SoloController = {
    goban: "",
    intersections: "",
    players: {},
    turn: "black",
    timeGame: {
        interval: null,
        start: null,
        current: "00:00"
    }
};


/**
 * Game init
 */
SoloController.init = function () {
    Container.get('Pages').load('game.play.solo.hbs', $('#content'), function () {
        SoloController.goban = new Goban(13, $('#goban'));
        SoloController.intersections = new Intersections(SoloController.goban.getSize(), false);

        SoloController.initPlayers();

        SoloController.goban.draw();
        SoloController.intersections.draw();

        SoloController.launchTimeCounter();

        // event listeners
        $('#game-quit').on('click', SoloController._eventQuitGame);
        $('#game-skip').on('click', SoloController._eventSkip);
        $('#elements').on('click', 'div', SoloController._eventMove);

        SoloController.requestIA();
    });
};


/**
 * Update time
 */
SoloController.launchTimeCounter = function () {
    SoloController.timeGame.start = Date.now();

    SoloController.timeGame.interval = setInterval(function () {
        var currentDate = Date.now();
        var toDisplay = "";
        var timeDiff = currentDate - SoloController.timeGame.start;
        var minutes = Math.floor((timeDiff / 1000) / 60);
        var seconds = Math.floor((timeDiff / 1000) - (minutes * 60));
        seconds = (seconds < 10) ? "0"+ seconds : seconds;
        minutes = (minutes < 10) ? "0"+ minutes : minutes;

        toDisplay += minutes;
        toDisplay += ":";
        toDisplay += seconds;

        $('#game-counter').html(toDisplay);
        SoloController.timeGame.current = toDisplay;
    }, 1000);
};


/**
 * Reset time
 */
SoloController.resetTime = function () {
    clearInterval(SoloController.timeGame.interval);
    SoloController.timeGame.start = null;
};


/**
 * Set players
 * @param object me
 * @param object adversary
 */
SoloController.initPlayers = function () {
    SoloController.players.me = {
        captures: 0,
        infos: { color: 'black' }
    };
    SoloController.players.adversary = {
        captures: 0,
        infos: { color: 'white' }
    };
};


/**
 * Reset players
 */
SoloController.resetPlayers = function () {
    SoloController.players = {};
};


/**
 * When the user click on "Quitter"
 */
SoloController._eventQuitGame = function () {
    SoloController.resetPlayers();
    Container.get('HTTP').setURI('/overview');
};


/**
 * When the user make a move
 */
SoloController._eventMove = function () {
    if (SoloController.turn != SoloController.players.me.infos.color)
        return;

    var x = $(this).attr('data-x');
    var y = $(this).attr('data-y');

    $('#elements').attr('data-turn', false);
    $('[data-color="white"]').attr('data-turn', false);
    $('[data-color="black"]').attr('data-turn', true);
    SoloController.turn = 'black';

    SoloController.intersections.set({x: x, y: y}, 2);
    SoloController.intersections.draw();

    // Log
    SoloController._log('<b>Vous</b> avez joué en <b>'+ x +'</b>:<b>'+ y +'</b>');

    // IA
    SoloController.requestIA();
};


/**
 * When the user skip
 */
SoloController._eventSkip = function () {
    if (SoloController.turn != SoloController.players.me.infos.color)
        return;

    $('#elements').attr('data-turn', false);
    $('[data-color="white"]').attr('data-turn', false);
    $('[data-color="black"]').attr('data-turn', true);
    SoloController.turn = 'black';

    // Log
    SoloController._log('<b>Vous</b> avez <b>passé votre tour</b>');
};


/**
 * Log the message
 * @param string message
 */
SoloController._log = function (message) {
    $('#game-log').append('<div><b>['+ SoloController.timeGame.current +']</b>&nbsp;&nbsp;'+ message +'</div>');
    $('#game-log').scrollTop($('#game-log').height());
};


/**
 * Update the captures
 * @param object captures
 */
SoloController._updateCaptures = function (captures) {
    for (var color in captures) {
        var colorName = (color == 1) ? 'black' : 'white';
        $('h5[data-score="'+ colorName +'"]').html(captures[color]);
    }
};


/**
 * Send request to IA
 */
SoloController.requestIA = function () {
    new Request( Apis.ia.url +'/simulate' )
        .data('goban', JSON.stringify(SoloController.intersections.get()))
        .success(function (response) {
            response = JSON.parse(response);

            if (response.error === true){
                // error IA
                return;
            }

            SoloController._callbackIA(response.infos);
        })
        .POST();
};


/**
 * When the server refresh the goban
 * @param object infos
 */
SoloController._callbackIA = function (infos) {
    $('#elements').attr('data-turn', true);
    $('[data-color="white"]').attr('data-turn', true);
    $('[data-color="black"]').attr('data-turn', false);
    SoloController.turn = 'white';

    if (infos.skip === true) {
        // Log
        SoloController._log('<b>IA</b> a passé son tour');
        return;
    }

    // Log
    SoloController._log('<b>IA</b> a joué en <b>'+ infos.move.x +'</b>:<b>'+ infos.move.y +'</b>');

    SoloController.intersections.set({x: infos.move.x, y: infos.move.y}, 1);
    SoloController.intersections.draw();
};
