/** Init **/
Container.add('HTTP', new HttpResponse());
Container.add('Template', new Template('templates/'));
Container.add('Pages', new Pages());

// APIs
Container.add('UserApi', new UserApi(Apis.user.url, Apis.user.key));
Container.add('UserSession', new UserSession(localStorage.getItem('token')));

// Router
var Routing = new Router(Container.get('HTTP'));
var routesContainer = new RoutesContainer();


/** Routes **/
routesContainer.add(function () {
    Container.get('HTTP').setURI('/login');
}, { path: '/' });

routesContainer.add(UserController.loginAction, {
    path: '/login',
    middleware: Container.get('UserSession').isNotLogged
});

routesContainer.add(function() {console.log('lol'); }, {
    path: '/overview',
    middleware: Container.get('UserSession').isLogged
});


Routing.run(routesContainer);
