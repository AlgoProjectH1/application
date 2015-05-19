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

        for (var x = 0; x < this.size; x++) {
            toDraw += "<tr>";

            for (var y = 0; y < this.size; y++) {
                toDraw += "<td>&nbsp;</td>";
            }

            toDraw += "</tr>";
        }

        this.goban.html(toDraw);
    }

}
