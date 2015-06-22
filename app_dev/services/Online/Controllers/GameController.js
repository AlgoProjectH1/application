var GameController = {
    goban: "",
    intersections: "",
    players: {},
    turn: "black",
    timeGame: {
        interval: null,
        start: null
    }
};


/**
 * Game init
 */
GameController.init = function () {
    GameController.goban = new Goban(13, $('#goban'));
    GameController.intersections = new Intersections(GameController.goban.getSize(), false);

    GameController.goban.draw();
    GameController.intersections.draw();

    GameController.launchTimeCounter();

    // event listeners
    $('#game-quit').on('click', GameController._eventQuitGame);
    $('#elements').on('click', 'td', GameController._eventMove);
};


/**
 * Update time
 */
GameController.launchTimeCounter = function () {
    GameController.timeGame.start = Date.now();

    GameController.timeGame.interval = setInterval(function () {
        var currentDate = Date.now();
        var toDisplay = "";
        var timeDiff = currentDate - GameController.timeGame.start;
        var minutes = Math.floor((timeDiff / 1000) / 60);
        var seconds = Math.floor((timeDiff / 1000) - (minutes * 60));
        seconds = (seconds < 10) ? "0"+ seconds : seconds;
        minutes = (minutes < 10) ? "0"+ minutes : minutes;

        toDisplay += minutes;
        toDisplay += ":";
        toDisplay += seconds;

        $('#game-counter').html(toDisplay);
    }, 1000);
};


/**
 * Reset time
 */
GameController.resetTime = function () {
    clearInterval(GameController.timeGame.interval);
    GameController.timeGame.start = null;
};


/**
 * Set players
 * @param object me
 * @param object adversary
 */
GameController.setPlayers = function (me, adversary) {
    GameController.players.me = {
        captures: 0,
        infos: me
    };
    GameController.players.adversary = {
        captures: 0,
        infos: adversary
    };
};


/**
 * Reset players
 */
GameController.resetPlayers = function () {
    GameController.players = {};
};


/**
 * Change turn
 */
GameController.changeTurn = function () {
    $('[data-color="'+ GameController.turn +'"]').attr('data-turn', false);

    if (GameController.turn == 'black')
        GameController.turn = 'white';
    else
        GameController.turn = 'black';

    $('[data-color="'+ GameController.turn +'"]').attr('data-turn', true);

    if (GameController.players.me.infos.color == GameController.turn)
        $('#elements').attr('data-turn', true);
    else
        $('#elements').attr('data-turn', false);
};


/**
 * When the user click on "Quitter"
 */
GameController._eventQuitGame = function () {
    SocketController.disconnect();
    GameController.resetPlayers();
    Container.get('HTTP').setURI('/overview');
};


/**
 * When the user make a move
 */
GameController._eventMove = function () {
    if (GameController.turn != GameController.players.me.infos.color)
        return;

    var x = $(this).attr('data-x');
    var y = $(this).attr('data-y');

    GameController.changeTurn();
    SocketController.send('game:play', JSON.stringify({
        x: x,
        y: y
    }));
};


/**
 * When we are kicked off
 */
GameController.disconnectEvent = function () {
    SocketController.connection = null;
    GameController.resetPlayers();
    Container.get('HTTP').setURI('/overview');
};


/**
 * When the server refresh the goban
 * @param object infos
 */
GameController.refreshEvent = function (infos) {
    infos = JSON.parse(infos);
    var nextTurn = (infos.next === 1) ? 'black' : 'white';

    if (GameController.players.me.infos.color == nextTurn) {
        $('#elements').attr('data-turn', true);
    } else {
        $('#elements').attr('data-turn', false);
    }

    GameController.intersections.intersections = infos.goban;
    GameController.intersections.draw();
};
