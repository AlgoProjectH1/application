var UserController = {

    /**
     * @url /login
     */
    loginAction: function () {
        Container.get('Pages').load('user.login.hbs', $('#content'), function () {
            // events listeners
            $('#login-form').on('submit', UserController._eventLogin);
        });
    },

    /**
     * When a user submit the login form
     * @element #login-form
     * @event submit
     */
    _eventLogin: function (event) {
        event.preventDefault();

        $('#login-loader .btn-loading').addClass('active');
        $('#login-loader button').html('Connexion en cours');

        Container.get('UserApi').login(email, password, {
            success: UserController._eventLoginSuccess,
            failure: UserController._eventLoginFail,
            after:   UserController._eventLoginAfter
        });
    }

    _eventLoginSuccess: function (token) {
        alert(token);
    }

    _eventLoginFail: function (error) {
        alert(error);
    }

    _eventLoginAfter: function () {
        $('#login-loader .btn-loading').removeClass('active');
        $('#login-loader button').html('Connexion');
    }
}
