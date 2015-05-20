// Container
Container
    .add('Goban', new Goban(9, $('#goban')))
    .add('Intersections', new Intersections(Container.get('Goban').getSize(), true));

var gameControl = new MainControl();
gameControl.init();
