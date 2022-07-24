

import UtilDataMode from './utils/datamodel.js';

class DataModel {
    constructor() {

    }

    toJSON() {
        const getters = UtilDataMode.getPropertyNames(this, 'get');

        const result = {};
        

        for(const getter of getters) {
            result[getter] = UtilDataMode.get(this, getter, null)
        }

        return result;

    }

    static parse(item) {
        if (!item) {
            return null;
        }

        const model = new this();

        const setters = UtilDataMode.getPropertyNames(model, 'set');

        for( const setter of setters) {
            model[setter] = UtilDataMode.get(item, setter, null);
        }

        return JSON.parse(JSON.stringify(model));
    }

    static parseArray(items) {
        if(!items) {
            return [];
        }

        const result = [];

        for(const item of items) {
            result.push(this.parse(item))
        }

        return result;
    }

}

export default DataModel;