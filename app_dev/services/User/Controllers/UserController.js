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
            // events listeners
            $('#signup-form').on('submit', UserController._eventSignup);
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


    /**
     * When a user submit the login form
     * @element #login-form
     * @event submit
     */
    _eventSignup: function (event) {
        event.preventDefault();

        var email = $('#login-email').val();
        var pseudo = $('#login-pseudo').val();
        var password = $('#login-password').val();

        $('#login-loader .btn-loading').addClass('active');
        $('#login-loader button').html('Inscription en cours');

        Container.get('UserApi').signup(email, pseudo, password, {
            success: UserController._eventSignupSuccess,
            failure: UserController._eventSignupFail,
            after:   UserController._eventSignupAfter
        });
    },

    _eventSignupSuccess: function (token) {
        localStorage.setItem('token', token);
        UserController._eventCheckLoginSuccess();
    },

    _eventSignupFail: function (error) {
        $('#login-errors').html(error).fadeIn();
    },

    _eventSignupAfter: function () {
        $('#login-loader .btn-loading').removeClass('active');
        $('#login-loader button').html('Inscription');
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
