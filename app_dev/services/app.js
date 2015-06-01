// Container
// Container
//     .add('Goban', new Goban(9, $('#goban')))
//     .add('Intersections', new Intersections(Container.get('Goban').getSize(), false));

// var gameControl = new MainControl();
// gameControl.init();

$(function () {
    $('#login-form').on('submit', function (event) {
        event.preventDefault();
        $('#login-loader .btn-loading').addClass('active');
            $('#login-loader button').html('Connexion en cours');

        setTimeout(function () {
            $('#login-loader .btn-loading').removeClass('active');
            $('#login-loader button').html('Connexion');
        }, 3000);
    });
});
