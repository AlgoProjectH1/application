// Container
// Container
//     .add('Goban', new Goban(9, $('#goban')))
//     .add('Intersections', new Intersections(Container.get('Goban').getSize(), false));

// var gameControl = new MainControl();
// gameControl.init();

$(function () {
    $('#login-form').on('submit', function (event) {
        event.preventDefault();
        $('#login-loader').addClass('active');

        setTimeout(function () {
            $('#login-loader').removeClass('active');
        }, 3000);
    });
});
