/* eslint-disable */
const api = require("./requestApi");

class API {
  static createRequest(options) {
    const result = Object.keys(options).reduce((res, key, index) => {
      res += index > 0 ? '&' : '?';
      res += `${key}=${options[key]}`;
      return res;
    }, '');
    return result;
  }

  constructor(apiUrl) {
    this.API_URL = apiUrl;
  }

  async get(options) {
    let result = null;
    const request = API.createRequest(options);
    console.log(request)
    try {
      result = await api.callApi(this.API_URL, request, 'GET');
    } catch (error) {
      console.error(error);
    }
    return result;
  }
}

module.exports = API;
