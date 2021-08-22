

import Sort from '../view/sort.js';
import PointList from '../view/point-list.js';
import Point from '../view/point.js';
import EditPoint from '../view/edit-point.js';


import {render, replace} from '../utils/dom-utils.js';


export default class Trip {
  constructor(container) {
    this._container = container;
    this._pointPresenter = new Map();
  }

  init(points) {
    this._points = points;
    this._renderTrip();
  }

  _renderSort() {
    render(this._container, new Sort());
  }

  _renderPoint(point) {
    const collapsedPoint = new Point(point);
    const editPoint = new EditPoint(point);
    const collapsedPointBtn = collapsedPoint.getElement().querySelector('.event__rollup-btn');
    const editPointBtn = editPoint.getElement().querySelector('.event__rollup-btn');
    collapsedPointBtn.addEventListener('click', () => replace(editPoint, collapsedPoint));
    editPointBtn.addEventListener('click', () => replace(collapsedPoint, editPoint));
    render(this._pointList, collapsedPoint);
  }

  _renderPoints() {
    this._points.forEach((point) =>  this._renderPoint(point));
  }

  _renderPointList() {
    this._pointList = new PointList();
    render(this._container, this._pointList);
  }

  _clearTrip() {

  }

  _renderTrip() {
    this._renderSort();
    this._renderPointList();
    this._renderPoints();
  }


  _handlePointChange() {

  }
}
