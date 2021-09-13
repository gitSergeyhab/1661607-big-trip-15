import Point from '../view/point.js';
import EditPoint from '../view/edit-point.js';

import {render, replace, remove} from '../utils/dom-utils.js';

const Mode = {
  POINT: 'POINT',
  EDIT: 'EDIT',
};


export default class PointPresenter{
  constructor(pointContainer, changeData, resetPoints, offers, destinations) {
    this._pointContainer = pointContainer;
    this._changeData = changeData;
    this._resetPoints = resetPoints;
    this._offers = offers;
    this._destinations = destinations;

    this._pointComponent = null;
    this._editPointComponent = null;

    this._mode = Mode.POINT;

    this._handlerPointToEditClick = this._handlerPointToEditClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handlerSubmit = this._handlerSubmit.bind(this);
    // this._resetPoints = this._resetPoints.bind(this)

  }

  init(point) {
    this._point = point;

    const prevPointComponent = this._pointComponent;
    const prevEditPointComponent = this._editPointComponent;

    this._pointComponent = new Point(point);
    this._editPointComponent = new EditPoint(point, this._offers, this._destinations);

    this._pointComponent.setChangeViewHandler(this._handlerPointToEditClick);
    this._editPointComponent.setChangeViewHandler(this._handlerPointToEditClick);
    this._editPointComponent.setSubmitHandler(this._handlerSubmit);
    this._pointComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    if (prevPointComponent === null || prevEditPointComponent === null) {
      render(this._pointContainer, this._pointComponent);
      return;
    }

    this._mode === Mode.POINT ?
      replace(this._pointComponent, prevPointComponent) :
      replace(this._editPointComponent, prevEditPointComponent);

    remove(prevPointComponent);
    remove(prevEditPointComponent);
  }

  destroy() {
    remove(this._pointComponent);
    remove(this._editPointComponent);
  }

  resetPoint() {
    if (this._mode === Mode.EDIT) {
      this._replaceEditToPoint();
    }
  }

  _replacePointToEdit() {
    replace(this._editPointComponent, this._pointComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);
    this._mode = Mode.EDIT;
  }

  _replaceEditToPoint() {
    replace(this._pointComponent, this._editPointComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
    this._mode = Mode.POINT;
  }

  _handleFavoriteClick() {
    this._changeData({
      ...this._point, isFavorite: !this._point.isFavorite,
    });
  }

  _handlerPointToEditClick() {
    if (this._mode === Mode.EDIT) {
      this._replaceEditToPoint();
      return;
    }
    this._resetPoints();
    this._replacePointToEdit();
  }

  _handlerSubmit() {
    this._replaceEditToPoint();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._replaceEditToPoint();
    }
  }


  // const collapsedPoint = new Point(point);
  // const editPoint = new EditPoint(point);
  // const collapsedPointBtn = collapsedPoint.getElement().querySelector('.event__rollup-btn');
  // const editPointBtn = editPoint.getElement().querySelector('.event__rollup-btn');
  // collapsedPointBtn.addEventListener('click', () => replace(editPoint, collapsedPoint));
  // editPointBtn.addEventListener('click', () => replace(collapsedPoint, editPoint));
  // render(this._pointList, collapsedPoint);
}
