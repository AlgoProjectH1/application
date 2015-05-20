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
        var nodes = [];
        var traversed = [];

        for (var stone in playerStones) {
            var currentStone = playerStones[stone];
            var currentStoneIdentifier = `${currentStone.x}:${currentStone.y}`;
            
            var stoneDimensions = this.getDimensions(currentStone);
            var stoneFriends = this.hasFriends(stoneDimensions);

            var friendsNode = this.friendsIsInNode(stoneFriends, nodes);
            var stoneNode = this.isInNode(`${currentStone.x}:${currentStone.y}`, nodes);

            if (stoneNode !== false && traversed[currentStoneIdentifier] === undefined) {
                var nodeIndex = stoneNode;
            } else if (friendsNode !== false) {
                var nodeIndex = friendsNode;
            } else {
                var nodeIndex = nodes.length;
                nodes[nodeIndex] = {stones: {}, freedom: 0};
            }

            // Put stones in node
            nodes[nodeIndex]['stones'][currentStoneIdentifier] = currentStone;
            traversed.push(currentStoneIdentifier);
        }

        return nodes;
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
