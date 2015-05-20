class Container {

    /**
     *
     * Constructor
     */
    constructor() {
        this.instances = new Object();
    }

    /**
     *
     * Add an instance to the Container
     * @param string key
     * @param object instance
     * @return object
     *
     */
    add(key, instance) {
        this.instances[key] = instance;

        return this;
    }

    /**
     *
     * Get an instance from the Container
     * @param string key
     * @return object
     */
    get(key) {
        return this.instances[key];
    }
}
