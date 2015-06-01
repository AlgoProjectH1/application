/** Init **/
Container.add('HTTP', new HttpResponse(location));
Container.add('Template', new Template('templates/'));
Container.add('Pages', new Pages());
Container.get('HTTP').setURI('/login');

var Routing = new Router(Container.get('HTTP'));
var routesContainer = new RoutesContainer();


/** Routes **/
routesContainer.add(UserController.loginAction, {path: '/login'});


Routing.run(routesContainer);
