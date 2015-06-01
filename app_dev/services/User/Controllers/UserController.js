class UserController {

    _pageLogin() {
        
        $('#login-form').on('submit', this._eventLogin);
    }

    _eventLogin(event) {
        event.preventDefault();

        $('#login-loader .btn-loading').addClass('active');
        $('#login-loader button').html('Connexion en cours');

        setTimeout(function () {
            $('#login-loader .btn-loading').removeClass('active');
            $('#login-loader button').html('Connexion');
        }, 3000);
    }
}
