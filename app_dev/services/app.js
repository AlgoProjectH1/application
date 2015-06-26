/**********/
/** Init **/
/**********/
Container.add('HTTP', new HttpResponse());
Container.add('Template', new Template('templates/'));
Container.add('Pages', new Pages());

// APIs
Container.add('UserApi', new UserApi(Apis.user.url, Apis.user.key));
Container.add('UserSession', new UserSession(localStorage.getItem('token')));

// Router
var Routing = new Router(Container.get('HTTP'));
var routesContainer = new RoutesContainer();


/************/
/** Routes **/
/************/
routesContainer.add(function () {
    Container.get('HTTP').setURI('/login');
}, { path: '/' });

// Login
routesContainer.add(UserController.loginAction, {
    path: '/login',
    middleware: Container.get('UserSession').isNotLogged
});

// Signup
routesContainer.add(UserController.signupAction, {
    path: '/signup',
    middleware: Container.get('UserSession').isNotLogged
});

// Logout
routesContainer.add(UserController.logoutAction, {
    path: '/logout',
    middleware: Container.get('UserSession').isLogged
});

// Overview
routesContainer.add(UserLoggedController.overviewAction, {
    path: '/overview',
    middleware: Container.get('UserSession').isLogged
});

// History
routesContainer.add(UserLoggedController.historyAction, {
    path: '/history',
    middleware: Container.get('UserSession').isLogged
});

// Solo
routesContainer.add(SoloController.init, {
    path: '/solo',
    middleware: Container.get('UserSession').isLogged
});

// Online setup
routesContainer.add(OnlineController.setupAction, {
    path: '/online',
    middleware: Container.get('UserSession').isLogged
});

// Join a private game
routesContainer.add(OnlineController.joinAction, {
    path: '/join/{game}',
    datas: { game: '([a-z0-9]+)' },
    middleware: Container.get('UserSession').isLogged
});

// Launch the router
Routing.run(routesContainer);



/*******************/
/** Socket Events **/
/*******************/
// When a match is found
SocketController.on('search:found', OnlineController.matchFoundEvent);

// When a private is created
SocketController.on('search:waiting', OnlineController.privateCreatedEvent);

// When the server refresh the goban
SocketController.on('game:refresh', GameController.refreshEvent);

// When the user skipped
SocketController.on('game:skipped', GameController.skippedEvent);

// When the server kick us off
SocketController.on('game:disconnect', GameController.disconnectEvent);


/*******************/
/**  Chat Events  **/
/*******************/
// When a message come
ChatController.on('message:new', GameController.newMessageEvent);
