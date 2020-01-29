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
   * POST API (we will use only JSON request body)
   * @param {string} route - api url
   * @param {object} data - POST object to be converted to JSON
   * @return {Promise} result of fetch
   */
  POST(route, data = {}) {
    return fetch(
      qs.stringifyUrl({
        url: config.api.entry + route,
      }),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      }
    );
  }

  /**
   * get products
   * @return {Promise} JSON with products
   */
  getProducts() {
    return this.GET('products/list')
    .then(response => response.json());
  }

  /**
   * post order with client data
   * @return {Promise} The result of fetch
   */
  postOrder(client, options, positions) {
    return this.POST('orders/push', { client, options, positions })
    .then(response => response.json());
  }
}

export default new Api();