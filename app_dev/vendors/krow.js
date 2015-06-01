'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var Container = (function () {
    function Container() {
        _classCallCheck(this, Container);
    }

    _createClass(Container, [{
        key: 'register',

        /**
         *
         * Add an instance to the Container
         * @param string key
         * @param object instance
         * @return object
         *
         */
        value: function register(key, instance) {
            this.__defineGetter__(key, instance);

            return this;
        }
    }]);

    return Container;
})();

var HttpRequest = function HttpRequest() {
    _classCallCheck(this, HttpRequest);
};

var HttpResponse = (function () {
    function HttpResponse(loc) {
        _classCallCheck(this, HttpResponse);

        this.location = loc;
        this.onURIChange = function () {};
    }

    _createClass(HttpResponse, [{
        key: 'setURI',
        value: function setURI(uri, params) {
            this.set('hash', uri);

            // Call an event listener on URIChange (with params I want to pass)
            this.onURIChange();
        }
    }, {
        key: 'getURI',
        value: function getURI() {
            return this.get('hash').replace('#', '');
        }
    }, {
        key: 'onURIChange',
        value: function onURIChange(callback) {
            this.onURIChange = callback;
        }
    }, {
        key: 'get',
        value: function get(key) {
            return this.location[key];
        }
    }, {
        key: 'set',
        value: function set(key, value) {
            this.location[key] = value;
        }
    }]);

    return HttpResponse;
})();

var Request = (function () {

    /**
     * Constructor
     * @param string url
     */

    function Request(url) {
        _classCallCheck(this, Request);

        this.url = url;
        this.datas = {};
        this.headers = {
            'Content-type': 'application/x-www-form-urlencoded'
        };
        this.response = {};
        this.callback = function () {};
    }

    _createClass(Request, [{
        key: 'data',

        /**
         * Set a data to pass through request
         * @param string key
         * @param mixed value
         */
        value: function data(key, value) {
            if (!value) {
                this.datas = key;
            } else {
                this.datas[key] = value;
            }

            return this;
        }
    }, {
        key: 'header',

        /**
         * Set a header to pass through request
         * @param string key
         * @param mixed value
         */
        value: function header(key, value) {
            if (!value) {
                this.headers = key;
            } else {
                this.headers[key] = value;
            }

            return this;
        }
    }, {
        key: 'success',

        /**
         * Define the success callback
         * @param function callback
         */
        value: function success(callback) {
            this.callback = callback;

            return this;
        }
    }, {
        key: 'execute',

        /**
         * Execute the request
         * @param string method
         */
        value: function execute(method) {
            var options = {
                method: method,
                headers: this.headers
            };

            if (method != 'GET') options.body = this.formatBody(this.datas);

            fetch(this.url, options).then(function (response) {
                if (response.ok === true) return response.text();

                throw new Error(response.statusText);
            }).then(this.callback);
        }
    }, {
        key: 'formatBody',

        /**
         * Format the body
         * @param array body
         * @return string
         */
        value: function formatBody(body) {
            var formattedBody = '';

            for (var key in body) {
                formattedBody += key + '=' + body[key] +'&';
            }

            return formattedBody;
        }
    }, {
        key: 'GET',

        /**
         * Execute the request with GET method
         */
        value: function GET() {
            this.execute('GET');
        }
    }, {
        key: 'POST',

        /**
         * Execute the request with POST method
         */
        value: function POST() {
            this.execute('POST');
        }
    }, {
        key: 'DELETE',

        /**
         * Execute the request with DELETE method
         */
        value: function DELETE() {
            this.execute('DELETE');
        }
    }, {
        key: 'PUT',

        /**
         * Execute the request with PUT method
         */
        value: function PUT() {
            this.execute('PUT');
        }
    }]);

    return Request;
})();

var RequestErrorHandler = {
    onError: function onError(error) {
        console.log(error);
    }
};

var RequestResponse = (function () {

    /**
     * Constructor
     * @param object response
     */

    function RequestResponse(response) {
        _classCallCheck(this, RequestResponse);

        this.response = response;
    }

    _createClass(RequestResponse, [{
        key: 'getStatusCode',

        /**
         * Get the status code
         * @return int
         */
        value: function getStatusCode() {
            return this.response.status;
        }
    }, {
        key: 'getStatusText',

        /**
         * Get the status text
         * @return string
         */
        value: function getStatusText() {
            return this.response.statusText;
        }
    }, {
        key: 'getUrl',

        /**
         * Get the url
         * @return string
         */
        value: function getUrl() {
            return this.response.url;
        }
    }, {
        key: 'getBody',

        /**
         * Get the response body
         * @return string
         */
        value: function getBody() {
            return this.response.text();
        }
    }, {
        key: 'getDatas',

        /**
         * Get the json parsed response body
         * @return object
         */
        value: function getDatas() {
            return JSON.parse(this.getBody()).result;
        }
    }, {
        key: 'getHeaders',

        /**
         * Get the response headers
         * @return object
         */
        value: function getHeaders() {
            return this.response.headers;
        }
    }]);

    return RequestResponse;
})();

var RouteDecoder = (function () {

    /**
     *
     * Init the RouteDecoder
     * @param object route
     *
     */

    function RouteDecoder(route) {
        _classCallCheck(this, RouteDecoder);

        this.route = route;
    }

    _createClass(RouteDecoder, [{
        key: 'formatRoutePath',

        /**
         *
         * Format the URL to test with the current PATH
         * @return string
         *
         */
        value: function formatRoutePath() {
            var routeToParse = this.route.options.path;
            var datas = this.route.options.datas;

            if (!datas) {
                return routeToParse;
            }for (var data in datas) {
                routeToParse = routeToParse.replace('{' + data + '}', datas[data]);
            }

            return routeToParse;
        }
    }, {
        key: 'getParameters',

        /**
         *
         * Get datas associated with the keys
         * @param object matchedDatas
         * @return object
         *
         */
        value: function getParameters(matchedDatas) {
            var i = 1;
            var datasToInject = {};

            for (var data in this.route.datas) {
                datasToInject[data] = matchedDatas[i];
                i++;
            }

            return datasToInject;
        }
    }, {
        key: 'getDecodedPath',

        /**
         *
         * Return formatted route path
         * @return string
         *
         */
        value: function getDecodedPath() {
            return this.formatRoutePath();
        }
    }, {
        key: 'getCallback',

        /**
         *
         * Recupere le callback
         * @param object parameters
         * @return mixed
         *
         */
        value: function getCallback(parameters) {
            return this.route.callback(parameters);
        }
    }]);

    return RouteDecoder;
})();

var Router = (function () {

    /**
     *
     * Init the router
     *
     ***********
     * EXAMPLE
     ***********
     * var Routing = new Router(new HTTP(location));
     *
     */

    function Router(HTTP) {
        _classCallCheck(this, Router);

        this.HTTP = HTTP;
    }

    _createClass(Router, [{
        key: 'run',

        /**
         *
         * Launch the router
         * @param RoutesContainer routesContainer
         *
         ***********
         * EXAMPLE
         ***********
         * var routesContainer = new RoutesContainer();
         * routesContainer.add('/home', myController.myMethod);
         *
         * Routing.run(routesContainer);
         *
         */
        value: function run(routesContainer) {
            var routesMatcher = new RoutesMatcher(this.HTTP.getURI(), routesContainer.get());

            routesMatcher.check();

            this.HTTP.onURIChange((function () {
                this.run(routesContainer);
            }).bind(this));
        }
    }]);

    return Router;
})();

var RoutesContainer = (function () {
    function RoutesContainer() {
        _classCallCheck(this, RoutesContainer);

        this.routes = [];
    }

    _createClass(RoutesContainer, [{
        key: 'add',

        /**
         *
         * Add a route
         * @param string path
         * @param function callback
         *
         */
        value: function add(callback, optns) {
            this.routes.push({
                options: optns,
                callback: callback
            });
        }
    }, {
        key: 'get',

        /**
         *
         * Get the routes
         * @return array
         *
         */
        value: function get() {
            return this.routes;
        }
    }]);

    return RoutesContainer;
})();

var RoutesMatcher = (function () {

    /**
     *
     * Init the RoutesMatcher
     * @param string uri
     * @param array routes
     *
     */

    function RoutesMatcher(uri, routes) {
        _classCallCheck(this, RoutesMatcher);

        this.uri = uri;
        this.routes = routes;
        this.defaultPage = function () {};
    }

    _createClass(RoutesMatcher, [{
        key: 'isMatching',

        /**
         *
         * Verify if any route matchs the current path
         * @param string routePath
         *
         */
        value: function isMatching(routePath) {
            return this.uri.match('^' + routePath + '$');
        }
    }, {
        key: 'setDefaultPage',

        /**
         *
         * Define the default page
         * @param function callback
         *
         */
        value: function setDefaultPage(callback) {
            this.defaultPage = callback;
        }
    }, {
        key: 'check',

        /**
         *
         * Coords the routing system
         * @return function
         *
         */
        value: function check() {
            for (var route in this.routes) {
                var currentRoute = new RouteDecoder(this.routes[route]);
                var matching = this.isMatching(currentRoute.getDecodedPath());

                if (matching) {
                    currentRoute.getCallback(currentRoute.getParameters());
                    return;
                }
            }

            this.defaultPage();
            return;
        }
    }]);

    return RoutesMatcher;
})();

var Template = (function () {

    /**
     * Constructor
     * @param string templatePath
     */

    function Template(templatePath) {
        _classCallCheck(this, Template);

        this.path = templatePath;
        this.vars = {};
    }

    _createClass(Template, [{
        key: 'load',

        /**
         * Load a template
         * @param string template
         * @param function callback
         */
        value: function load(template, callback) {
            var templateRequest = new Request(this.path + template).success(callback).GET();
        }
    }, {
        key: 'set',

        /**
         * Set a variable
         * @param mixed key
         * @param string value
         */
        value: function set(key, value) {
            if (!value) {
                this.vars = key;
            } else {
                this.vars[key] = value;
            }

            return this;
        }
    }, {
        key: 'get',

        /**
         * Get a template
         * @param string template
         * @param function callback
         */
        value: function get(template, callback) {
            this.load(template, (function (res) {
                var template = Handlebars.compile(res);
                callback(template(this.vars));

                this.flush();
            }).bind(this));
        }
    }, {
        key: 'flush',

        /**
         * Flush variables
         */
        value: function flush() {
            this.vars = {};
        }
    }]);

    return Template;
})();
