class UtilDataMode {

    static get(data, key, defaultValue) {
        if(!key) {
            return defaultValue;
        }

        let result = null;

        const parts = key.split('.');

        if (parts.length === 0 || !UtilDataMode.isSet(data) || !UtilDataMode.isSet(data[parts[0]])) {
            return defaultValue;
        }

        if(parts.length === 1) {
            result = data[parts[0]];
        } else if(parts.length === 2) {
            result = UtilDataMode.get(data[parts[0]], [parts[1]] , defaultValue);  
        } else {
            const firstPart = parts.shift();
            result = UtilDataMode.get(data[firstPart], parts.join('.'), defaultValue);
        }

        if(!UtilDataMode.isSet(result)) {
            return defaultValue;
        }

        return result;
    }

    static isSet(data) {
        if(data == null || typeof data === 'undefined') {
            return false;
        }

        return true;
    }

    static getPropertyNames(instance, type = 'get') {
        let target = instance;

        let names = [];

        while(target && target.constructor.name !== 'Object') {

            const prototype = target.prototype || target.constructor.prototype;

            const targetKeys = Reflect.ownKeys(prototype).filter(name => typeof Reflect.getOwnPropertyDescriptor(prototype, name)[type] === 'function');

            const classFields = Object.keys(target);

            names = names.concat(targetKeys, classFields);

            target = Reflect.getPrototypeOf(Reflect.getPrototypeOf(target))
        }

        return Array.from(new Set(names))
    }

}

export default UtilDataMode;