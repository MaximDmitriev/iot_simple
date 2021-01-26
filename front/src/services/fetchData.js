export default class FetchData {
  // #baseurl = '/mockData/';
  #baseurl = 'http://127.0.0.1:3001/json/';
  #url = '';

  #_makeUrl = (part) => {
    return this.#baseurl + part + '.json';
  }

  getReport(name) {
    return fetch(this.#baseurl + name)
      .then(res => res.json())
      .catch(err => console.log(err));
  }

  getOneRecord(tableName, id) {
    return fetch(this.#baseurl + tableName + '/' + id)
      .then(res => res.json())
      .catch(err => console.log(err));
  }
}