/* eslint-disable */

const API = require('./Api');

const API_URL = 'https://randomuser.me/api/';
const RandomUsers = new API(API_URL);

class UserApi {
  getPath({options}) {
    return API_URL + API.createRequest(options);
  }

  constructor({ seed }) {
    this.seed = seed;
  }
  async getUsers({ count }) {
    const options = {
      page: 1,
      seed: this.seed,
      results: count
    };
    return await RandomUsers.get(options);
  }
  async getLimitedResult({page, limit=10}) {

    const options = {
      page,
      seed: this.seed,
      results: limit,
    };
    console.log(this.getPath({options}));
    return await RandomUsers.get(options);
  }

}

module.exports = UserApi;
