class NodeEmptyDetection extends NodeDetection {

    constructor(goban) {
        super(0, goban);
    }

    selectPlayerStones() {
        return super.selectPlayerStones();
    }

    getDimensions(coords) {
        return super.getDimensions(coords);
    }

    hasFriends(stoneDimensions) {
        return super.hasFriends(stoneDimensions);
    }

    hasBeenTraversed(identifier) {
        return super.hasBeenTraversed(identifier);
    }

    getNodes() {
        return super.getNodes();
    }

    getLiberties(dimensions) {
        return super.getLiberties(dimensions);
    }

    /**
     *
     * Get the neighbors of a stone
     * @param array dimensions
     * @param int player
     * @return int
     */
    getNeighbors(dimensions, player) {
        var neighbors = 0;

        for (var dimension in dimensions) {
            var dimensionCoords = dimensions[dimension];
            var index = dimensionCoords.x +":"+ dimensionCoords.y;

            if (this.goban[dimensionCoords.x][dimensionCoords.y] === player) {
                neighbors++;
            }
        }

        return neighbors;
    }

    /**
     *
     * Recursive node detector
     * @param obj stone
     * @param int nodeIndex
     */
    getNodesFriends(stone, nodeIndex) {
        var currentStone = stone;
        var currentStoneIdentifier = `${currentStone.x}:${currentStone.y}`;

        if (this.hasBeenTraversed(currentStoneIdentifier))
            return;

        var stoneDimensions = this.getDimensions(currentStone);
        var stoneFriends = this.hasFriends(stoneDimensions);

        if (this.nodes[nodeIndex].neighbors === undefined)
            this.nodes[nodeIndex].neighbors = {black: 0, white: 0};

        // Put stones in node
        this.nodes[nodeIndex].neighbors.black += this.getNeighbors(stoneDimensions, 1);
        this.nodes[nodeIndex].neighbors.white += this.getNeighbors(stoneDimensions, 2);
        this.nodes[nodeIndex].stones[currentStoneIdentifier] = currentStone;
        this.traversed.push(currentStoneIdentifier);

        for (var friend in stoneFriends) {
            this.getNodesFriends(stoneFriends[friend], nodeIndex);
        }
    }
}
