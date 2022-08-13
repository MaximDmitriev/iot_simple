import { getCookieSecurity } from './common';

class FetchData {
  // #baseurl = 'http://backend.app.localhost:3001/json/';
  #baseurl = 'http://localhost:3001/json/';
  // #baseurl = window.settings.host;
  #url = '';
  #body = {};
  #method = 'GET';

  data(obj) {
    this.#body = JSON.stringify(obj);

    return this;
  }

  #_send = () => {
    const request = {
      cache: 'no-cache',
      method: this.#method,
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
        ['X-AUTH']: getCookieSecurity(),
        ['Access-Control-Allow-Origin']: '*',
        ['Access-Control-Allow-Methods']: '*',
        ['Access-Control-Allow-Headers']: '*',
        ['Accept']: 'application/json',
        ['Content-Length']: '30',
      },
    };

    if (this.#method !== 'GET') {
      request.body = this.#body;
    }

    return fetch(this.#url, request)
      .then(res => {
        if (res.ok && res.status === 200) return res.json();
      })
      .catch(err => {
        console.log(err);
      });
  };

  logIn() {
    this.#method = 'POST';
    this.#url = this.#baseurl + 'login';

    return this.#_send();
  }

  logOut() {
    this.#method = 'POST';
    this.#url = this.#baseurl + 'login/out';

    return this.#_send();
  }

  getReport(tableName) {
    this.#method = 'GET';
    this.#url = this.#baseurl + tableName;

    return this.#_send();
  }

  getOneRecord(tableName, id) {
    this.#method = 'GET';
    this.#url = this.#baseurl + tableName + '/' + id;

    return this.#_send();
  }

  createRecord(tableName) {
    this.#method = 'POST';
    this.#url = this.#baseurl + tableName + '/create';

    return this.#_send();
  }

  deleteRecord(tableName) {
    this.#method = 'DELETE';
    this.#url = this.#baseurl + tableName + '/delete';

    return this.#_send();
  }

  updateRecord(tableName) {
    this.#method = 'PUT';
    this.#url = this.#baseurl + tableName + '/update';

    return this.#_send();
  }

  getFreeSensors() {
    this.#method = 'GET';
    this.#url = this.#baseurl + 'service/get_free_sensors';

    return this.#_send();
  }

  setClusterSensors() {
    this.#method = 'POST';
    this.#url = this.#baseurl + 'service/set_cluster_sensors';

    return this.#_send();
  }

  switchRelay() {
    this.#method = 'POST';
    this.#url = this.#baseurl + 'service/switch';

    return this.#_send();
  }
}

export const fetchService = new FetchData();
