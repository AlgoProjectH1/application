/** Init **/
Container.add('HTTP', new HttpResponse(location));
Container.get('HTTP').setURI('/login');

var Routing = new Router(Container.get('HTTP'));
var routesContainer = new RoutesContainer();


/** Controllers **/
var User = new UserController();


/** Routes **/
routesContainer.add('/login', User._pageLogin);


Routing.run(routesContainer);
