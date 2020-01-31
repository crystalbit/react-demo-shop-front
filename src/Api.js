import config from './config';
import qs from 'query-string';
import axios from 'axios';
axios.defaults.withCredentials = true;

class Api {
  /**
   * GET API
   * @param {string} route - api url
   * @param {object} params - GET params
   * @return {Promise} result of fetch
   */
  GET(route, params = {}) {
    return axios(qs.stringifyUrl({
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
    return axios.post(
      qs.stringifyUrl({
        url: config.api.entry + route,
      }),
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  /**
   * get products
   * @return {Promise} JSON with products
   */
  getProducts() {
    return this.GET('products/list')
    .then(it => it.data);
  }

  /**
   * post order with client data
   * @return {Promise} The result of fetch
   */
  postOrder(client, options, positions) {
    return this.POST('orders/push', { client, options, positions })
    .then(it => it.data);
  }

  /**
   * checks if logged in
   * @return {object} auth: bool, client if logged
   */
  logged() {
    return this.GET('auth/login')
    .then(it => it.data);
  }

  /**
   * logoff
   * @return {object} auth: false
   */
  logout() {
    return this.GET('auth/logout')
    .then(it => it.data);
  }

  /**
   * log in
   * @param {string} email
   * @param {string} password
   * @return {object} auth: bool, client if logged
   */
  login(email, password) {
    return this.POST('auth/login', { email, password })
    .then(it => it.data);
  }

  /**
   * log in
   * @param {object} client
   * @param {string} password
   * @return {object} auth: bool, client if logged
   */
  register(client, password) {
    return this.POST('auth/register', { ...client, password })
    .then(it => it.data);
  }

  /**
   * get orders of a logged in user
   * @return {object}
   */
  orders() {
    return this.GET('orders/get')
    .then(it => it.data);
  }
}

export default new Api();
