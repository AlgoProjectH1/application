class UserApi {
    
    constructor(base, key) {
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
        new Request(this.url +'/login?key='+ this.key)
            .data('email', email)
            .data('password', password)
            .success(function (response) {
                var response = JSON.parse(response);

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
