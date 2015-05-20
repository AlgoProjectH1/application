var gamePlatform = new Goban(9, $('#goban'));
var gameIntersections = new Intersections(gamePlatform.getSize(), true);

gamePlatform.draw();
gameIntersections.draw();
