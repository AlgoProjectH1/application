var mainContainer = new Container();

// Container
mainContainer
    .add('Goban', new Goban(9, $('#goban')))
    .add('Intersections', new Intersections(mainContainer.get('Goban').getSize(), true));

var gameControl = new MainControl(mainContainer);
gameControl.init();
