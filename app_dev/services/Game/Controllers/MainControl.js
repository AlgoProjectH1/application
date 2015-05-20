class MainControl {

    /**
     *
     * Constructor
     */
    constructor() {
        this.currentPlayer = 1;
    }

    /**
     *
     * Init the game
     */
    init() {
        Container.get('Goban').draw();
        Container.get('Intersections').draw();

        $('#elements').on('click', 'div', this._eventElement);
    }

    /**
     *
     * When use click on an element
     */
    _eventElement() {
        var x = parseInt($(this).data('x'));
        var y = parseInt($(this).data('y'));

        
    }
}
