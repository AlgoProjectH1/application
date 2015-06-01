class UserApi {
    
    constructor(base) {
        this.url = base;
    }

    /**
     * Log an user in
     * @param string email
     * @param string password
     * @param object callbacks
     */
    login(email, password, callbacks) {
        new Request(this.url +'/login')
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
