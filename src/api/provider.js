import PointsModel from '../model/points-model';
import { isOnline } from '../utils/util';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

const EndPoints = {
  POINTS: 'points',
  DESTINATIONS: 'destinations',
  OFFERS: 'offers',
  SYNC: 'points/sync',
};

const StoreKey = {
  POINTS: 'points',
  OFFERS: 'offers',
  DESTINATIONS: 'destinations',
};


const createStoreStructure = (items) => items.reduce((acc, current) => ({...acc, [current.id]: current}), {});
const createOffersStoreStructure = (items) => items.reduce((acc, current) => ({...acc, [current.type]: current}), {});
const createDestinationsStoreStructure = (items) => items.reduce((acc, current) => ({...acc, [current.name]: current}), {});

// const createStoreStructure = (items) =>
//   items
//     .reduce((acc, current) => Object.assign({}, acc, {
//       [current.id]: current,
//     }), {});

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }




  getOffers() {
    if (isOnline()) {
      return this._api.getOffers()
        .then((offers) => {
          console.log(offers)
          const items = createOffersStoreStructure(offers);
          this._store.setOffers(items);
          return offers;
        });
    }
    const storeOffers = Object.values(this._store.getOffers());

    return Promise.resolve(storeOffers);
  }


  getDestinations() {
    if (isOnline()) {
      return this._api.getDestinations()
        .then((destinations) => {
          console.log(destinations)
          const items = createDestinationsStoreStructure(destinations);
          this._store.setDestinations(items);
          return destinations;
        });
    }
    const storeDestinations = Object.values(this._store.getDestinations());

    return Promise.resolve(storeDestinations);
  }



  getPoints() {
    if (isOnline()) {
      return this._api.getPoints()
        .then((points) => {
          console.log(points)
          const items = createStoreStructure(points.map(PointsModel.adaptToServer));
          this._store.setItems(items);
          return points;
        });
    }
    const storePoints = Object.values(this._store.getItems());

    return Promise.resolve(storePoints.map(PointsModel.adaptToClient));
  }

  updatedPoint(point) {
    if (isOnline()) {
      return this._api.updatedPoint(point)
        .then((updatedPoint) => {
          this._store.setItem(updatedPoint.id, PointsModel.adaptToServer(updatedPoint));
          return updatedPoint;
        });
    }

    this._store.setItem(point.id, PointsModel.adaptToServer(Object.assign({}, point)));

    return Promise.resolve(point);
  }

  addPoint(point) {
    if (isOnline()) {
      return this._api.addPoint(point)
        .then((newPoint) => {
          this._store.setItem(newPoint.id, PointsModel.adaptToServer(newPoint));
          return newPoint;
        });
    }

    return Promise.reject(new Error('Add point failed'));
  }

  deletePoint(point) {
    if (isOnline()) {
      return this._api.deletePoint(point)
        .then(() => this._store.removeItem(point.id));
    }

    return Promise.reject(new Error('Delete point failed'));
  }

  sync() {
    if (isOnline()) {
      const storePoints = Object.values(this._store.getItems());

      return this._api.sync(storePoints)
        .then((response) => {
          // Забираем из ответа синхронизированные задачи
          const createdPoints = response.created;
          const updatedPoints = response.updated;

          // Добавляем синхронизированные задачи в хранилище.
          // Хранилище должно быть актуальным в любой момент.
          const items = createStoreStructure([...createdPoints, ...updatedPoints]);

          this._store.setItems(items);
        });
    }

    return Promise.reject(new Error('Sync data failed'));
  }
}
