describe('[GameService.NodeDetection]', function () {
    var nodeDetector = new NodeDetection(1, [[0,0,0], [0,1,1], [0,0,0]]);

    it('Test de NodeDetection.selectPlayerStones()', function () {
        expect(nodeDetector.selectPlayerStones()).toEqual([
            {x: '1', y: '1'},
            {x: '1', y: '2'}
        ]);
    });
});
