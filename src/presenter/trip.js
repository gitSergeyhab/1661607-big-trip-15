import PointPresenter from './point.js';
import NewPointPresenter from './new-point.js';

import Sort from '../view/sort.js';
import PointList from '../view/point-list.js';
import NoPoint from '../view/no-point.js';

import {render, remove} from '../utils/dom-utils.js';
import {updateItem, sorByDay, sorByTime, sorByPrice} from '../utils/util.js';
import {EmptyMessage, UserAction, UpdateType, SortType} from '../constants.js';


export default class Trip {
  constructor(container, pointsModel, offers, destinations) {
    this._container = container;
    this._pointsModel = pointsModel;
    this._offers = offers;
    this._destinations = destinations;
    this._pointPresenterMap = new Map();

    this._sortComponent = null;
    this._pointList = null;
    this._noPoint = null;
    this._currentSortType = SortType.DAY;

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._resetPoints = this._resetPoints.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);
    this._btnAddNewEvent = document.querySelector('.trip-main__event-add-btn');

    this._btnAddNewEvent.addEventListener('click', () => {
      console.log('00', this._offers, this._destinations, this._btnAddNewEvent)
      if (this._noPoint) {
        console.log(this._noPoint)
        console.log('???')
        remove(this._noPoint);
        this._noPoint = null;
        this._renderSort();
        this._renderPointList();
      }
      console.log('???')
      this._resetPoints();
      console.log('!???!')
      console.log('11', this._offers, this._destinations, this._btnAddNewEvent)
      this._newPointPresenter = new NewPointPresenter(this._pointList, this._handleViewAction, this._resetPoints, this._offers, this._destinations, this._btnAddNewEvent);
      this._newPointPresenter.init();
      this._btnAddNewEvent.disabled = true;
    });
  }

  init() {
    this._renderTrip();
  }

  _getPoints() {
    switch(this._currentSortType) {
      case SortType.PRICE:
        return this._pointsModel.points.sort(sorByPrice);
      case SortType.TIME:
        return this._pointsModel.points.sort(sorByTime);
      default:
        return this._pointsModel.points.sort(sorByDay);
    }
  }

  _resetPoints() {
    this._pointPresenterMap.forEach((point) => point.resetPoint());
    if (this._newPointPresenter) {
      this._newPointPresenter.destroy();
    }
  }

  _renderSort() {
    this._sortComponent = new Sort();
    render(this._container, this._sortComponent);
    this._sortComponent.setChangeTypeHandler(this._handleSortTypeChange);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._pointList, this._handleViewAction, this._resetPoints, this._offers, this._destinations);
    pointPresenter.init(point);
    this._pointPresenterMap.set(point.id, pointPresenter);
  }

  _renderPoints() {
    this._getPoints().forEach((point) => this._renderPoint(point));
  }

  _renderPointList() {
    this._pointList = new PointList();
    render(this._container, this._pointList);
  }

  _renderNoPoints() {
    this._noPoint = new NoPoint(EmptyMessage.EVERYTHING);
    render(this._container, this._noPoint);
  }

  _clearTrip() {
    this._pointPresenterMap.forEach((point) => point.destroy());
    this._pointPresenterMap.clear();
  }

  _renderTrip() {
    if (!this._getPoints().length) {
      this._renderNoPoints();
      return;
    }

    this._renderSort();
    this._renderPointList();
    this._renderPoints();
  }

  _handleViewAction(actionType, updateType, updatedPoint) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._pointsModel.updatePoint(updateType, updatedPoint);
        console.log(actionType, updateType, updatedPoint);
        break;
      case UserAction.DELETE_POINT:
        this._pointsModel.deletePoint(updateType, updatedPoint);
        break;
      case UserAction.ADD_POINT:
        this._pointsModel.addPoint(updateType, updatedPoint);
    }
  }

  _handleModelEvent(updateType, updatedPoint) {
    switch(updateType) {
      case UpdateType.PATCH:
        // console.log(updateType, updatedPoint);
        // this._pointPresenterMap.set(updatedPoint.id, updatedPoint);
        this._pointPresenterMap.get(updatedPoint.id).init(updatedPoint);
        break;
      case UpdateType.MINOR:
        // console.log(updateType, updatedPoint);
        this._clearTrip();
        this._renderPoints();
        break;
      case UpdateType.MAJOR:
        console.log(updateType, updatedPoint);
    }
  }

  _handleSortTypeChange(sortType) {
    if (sortType === this._currentSortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearTrip();
    this._renderPoints();
  }
}
