var TutoController = {};


/**
 * When the user click on tuto
 */
TutoController._eventTuto = function () {
    $('#content-tuto').fadeIn();

    Container.get('Pages').load('tuto.one.hbs', $('#content-tuto'), function () {
        $('#exit-tuto').on('click', TutoController._exitEvent);
    });
};


TutoController._exitEvent = function () {
    localStorage.setItem('tutorial', true);
    
    $('#content-tuto').fadeOut(function () {
        $('#content-tuto').html('');
    });
};
