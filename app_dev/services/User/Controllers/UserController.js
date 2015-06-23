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
     * @url /signup
     */
    signupAction: function () {
        Container.get('Pages').load('user.signup.hbs', $('#content'), function () {
            
        });
    },


    /**
     * When a user submit the login form
     * @element #login-form
     * @event submit
     */
    _eventLogin: function (event) {
        event.preventDefault();

        var email = $('#login-email').val();
        var password = $('#login-password').val();

        $('#login-loader .btn-loading').addClass('active');
        $('#login-loader button').html('Connexion en cours');

        Container.get('UserApi').login(email, password, {
            success: UserController._eventLoginSuccess,
            failure: UserController._eventLoginFail,
            after:   UserController._eventLoginAfter
        });
    },

    _eventLoginSuccess: function (token) {
        localStorage.setItem('token', token);
        UserController._eventCheckLoginSuccess();
    },

    _eventLoginFail: function (error) {
        $('#login-errors').html(error).fadeIn();
    },

    _eventLoginAfter: function () {
        $('#login-loader .btn-loading').removeClass('active');
        $('#login-loader button').html('Connexion');
    },


    /** Check login events **/
    _eventCheckLoginSuccess: function () {
        Container.get('HTTP').setURI('/overview');
    },

    _eventCheckLoginFail: function () {
        Container.get('HTTP').setURI('/login');
    },




    /**
     * @url /logout
     */
    logoutAction: function () {
        localStorage.removeItem('token');
        Container.get('HTTP').setURI('/login');
    }
};
