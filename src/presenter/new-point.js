import EditPoint from '../view/edit-point.js';

import {render, remove} from '../utils/dom-utils.js';
import {UserAction, UpdateType, Place} from '../constants.js';


const emptyPoint =   {
  type: 'drive',
  dateFrom: new Date(),
  dateTo: new Date(),
  destination: {
    name: 'Nagasaki',
    description: 'Nagasaki',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.600907098005395',
        description: 'Nagasaki parliament building',
      },
    ],
  },
  basePrice: 0,
  isFavorite: false,
  offers: [],
};


export default class NewPointPresenter{
  constructor(pointContainer, changeData, resetPoints, offers, destinations, btnAddNewEvent) {
    this._pointContainer = pointContainer;
    this._changeData = changeData;
    this._resetPoints = resetPoints;
    this._offers = offers;
    this._destinations = destinations;
    this._btnAddNewEvent = btnAddNewEvent;

    this._newPointComponent = null;
    this._point = emptyPoint;

    this._handleEscKeyDown = this._handleEscKeyDown.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);

  }

  init() {
    this._newPointComponent = new EditPoint(this._point, this._offers, this._destinations, true);
    this._newPointComponent.setSubmitHandler(this._handleSubmit);
    this._newPointComponent.setDeleteClickHandler(this._handleDeleteClick);
    document.addEventListener('keydown', this._handleEscKeyDown);
    render(this._pointContainer, this._newPointComponent, Place.AFTER_BEGIN);
  }

  destroy() {
    document.removeEventListener('keydown', this._handleEscKeyDown);
    remove(this._newPointComponent);
    this._newPointComponent = null;
    this._btnAddNewEvent.disabled = false;
  }

  setSaving() {
    this._newPointComponent.updateState({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    this._newPointComponent.shake(() => this._newPointComponent.updateState({
      isDisabled: false,
      isSaving: false,
    }));
  }

  _handleSubmit(state) {
    this._changeData(UserAction.ADD_POINT, UpdateType.MAJOR, state);
  }

  _handleEscKeyDown(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  }

  _handleDeleteClick() {
    this.destroy();
  }
}
