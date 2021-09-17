import AbstractObserver from './abstract-observer';
import {getIndex} from '../utils/util';


export default class PointsModel extends AbstractObserver {
  constructor() {
    super();
    this._points = [];
  }

  get points() {
    return this._points;
  }

  setPoints(updateType, points) {
    this._points = points.slice();
    this._notify(updateType);
  }

  updatePoint(updateType, updatePoint) {
    const indexPoint = getIndex(this._points, updatePoint);
    this._points = indexPoint === -1 ? this._points : [...this._points.slice(0, indexPoint), updatePoint, ...this._points.slice(indexPoint + 1)];
    this._notify(updateType, updatePoint);
  }

  deletePoint(updateType, deletedPoint) {
    const indexPoint = getIndex(this._points, deletedPoint);
    this._points = indexPoint === -1 ? this._points : [...this._points.slice(0, indexPoint), ...this._points.slice(indexPoint + 1)];
    this._notify(updateType, deletedPoint);
  }

  addPoint(updateType, addedPoint) {
    this._points = [...this._points, addedPoint];
    this._notify(updateType, addedPoint);
  }


  static parseToClient(point) {
    const clientPoint = {
      ...point,
      basePrice: point['base_price'],
      dateFrom: point['date_from'],
      dateTo: point['date_to'],
      isFavorite: point['is_favorite'],
    };

    delete clientPoint['is_favorite'];
    delete clientPoint['base_price'];
    delete clientPoint['date_from'];
    delete clientPoint['date_to'];

    return clientPoint;
  }


  static parseToServer(point) {
    const serverPoint = {
      ...point,
      'base_price': point.basePrice,
      'date_from': point.dateFrom,
      'date_to': point.dateTo,
      'is_favorite': point.isFavorite,
    };

    delete serverPoint.basePrice;
    delete serverPoint.dateFrom;
    delete serverPoint.dateTo;
    delete serverPoint.isFavorite;

    return serverPoint;
  }
}

