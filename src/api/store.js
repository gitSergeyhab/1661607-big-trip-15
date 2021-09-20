export default class Store {
  constructor(storage, pointsKey, offersKey, destinationsKey) {
    this._storage = storage;
    this._pointsKey = pointsKey;
    this._offersKey = offersKey;
    this._destinationsKey = destinationsKey;
  }

  getPoints() {
    return this._getItems(this._pointsKey);
  }

  getOffers() {
    return this._getItems(this._offersKey);
  }

  getDestinations() {
    return this._getItems(this._destinationsKey);
  }

  setPoints(items) {
    return this._setItems(this._pointsKey, items);
  }

  setOffers(items) {
    return this._setItems(this._offersKey, items);
  }

  setDestinations(items) {
    return this._setItems(this._destinationsKey, items);
  }


  setPoint(key, value) {
    const store = this.getPoints();
    this._storage.setItem(this._pointsKey, JSON.stringify({...store, [key]: value}));
  }

  removeItem(key) {
    const store = this.getItems();
    delete store[key];
    this._storage.setItem(this._pointsKey, JSON.stringify(store));
  }


  _getItems(key) {
    try {
      return JSON.parse(this._storage.getItem(key)) || {};
    } catch (err) {
      return {};
    }
  }

  _setItems(key, items) {
    this._storage.setItem(key, JSON.stringify(items));
  }
}
