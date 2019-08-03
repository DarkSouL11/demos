/* eslint-disable no-underscore-dangle */
export class LocalStorage {
  constructor(key) {
    this.key = key;

    this.setItem = this.setItem.bind(this);
    this.getItem = this.getItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  setItem(key, data) {
    const lsData = this._getParsedData();
    lsData[key] = data;
    this._stringifyAndSetData(lsData);
  }

  getItem(key) {
    const lsData = this._getParsedData();
    return lsData[key];
  }

  removeItem(key) {
    const lsData = this._getParsedData();
    delete lsData[key];
    this._stringifyAndSetData(lsData);
  }

  _getParsedData() {
    return JSON.parse(localStorage.getItem(this.key)) || {};
  }

  _stringifyAndSetData(data) {
    localStorage.setItem(this.key, JSON.stringify(data));
  }
}

const localStore = new LocalStorage("react-template");

export default localStore;
