class UserApi {

    constructor(base, key) {
        this.url = base;
        this.key = key;
    }

    /**
     * Build API url
     * @param string url
     * @param mixed  token
     * @param object params
     * @return string
     */
    buildUrl(url, token, params) {
        if (!token) token = false;
        if (!params) params = [];

        var finalURL = this.url +"/"+ url +"?key="+ this.key;

        if (token !== false) finalURL += "&token="+ (token +':computer');

        return finalURL;
    }

    /**
     * Log an user in
     * @param string email
     * @param string password
     * @param object callbacks
     */
    login(email, password, callbacks) {
        new Request( this.buildUrl('login') )
            .data('email', email)
            .data('password', password)
            .success(function (response) {
                response = JSON.parse(response);

                if (response.error === true){
                    callbacks.failure(response.message);
                } else {
                    callbacks.success(response.token);
                }

                if (callbacks.after)
                    callbacks.after();
            })
            .POST();
    }

    /**
     * Sign an user up
     * @param string email
     * @param string pseudo
     * @param string password
     * @param object callbacks
     */
    signup(email, pseudo, password, callbacks) {
        new Request( this.buildUrl('signup') )
            .data('email', email)
            .data('pseudo', pseudo)
            .data('password', password)
            .success(function (response) {
                response = JSON.parse(response);

                if (response.error === true){
                    callbacks.failure(response.message);
                } else {
                    callbacks.success(response.token);
                }

                if (callbacks.after)
                    callbacks.after();
            })
            .POST();
    }

    /**
     * Check the validity of a token
     * @param string token
     * @param object callbacks
     */
    checkToken(token, callbacks) {
        new Request( this.buildUrl('token', token) )
            .success(function(response) {
                response = JSON.parse(response);

                if (response.error === true) {
                    callbacks.fail();
                } else {
                    callbacks.success();
                }
            })
            .GET();
    }

    /**
     * Get the user datas
     * @param string token
     * @param object callbacks
     */
    me(token, callbacks) {
        new Request( this.buildUrl('me', token) )
            .success(function (response) {
                response = JSON.parse(response);

                if (response.error === true) {
                    callbacks.fail();
                } else {
                    callbacks.success(response.infos);
                }
            })
            .GET();
    }

    /**
     * Get the user game history
     * @param string token
     * @param object callbacks
     */
    history(token, callbacks) {
        new Request( this.buildUrl('history', token) )
            .success(function (response) {
                response = JSON.parse(response);

                if (response.error === true) {
                    callbacks.fail();
                } else {
                    callbacks.success(response.games);
                }
            })
            .GET();
    }
}
