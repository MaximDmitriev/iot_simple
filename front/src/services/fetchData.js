export default class FetchData {
  constructor(tableName) {
    this.tableName = tableName;
  }

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

  getReport(name) {
    this.#url = this.#baseurl + name;
    return this.#_send();
  }

  getOneRecord(id) {
    this.#method = 'GET';
    this.#url = this.#baseurl + this.tableName + '/' + id;
    return this.#_send();
  }

  createRecord() {
    this.#method = 'POST';
    this.#url = this.#baseurl + this.tableName + '/create';
    return this.#_send();
  }

  deleteRecord() {
    this.#method = 'DELETE';
    this.#url = this.#baseurl + this.tableName + '/delete';
    return this.#_send();
  }

  updateRecord() {
    this.#method = 'PUT';
    this.#url = this.#baseurl + this.tableName + '/update';
    return this.#_send();
  }
}