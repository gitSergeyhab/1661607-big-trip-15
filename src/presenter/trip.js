import PointPresenter from './point.js';
import NewPointPresenter from './new-point.js';

import Sort from '../view/sort.js';
import PointList from '../view/point-list.js';
import NoPoint from '../view/no-point.js';
import Loading from '../view/loading.js';

import {render, remove} from '../utils/dom-utils.js';
import {sorByDay, sorByTime, sorByPrice} from '../utils/util.js';
import {filter} from '../utils/filter.js';
import {EmptyMessage, UserAction, UpdateType, SortType, FilterType, State} from '../constants.js';


export default class Trip {
  constructor(container, pointsModel, filterModel, offers, destinations, api) {
    this._container = container;
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._offers = offers;
    this._destinations = destinations;
    this._api = api;

    this._pointPresenterMap = new Map();

    this._newPointPresenter = null;
    this._sortComponent = null;
    this._pointListComponent = null;
    this._noPointComponent = null;
    this._currentSortType = SortType.DAY;

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._resetPoints = this._resetPoints.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);
    this._btnAddNewEvent = document.querySelector('.trip-main__event-add-btn');

    this._btnAddNewEvent.addEventListener('click', () => this._createNewPoint());
    this._filterModel.addObserver(this._handleModelEvent);

    this._renderLoading();
  }

  hide() {
    this._container.style.display = 'none';
    this._resetPoints();
    this._resetFilterAndSort();
    if (this._newPointPresenter) {
      this._newPointPresenter.destroy();
    }
  }

  show() {
    this._container.style.display = 'block';
  }


  _getPoints() {
    const filteredPoints = filter[this._filterModel.filter](this._pointsModel.points);
    switch(this._currentSortType) {
      case SortType.PRICE:
        return filteredPoints.sort(sorByPrice);
      case SortType.TIME:
        return filteredPoints.sort(sorByTime);
      default:
        return filteredPoints.sort(sorByDay);
    }
  }

  _renderLoading() {
    if (this._loadingComponent) {
      remove(this._loadingComponent);
    }

    this._loadingComponent = new Loading();
    render(this._container, this._loadingComponent);
  }

  _resetFilterAndSort() {
    this._currentSortType = SortType.DAY;
    this._filterModel.setFilter(UpdateType.MINOR, FilterType.EVERYTHING);
  }

  _createNewPoint() {
    if (this._noPointComponent) {
      remove(this._noPointComponent);
      this._renderPointList();
    }

    this._resetFilterAndSort();

    this._newPointPresenter = new NewPointPresenter(this._pointListComponent, this._handleViewAction, this._resetPoints, this._offers, this._destinations, this._btnAddNewEvent);
    this._newPointPresenter.init();
    this._btnAddNewEvent.disabled = true;
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
    const pointPresenter = new PointPresenter(this._pointListComponent, this._handleViewAction, this._resetPoints, this._offers, this._destinations);
    pointPresenter.init(point);
    this._pointPresenterMap.set(point.id, pointPresenter);
  }

  _renderPoints() {
    this._getPoints().forEach((point) => this._renderPoint(point));
  }

  _renderPointList() {
    this._pointListComponent = new PointList();
    render(this._container, this._pointListComponent);
  }

  _renderNoPoints() {
    if (this._noPointComponent) {
      remove(this._noPointComponent);
    }

    this._noPointComponent = new NoPoint(EmptyMessage[this._filterModel.filter]);
    render(this._container, this._noPointComponent);
  }

  _clearTrip() {
    this._clearTripPoints();
    remove(this._pointListComponent);
    remove(this._sortComponent);
    if (this._newPointPresenter) {
      this._newPointPresenter.destroy();
    }
  }

  _clearTripPoints() {
    this._pointPresenterMap.forEach((point) => point.destroy());
    this._pointPresenterMap.clear();
  }

  _renderTrip() {
    if (!this._getPoints().length && !this._loadingComponent) {
      this._renderNoPoints();
      return;
    }
    if (this._noPointComponent) {
      remove(this._noPointComponent);
    }

    this._renderSort();
    this._renderPointList();
    this._renderPoints();
  }

  _handleViewAction(actionType, updateType, updatedPoint) {
    switch (actionType) {
      case UserAction.UPDATE_FAVORITE_FIELD:
        this._pointPresenterMap.get(updatedPoint.id).setViewState(State.SAVING);
        this._api.updateFavoriteField(updatedPoint)
          .then((response) => this._pointsModel.updatePoint(updateType, response))
          .catch(() => this._pointPresenterMap.get(updatedPoint.id).setViewState(State.ABORTING));
        break;
      case UserAction.UPDATE_POINT:
        this._pointPresenterMap.get(updatedPoint.id).setViewState(State.SAVING);
        this._api.updatePoint(updatedPoint)
          .then((response) => this._pointsModel.updatePoint(updateType, response))
          .catch(() => this._pointPresenterMap.get(updatedPoint.id).setViewState(State.ABORTING));
        break;
      case UserAction.DELETE_POINT:
        this._pointPresenterMap.get(updatedPoint.id).setViewState(State.DELETING);
        this._api.deletePoint(updatedPoint)
          .then(() => this._pointsModel.deletePoint(updateType, updatedPoint))
          .catch(() => this._pointPresenterMap.get(updatedPoint.id).setViewState(State.ABORTING));
        break;
      case UserAction.ADD_POINT:
        this._newPointPresenter.setSaving();
        this._api.addPoint(updatedPoint)
          .then((response) => this._pointsModel.addPoint(updateType, response))
          .catch(() => this._newPointPresenter.setAborting());
    }
  }

  _handleModelEvent(updateType, updatedPoint) {
    switch(updateType) {
      case UpdateType.PATCH:
        this._pointPresenterMap.get(updatedPoint.id).init(updatedPoint);
        break;
      case UpdateType.MINOR:
        this._clearTripPoints();
        this._renderPoints();
        break;
      case UpdateType.MAJOR:
        this._clearTrip();
        this._renderTrip();
        break;
      case UpdateType.INIT:
        remove(this._loadingComponent);
        this._loadingComponent = null;
        this._renderTrip();
    }
  }

  _handleSortTypeChange(sortType) {
    if (sortType === this._currentSortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearTripPoints();
    this._renderPoints();
  }
}
