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

  setPoints(points) {
    this._points = points.slice();
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
}

