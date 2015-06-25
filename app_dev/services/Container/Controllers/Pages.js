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
        if (!container)
            container = $('#content');

        this.loading.fadeIn();
        container.hide();

        Container.get('Template').get(page, function (template) {
            container.html(template);

            this.loading.hide();
            container.fadeIn();

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
