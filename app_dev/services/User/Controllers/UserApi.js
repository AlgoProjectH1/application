class UserApi {
    
    constructor(base, token) {
        this.url = base;
        this.key = key;
    }

    /**
     * Log an user in
     * @param string email
     * @param string password
     * @param object callbacks
     */
    login(email, password, callbacks) {
        new Request(this.url +'/login?apiKey='+ this.key)
            .data('email', email)
            .data('password', password)
            .success(function () {
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
}
