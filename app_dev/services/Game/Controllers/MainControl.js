class MainControl {

    /**
     *
     * Constructor
     */
    constructor() {
        this.currentPlayer = 1;
        this.gameState = 1;
    }

    /**
     *
     * Init the game
     */
    init() {
        Container.get('Goban').draw();
        Container.get('Intersections').draw();

        var that = this;

        $('#elements').on('click', 'div', function () {
            that._eventElement.bind(this)(that);
        });
    }

    /**
     *
     * Switch player turn
     */
    switchPlayer() {
        this.currentPlayer = (this.currentPlayer == 1) ? 2 : 1;

        $('.infos_container.turn').removeClass('turn');
        $('.infos_container[data-player="'+ this.currentPlayer +'"]').addClass('turn');
    }

    /**
     *
     * When use click on an element
     */
    _eventElement(control) {
        var x = parseInt($(this).data('x'));
        var y = parseInt($(this).data('y'));

        if (Container.get('Intersections').get(x, y) === 0) {
            Container.get('Intersections').set({x: x, y: y}, control.currentPlayer);

            for (var player = 1; player <= 2; player++) {
                var nodeController = new NodeDetection(player, Container.get('Intersections').get());
                var nodes = nodeController.getNodes();

                control._verifyNodesToDie(nodes);
            }

            Container.get('Intersections').draw();
            control.switchPlayer();

            // Tests empty nodes
            // var nodeController = new NodeEmptyDetection(Container.get('Intersections').get());
            // var nodes = nodeController.getNodes();
            // var whiteTerritory = "rgba(255,255,255,0.3)";
            // var blackTerritory = "rgba(0,0,0,0.3)";

            // for (var node in nodes) {
            //     var currentNode = nodes[node];
            //     var color = "transparent";

            //     console.log(currentNode.neighbors);

            //     if (currentNode.neighbors.black === 0 && currentNode.neighbors.white > 1) {
            //         console.log('TERRITOIRE BLANC');
            //         color = whiteTerritory;
            //     } else if (currentNode.neighbors.white === 0 && currentNode.neighbors.black > 1) {
            //         console.log('TERRITOIRE NOIR');
            //         color = blackTerritory;
            //     } else {
            //         console.log('TERRITOIRE NEUTRE');
            //     }

            //     for (var stone in currentNode.stones) {
            //         var currentStone = currentNode.stones[stone];
            //         $('[data-x="'+ currentStone.x +'"][data-y="'+ currentStone.y +'"]').css('background', color);
            //     }
            // }
        }
    }

    /**
     *
     * Kill trapped nodes
     * @param obj nodes
     */
    _verifyNodesToDie(nodes) {
        for (var node in nodes) {
            var currentNode = nodes[node];

            if (currentNode.freedom === 0) {
                for (var stone in currentNode.stones) {
                    var currentStone = currentNode.stones[stone];
                    Container.get('Intersections').set(currentStone, 0);
                }
            }
        }
    }
}
