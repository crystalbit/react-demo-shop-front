import config from './config';
import qs from 'query-string';

class Api {
    /**
     * GET API
     * @param {string} route - api url
     * @param {object} params - GET params
     * @return {Promise} result of fetch
     */
    GET(route, params = {}) {
        return fetch(qs.stringifyUrl({
            url: config.api.entry + route,
            query: params
        }));
    }

    /**
     * get products
     * @return {Promise} JSON with products
     */
    getProducts() {
        return this.GET('products/list')
        .then(response => response.json());
    }
}

export default new Api();