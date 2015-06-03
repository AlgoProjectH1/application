class Pages {

    /**
     * Constructor
     */
    constructor() {
        this.loading = $('#loading-element');
    }

    /**
     * Load a page
     * @param string page
     * @param object container
     * @param function callback
     */
    load(page, container, callback) {
        this.loading.fadeIn();
        $('#content').hide();

        if (!container)
            var container = $('#content');

        Container.get('Template').get(page, function (template) {
            $('#content').html(template);

            this.loading.hide();
            $('#content').fadeIn();

            callback();
        }.bind(this));
    }

    /**
     * Define the loading
     * @param object loadingElement
     */
    setLoading(element) {
        this.loading = element;
    }
}
