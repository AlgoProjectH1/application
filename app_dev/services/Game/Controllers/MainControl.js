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
            Container.get('Intersections').draw();
            
            var node = new NodeDetection(control.currentPlayer, Container.get('Intersections').get());
            control.switchPlayer();
        }
    }
}
