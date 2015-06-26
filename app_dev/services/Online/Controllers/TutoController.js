var TutoController = {};


/**
 * When the user click on tuto
 */
TutoController._eventTuto = function () {
    $('#content-tuto').fadeIn();

    Container.get('Pages').load('tuto.one.hbs', $('#container-tuto'), function () {
        $('#content-tuto').on('click', '#exit-tuto', TutoController._exitEvent);
        $('#content-tuto').on('click', '#tuto-interface', TutoController._interfaceEvent);
        $('#content-tuto').on('click', '#tuto-placements', TutoController._placementsEvent);
        $('#content-tuto').on('click', '#tuto-interdits', TutoController._interditsEvent);
    });
};


TutoController._exitEvent = function () {
    localStorage.setItem('tutorial', true);

    $('#content-tuto').fadeOut(function () {
        $('#container-tuto').html('');
    });
};


TutoController._interfaceEvent = function () {
    Container.get('Pages').load('tuto.interface.hbs', $('#container-tuto'), function () {});
};


TutoController._placementsEvent = function () {
    Container.get('Pages').load('tuto.placements.hbs', $('#container-tuto'), function () {});
};


TutoController._interditsEvent = function () {
    Container.get('Pages').load('tuto.interdits.hbs', $('#container-tuto'), function () {});
};
