class FetchData {
  #baseurl = 'http://127.0.0.1:3001/json/';
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
    };
    if (this.#method !== 'GET') {
      request.headers = {
        'Content-Type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type,Accept, Authortization',
      };
      request.body = this.#body;
    }
    return fetch(this.#url, request)
      .then(res => res.json())
      .catch(err => console.log(err));
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
}

export const fetchService = new FetchData();
