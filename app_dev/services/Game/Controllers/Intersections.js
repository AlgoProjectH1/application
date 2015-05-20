class Intersections {

    /**
     *
     * Constructor
     * @param int gobanSize
     * @param bool autocomplete (optional)
     */
    constructor(gobanSize, autocomplete) {
        this.interCount = (gobanSize + 2)^2;
        this.intersections = this.initIntersections(autocomplete);
        this.elements = $('#elements');
    }

    /**
     *
     * Init the intersections
     * @param bool autocomplete (optional)
     * @return array
     */
    initIntersections(autocomplete) {
        var intersections = [];

        for (var x = 0; x <= this.interCount; x++) {
            intersections[x] = [];

            for (var y = 0; y <= this.interCount; y++) {
                if (autocomplete === true)
                    intersections[x][y] = this.selectRandomState();
                else
                    intersections[x][y] = 0;
            }
        }

        return intersections;
    }

    /**
     *
     * Select a state from random
     * @return int
     */
    selectRandomState() {
        var random = Math.ceil(Math.random() * 10);
        var player = 0;

        if (random > 9) player = 1;
        else if (random > 8) player = 2;

        return player;
    }

    /**
     *
     * Draw the intersections on the goban
     */
    draw() {
        this.elements.html(null);

        for (var x = 0; x <= this.interCount; x++) {
            for (var y = 0; y <= this.interCount; y++) {
                var posX = (x * 33) - 16;
                var posY = (y * 33) - 16;
                var player = this.intersections[x][y];

                switch (player) {
                    case 0: player = null; break;
                    case 1: player = "black"; break;
                    case 2: player = "white"; break;
                }

                this.elements.append(`<div data-x="${x}" data-y="${y}" style="top: ${posY}px; left: ${posX}px;" class="${player}"></div>`);
            }
        }
    }

    /**
     *
     * Set the coord to a given player
     * @param array coords
     * @param int player
     */
    set(coords, player) {
        this.intersections[coords.x][coords.y] = player;
    }

    /**
     *
     * Get the value of a given coord
     * @param int x
     * @param int y
     * @return int
     */
    get(x, y) {
        if (!x)
            return this.intersections;

        return this.intersections[x][y];
    }
}
