const ONE_DAY = 1000*60*60*24;

class AuthCache {
  constructor() {
    this.user = {};
    this.token = null;
    this._expiredDate = null;
  }
  _getCalculatedDate() {
    const date = new Date();
    return date.getTimezoneOffset() + ONE_DAY;
  }
  createUser({ user, token }) {
    this.user = user;
    this.token = token;
    this._expiredDate = this._getCalculatedDate();
  }
  deleteUser() {
    this.user = {};
    this.token = null;
    this._expiredDate = null;
  }
  getUserData(token) {
    return this.isSessionExisted(token) ? { user: this.user, token: this.token } : { user: {}, token: null };
  }
  isSessionExisted(token) {
    if (token !== this.token) return false;
    const date = new Date();
    return !!this.token && date.getTimezoneOffset() < this._expiredDate;
  }
}

const authCache = new AuthCache();

module.exports = { authCache };
