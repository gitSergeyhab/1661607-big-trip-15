import Point from '../view/point.js';
import EditPoint from '../view/edit-point.js';

import {render, replace, remove} from '../utils/dom-utils.js';
import {UserAction, UpdateType} from '../constants.js';


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

    this._handlePointToEditClick = this._handlePointToEditClick.bind(this);
    this._handleEscKeyDown = this._handleEscKeyDown.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);

    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._handleSaveClick = this._handleSaveClick.bind(this);

  }

  init(point) {
    this._point = point;

    const prevPointComponent = this._pointComponent;
    const prevEditPointComponent = this._editPointComponent;

    this._pointComponent = new Point(point);
    this._editPointComponent = new EditPoint(point, this._offers, this._destinations);

    this._pointComponent.setChangeViewHandler(this._handlePointToEditClick);
    this._editPointComponent.setChangeViewHandler(this._handlePointToEditClick);
    this._editPointComponent.setSubmitHandler(this._handleSubmit);

    this._editPointComponent.setDeleteClickHandler(this._handleDeleteClick);
    this._editPointComponent.setSaveClickHandler(this._handleSaveClick);

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
    document.addEventListener('keydown', this._handleEscKeyDown);
    this._mode = Mode.EDIT;
  }

  _replaceEditToPoint() {
    this._editPointComponent.resetState();
    replace(this._pointComponent, this._editPointComponent);
    document.removeEventListener('keydown', this._handleEscKeyDown);
    this._mode = Mode.POINT;
  }

  _handleFavoriteClick() {
    this._changeData(UserAction.UPDATE_POINT, UpdateType.PATCH, {
      ...this._point, isFavorite: !this._point.isFavorite,
    });
  }

  _handlePointToEditClick() {
    if (this._mode === Mode.EDIT) {
      this._replaceEditToPoint();
      return;
    }
    this._resetPoints();
    this._replacePointToEdit();
  }

  _handleSubmit() {
    this._replaceEditToPoint();
  }

  _handleEscKeyDown(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._replaceEditToPoint();
    }
  }

  _handleDeleteClick() {
    this._changeData(UserAction.DELETE_POINT, UpdateType.MAJOR, this._point);
  }

  _handleSaveClick(state) {
    this._changeData(UserAction.UPDATE_POINT, UpdateType.MAJOR, state);
  }

}
