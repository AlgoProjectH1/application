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

// Online setup
routesContainer.add(OnlineController.setupAction, {
    path: '/online',
    middleware: Container.get('UserSession').isLogged
});

// Looking for a mate
routesContainer.add(OnlineController.lookingAction, {
    path: '/looking',
    middleware: Container.get('UserSession').isLogged
});

// Launch the router
Routing.run(routesContainer);



/*******************/
/** Socket Events **/
/*******************/
// When a match is found
SocketController.on('search:found', OnlineController.matchFoundEvent);
