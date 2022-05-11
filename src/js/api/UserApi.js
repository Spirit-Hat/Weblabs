/* eslint-disable */

const API = require('./Api');

const API_URL = 'https://randomuser.me/api/';
const RandomUsers = new API(API_URL);

class UserApi {

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

}

module.exports = UserApi;
