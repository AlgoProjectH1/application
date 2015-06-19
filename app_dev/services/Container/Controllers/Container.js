var Container = {
    instances: {},

    /**
     *
     * Add an instance to the Container
     * @param string key
     * @param object instance
     * @return object
     *
     */
    add: function (key, instance) {
        this.instances[key] = instance;

        return this;
    },

    /**
     *
     * Get an instance from the Container
     * @param string key
     * @return object
     */
    get: function (key) {
        return this.instances[key];
    }
};
