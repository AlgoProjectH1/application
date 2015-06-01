class Pages {

    load(page, container, callback) {
        if (!container)
            var container = $('#content');

        Container.get('Template').get(page, function (template) {
            $('#content').html(template);

            callback();
        });
    }
}
