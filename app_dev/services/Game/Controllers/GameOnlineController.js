var GameOnlineController = {};


GameOnlineController.setupAction = function () {
    Container.get('Pages').load('online.setup.hbs', $('#content'), function () {
        
    });
};
