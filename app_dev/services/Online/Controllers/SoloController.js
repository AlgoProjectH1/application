var SoloController = {
    goban: "",
    intersections: "",
    players: {},
    turn: "black",
    timeGame: {
        interval: null,
        start: null,
        current: "00:00"
    },
    captures: {1: 0, 2: 0}
};


/**
 * Game init
 */
SoloController.init = function () {
    Container.get('Pages').load('game.play.solo.hbs', $('#content'), function () {
        SoloController.goban = new Goban(19, $('#goban'));
        SoloController.intersections = new Intersections(SoloController.goban.getSize(), false);

        SoloController.initPlayers();

        SoloController.goban.draw();
        SoloController.intersections.draw();

        SoloController.launchTimeCounter();

        // event listeners
        $('#game-quit').on('click', SoloController._eventQuitGame);
        $('#game-skip').on('click', SoloController._eventSkip);
        $('#elements').on('click', 'div', SoloController._eventMove);
        $('#game-tuto').on('click', TutoController._eventTuto);

        // If user didn't see the tuto we display it
        if (!localStorage.getItem('tutorial')) {
            TutoController._eventTuto();
        }

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
        infos: { color: 'white' }
    };
    SoloController.players.adversary = {
        captures: 0,
        infos: { color: 'black' }
    };
};


/**
 * Kill nodes
 */
SoloController.verifyNodesToDie = function () {
    // Calcul new goban for each player
    for (var player = 1; player <= 2; player++) {
        var nodeController = new NodeDetection(player, SoloController.intersections.get());
        var nodes = nodeController.getNodes();
        var playerN = (player === 1) ? 2 : 1;

        for (var node in nodes) {
            var currentNode = nodes[node];

            if (currentNode.freedom === 0) {
                for (var stone in currentNode.stones) {
                    var currentStone = currentNode.stones[stone];
                    SoloController.intersections.set(currentStone, 0);
                    SoloController.captures[playerN]++;
                }
            }
        }
    }
};


/**
 * Count points
 */
SoloController.countPoints = function () {
    var nodeController = new NodeEmptyDetection(SoloController.intersections.get());
    var nodes = nodeController.getNodes();

    for (var node in nodes) {
        var currentNode = nodes[node];
        var currentPlayer = 0;
        var toAdd = 0;

        for (var stone in currentNode.stones) { toAdd++; }

        if (currentNode.neighbors.black === 0 && currentNode.neighbors.white > 1) {
            SoloController.captures[2] += toAdd;
        } else if (currentNode.neighbors.white === 0 && currentNode.neighbors.black > 1) {
            SoloController.captures[1] += toAdd;
        }
    }

    // KOMI
    SoloController.captures[2] += 7.5;

    return SoloController.captures;
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

    $('#elements .preview').removeClass('white preview');

    SoloController.intersections.set({x: x, y: y}, 2);

    // Kill nodes
    SoloController.verifyNodesToDie();

    SoloController._updateCaptures(SoloController.captures);
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

    var scores = SoloController.countPoints();
    var winner = {};
    var loser = {};

    if (scores[2] > scores[1]) {
        winner = {
            username: "Vous",
            score: scores[2]
        };
        loser = {
            username: "IA",
            score: scores[1]
        };
    } else {
        winner = {
            username: adversary.infos.username,
            score: scores[1]
        };
        loser = {
            username: "Vous",
            score: scores[2]
        };
    }

    Container.get('Template').set({
        winner: winner,
        loser: loser
    });

    Container.get('Pages').load('game.end.hbs', $('#content'), function () {});
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
 * Ask IA
 */
SoloController.askIA = function () {
    new Request( Apis.ia.url +'/simulate' )
        .data('goban', JSON.stringify(SoloController.intersections.get()))
        .success(function (response) {
            response = JSON.parse(response);

            if (response.error === true){
                // error IA
                return;
            }

            var infos = response.infos;
            $('#elements [data-x="'+ infos.move.x +'"][data-y="'+ infos.move.y +'"]').addClass('white preview');
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

    // Kill nodes
    SoloController.verifyNodesToDie();

    SoloController._updateCaptures(SoloController.captures);
    SoloController.intersections.draw();

    // Ask IA
    SoloController.askIA();
};
