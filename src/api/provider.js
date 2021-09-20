import PointsModel from '../model/points-model';
import {isOnline} from '../utils/util';
import {showOfflineMessage} from '../utils/show-offline-message.js';


const StructureKey = {
  POINTS: 'id',
  OFFERS: 'type',
  DESTINATIONS: 'name',
};

const ErrorMessage = {
  ADD_POINT: 'ADD POINT',
  DELETE_POINT: 'DELETE POINT',
  UPDATE_POINT: 'UPDATE POINT',
  SYNC: 'Sync data failed',
};

const rejectRequest = (typeRequest) =>  Promise.reject(new Error(`${typeRequest} failed`));
const createStoreStructure = (key, items) => items.reduce((acc, current) => ({...acc, [current[key]]: current}), {});
const getSuccessPoints = (results) => results.filter((result) => result.success).map((result) => result.payload.point);

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getPoints() {
    if (isOnline()) {
      return this._api.getPoints()
        .then((points) => {
          const items = createStoreStructure(StructureKey.POINTS, points.map(PointsModel.adaptToServer));
          this._store.setPoints(items);
          return points;
        });
    }

    const storePoints = Object.values(this._store.getPoints());
    return Promise.resolve(storePoints.map(PointsModel.adaptToClient));
  }

  getOffers() {
    if (isOnline()) {
      return this._api.getOffers()
        .then((offers) => {
          const items = createStoreStructure(StructureKey.OFFERS, offers);
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
          const items = createStoreStructure(StructureKey.DESTINATIONS, destinations);
          this._store.setDestinations(items);
          return destinations;
        });
    }

    const storeDestinations = Object.values(this._store.getDestinations());
    return Promise.resolve(storeDestinations);
  }


  updateFavoriteField(point) {
    if (isOnline()) {
      return this._api.updateFavoriteField(point)
        .then((updatedPoint) => {
          this._store.setPoint(updatedPoint.id, PointsModel.adaptToServer(updatedPoint));
          return updatedPoint;
        });
    }

    this._store.setPoint(point.id, PointsModel.adaptToServer({...point}));
    return Promise.resolve(point);
  }


  updatePoint(point) {
    if (isOnline()) {
      return this._api.updatePoint(point);
    }

    showOfflineMessage();
    return rejectRequest(ErrorMessage.UPDATE_POINT);
  }

  addPoint(point) {
    if (isOnline()) {
      return this._api.addPoint(point);
    }

    showOfflineMessage();
    return rejectRequest(ErrorMessage.ADD_POINT);
  }

  deletePoint(point) {
    if (isOnline()) {
      return this._api.deletePoint(point);
    }

    showOfflineMessage();
    return rejectRequest(ErrorMessage.DELETE_POINT);
  }

  sync() {
    if (isOnline()) {
      const storePoints = Object.values(this._store.getPoints());
      return this._api.sync(storePoints)
        .then((response) => {
          // Забираем из ответа синхронизированные задачи
          const createdPoints = getSuccessPoints(response.created);
          const updatedPoints = getSuccessPoints(response.updated);
          // Добавляем синхронизированные задачи в хранилище.
          // Хранилище должно быть актуальным в любой момент.
          const items = createStoreStructure(StructureKey.POINTS, [...createdPoints, ...updatedPoints]);
          this._store.setPoints(items);
        });
    }
    return rejectRequest(ErrorMessage.SYNC);
  }
}
