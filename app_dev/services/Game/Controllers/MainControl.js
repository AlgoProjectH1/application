class MainControl {

    /**
     *
     * Constructor
     * @param Container container
     */
    constructor(container) {
        this.container = container;
        this.currentPlayer = 1;
    }

    /**
     *
     * Init the game
     */
    init() {
        this.container.get('Goban').draw();
        this.container.get('Intersections').draw();
    }
}
