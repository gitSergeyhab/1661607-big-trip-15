import PointPresenter from './point.js';
import Sort from '../view/sort.js';
import PointList from '../view/point-list.js';
import NoPoint from '../view/no-point.js';

import {render} from '../utils/dom-utils.js';
import {updateItem} from '../utils/util.js';
import {EmptyMessage} from '../constants.js';


export default class Trip {
  constructor(container) {
    this._container = container;
    this._pointPresenter = new Map();

    this._handlePointChange = this._handlePointChange.bind(this);
  }

  init(points) {
    this._points = points;
    this._renderTrip();
  }


  _renderSort() {
    render(this._container, new Sort());
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._pointList, this._handlePointChange);
    pointPresenter.init(point);
    this._pointPresenter.set(point.id, pointPresenter);
  }

  _renderPoints() {
    this._points.forEach((point) =>  this._renderPoint(point));
  }

  _renderPointList() {
    this._pointList = new PointList();
    render(this._container, this._pointList);
  }

  _renderNoPoints() {
    render(this._container, new NoPoint(EmptyMessage.EVERYTHING));
  }

  _clearTrip() {
    this._pointPresenter.forEach((point) => point.destroy());
    this._pointPresenter.clear();
  }

  _renderTrip() {
    if (!this._points.length) {
      this._renderNoPoints();
      return;
    }
    this._renderSort();
    this._renderPointList();
    this._renderPoints();
  }

  _handlePointChange(updatedPoint) {
    this._points = updateItem(this._points, updatedPoint);
    this._pointPresenter.get(updatedPoint.id).init(updatedPoint);
  }
}
