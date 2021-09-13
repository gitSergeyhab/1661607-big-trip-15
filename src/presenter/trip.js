import PointPresenter from './point.js';
import Sort from '../view/sort.js';
import PointList from '../view/point-list.js';
import NoPoint from '../view/no-point.js';

import {render} from '../utils/dom-utils.js';
import {updateItem, sorByDay, sorByTime, sorByPrice} from '../utils/util.js';
import {EmptyMessage} from '../constants.js';


const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
};


export default class Trip {
  constructor(container, offers, destinations) {
    this._container = container;
    this._offers = offers;
    this._destinations = destinations;
    this._pointPresenterMap = new Map();

    this._sortComponent = new Sort();

    this._handlePointChange = this._handlePointChange.bind(this);
    this._resetPoints = this._resetPoints.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(points) {
    this._points = points;
    this._renderTrip();
  }

  _resetPoints() {
    this._pointPresenterMap.forEach((point) => point.resetPoint());
  }

  _sortPoints(sortType) {
    switch (sortType) {
      case SortType.DAY:
        this._points.sort(sorByDay);
        break;
      case SortType.TIME:
        this._points.sort(sorByTime);
        break;
      case SortType.PRICE:
        this._points.sort(sorByPrice);
    }
  }

  _renderSort() {
    render(this._container, this._sortComponent);
    this._sortComponent.setChangeTypeHandler(this._handleSortTypeChange);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._pointList, this._handlePointChange, this._resetPoints, this._offers, this._destinations);
    pointPresenter.init(point);
    this._pointPresenterMap.set(point.id, pointPresenter);
  }

  _renderPoints() {
    this._points.forEach((point) => this._renderPoint(point));
  }

  _renderPointList() {
    this._pointList = new PointList();
    render(this._container, this._pointList);
  }

  _renderNoPoints() {
    render(this._container, new NoPoint(EmptyMessage.EVERYTHING));
  }

  _clearTrip() {
    this._pointPresenterMap.forEach((point) => point.destroy());
    this._pointPresenterMap.clear();
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
    this._pointPresenterMap.get(updatedPoint.id).init(updatedPoint);
  }

  _handleSortTypeChange(sortType) {
    this._sortPoints(sortType);
    this._clearTrip();
    this._renderPoints();
  }
}
