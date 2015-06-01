class DataBinding {

    /**
     *
     * Constructor
     * @param int player
     */
    constructor() {
        this.infos = { };
    }

    /**
     *
     * Update an info
     * @param string info
     * @param mixed value
     */
    update(info, value) {
        this.infos[info] = value;
    }

    /**
     *
     * Update infos
     * @param array infos
     */
    updates(infos) {
        for (info in infos) {
            this.update(info, infos[info]);
        }
    }
}
