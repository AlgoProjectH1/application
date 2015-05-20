class NodeDetection {

    /**
     *
     * Constructor
     * @param int player
     * @param array goban
     */
    constructor(player, goban) {
        this.player = player;
        this.goban = goban;
        this.nodes = [];
        this.traversed = [];
    }

    /**
     *
     * Select the player stones
     * @return array
     */
    selectPlayerStones() {
        var playerStones = [];

        for (var x in this.goban) {
            for (var y in this.goban[x]) {
                if (this.goban[x][y] === this.player) playerStones.push({ x: x, y: y });
            }
        }

        return playerStones;
    }

    /**
     *
     * Get the stone dimensions
     * @param array stoneCoord
     * @return array
     */
    getDimensions(stoneCoord) {
        var stoneDimensions = [];
        var x = parseInt(stoneCoord.x);
        var y = parseInt(stoneCoord.y);

        if ((x + 1) < this.goban.length) stoneDimensions.push({ x: (x + 1), y: y });
        if ((x - 1) >= 0) stoneDimensions.push({ x: (x - 1), y: y });
        if ((y + 1) < this.goban.length) stoneDimensions.push({ x: x, y: (y + 1) });
        if ((y - 1) >= 0) stoneDimensions.push({ x: x, y: (y - 1) });

        return stoneDimensions;
    }

    /**
     *
     * Get the stone friends
     * @param array stoneDimensions
     * @return array
     */
    hasFriends(stoneDimensions) {
        var friends = {};

        for (var dimension in stoneDimensions) {
            var dimensionCoords = stoneDimensions[dimension];
            var index = dimensionCoords.x +":"+ dimensionCoords.y;
        
            if (this.goban[dimensionCoords.x][dimensionCoords.y] === this.player) {
                friends[index] = { x: dimensionCoords.x, y: dimensionCoords.y };
            }
        }

        return friends;
    }

    /**
     *
     * Get the player nodes
     * @return array
     */
    getNodes() {
        var playerStones = this.selectPlayerStones();
        var nodeIndex = 0;

        for (var stone in playerStones) {
            if (this.nodes[nodeIndex] === undefined)
                this.nodes[nodeIndex] = {stones: {}, freedom: 0};

            this.getNodesFriends(playerStones[stone], nodeIndex);
            nodeIndex++;
        }

        return this.nodes;
    }

    /**
     *
     * Node recursive node detector
     * @param obj stone
     * @param int nodeIndex
     */
    getNodesFriends(stone, nodeIndex) {
        var currentStone = stone;
        var currentStoneIdentifier = `${currentStone.x}:${currentStone.y}`;

        if (this.traversed.indexOf(currentStoneIdentifier) > -1) {
            return;
        }

        var stoneDimensions = this.getDimensions(currentStone);
        var stoneFriends = this.hasFriends(stoneDimensions);

        // Put stones in node
        this.nodes[nodeIndex]['stones'][currentStoneIdentifier] = currentStone;
        this.traversed.push(currentStoneIdentifier);

        for (var friend in stoneFriends) {
            this.getNodesFriends(stoneFriends[friend], nodeIndex);
        }
    }

    /**
     *
     * Check if a stone is in a node
     * @param string stone
     * @param array nodes
     */
    isInNode(stone, nodes) {
        for (var node in nodes) {
            var currentNode = nodes[node]['stones'];

            if (currentNode[stone] !== undefined )
                return node;
        }

        return false;
    }

    /**
     *
     * Check if a stone friend are in a node
     * @param object friends
     * @param array nodes
     */
    friendsIsInNode(friends, nodes) {
        for (var friend in friends) {
            var isInNode = this.isInNode(friend, nodes);

            if (isInNode) 
                return isInNode;
        }

        return false;
    }

}
