class Goban {

    /**
     *
     * Constructor
     * @param int size
     */
    constructor(size, goban) {
        this.size = size;
        this.goban = goban;
    }

    /**
     *
     * Draw the goban
     */
    draw() {
        var toDraw = "";

        for (var x = 0; x < (this.size - 1); x++) {
            toDraw += "<tr>";

            for (var y = 0; y < (this.size - 1); y++) {
                toDraw += "<td>&nbsp;</td>";
            }

            toDraw += "</tr>";
        }

        this.goban.html(toDraw);
    }

    /**
     *
     * Get the size of the goban
     * @return int
     */
    getSize() {
        return this.size;
    }
}
