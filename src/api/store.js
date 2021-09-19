// const StoreKey = {
//   POINTS: 'points',
//   OFFERS: 'offers',
//   DESTINATIONS: 'destinations',
// };

export default class Store {
  constructor(key, storage) {
    this._storage = storage;
    this._storeKey = 'points';
  }

  getItems() {
    try {
      return JSON.parse(this._storage.getItem(this._storeKey)) || {};
    } catch (err) {
      return {};
    }
  }

  setItems(items) {
    console.log(items)
    this._storage.setItem(
      this._storeKey,
      JSON.stringify(items),
    );
  }




  getOffers() {
    try {
      return JSON.parse(this._storage.getItem('offers')) || {};
    } catch (err) {
      return {};
    }
  }

  setOffers(items) {
    console.log(items)
    this._storage.setItem(
      'offers',
      JSON.stringify(items),
    );
  }

  getDestinations() {
    try {
      return JSON.parse(this._storage.getItem('destinations')) || {};
    } catch (err) {
      return {};
    }
  }

  setDestinations(items) {
    this._storage.setItem(
      'destinations',
      JSON.stringify(items),
    );
  }






  setItem(key, value) {
    const store = this.getItems();

    this._storage.setItem(
      this._storeKey,
      JSON.stringify(
        Object.assign({}, store, {
          [key]: value,
        }),
      ),
    );
  }

  removeItem(key) {
    const store = this.getItems();

    delete store[key];

    this._storage.setItem(
      this._storeKey,
      JSON.stringify(store),
    );
  }
}
