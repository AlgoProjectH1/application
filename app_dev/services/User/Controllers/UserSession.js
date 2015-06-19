class UserSession {

    /**
     * Constructor
     * @param string token
     */
    constructor(token) {
        this.token = token +':computer';
    }

    /**
     * Verify if the user is not loggedIn
     * @param function next
     * @param object paramsNext
     */
    isNotLogged(next, paramsNext) {
        if (!localStorage.getItem('token')) {
            return next(paramsNext);
        }

        // Send an error
        Container.get('HTTP').setURI('/overview');
    }

    /**
     * Verify if the user is loggedIn
     * @param function next
     * @param object paramsNext
     */
    isLogged(next, paramsNext) {
        var token = localStorage.getItem('token') +':computer';

        RequestErrorHandler.onError = function () {
            localStorage.removeItem('token');
            Container.get('HTTP').setURI('/login');
        };

        if (token !== undefined) {
            Container.get('UserApi').checkToken(token, {
                fail: RequestErrorHandler.onError,
                success: function (response) {
                    next(paramsNext);
                }
            });

            return;
        }

        RequestErrorHandler.onError();
    }
}
