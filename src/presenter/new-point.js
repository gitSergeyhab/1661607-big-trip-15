import EditPoint from '../view/edit-point.js';

import {render, remove} from '../utils/dom-utils.js';
import {UserAction, UpdateType, Place} from '../constants.js';
import { getRandomInt } from '../utils/util.js';


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
  id: getRandomInt(100, 120),
};


export default class NewPointPresenter{
  constructor(pointContainer, changeData, resetPoints, offers, destinations, btnAddNewEvent) {
    this._pointContainer = pointContainer;
    this._changeData = changeData;
    this._resetPoints = resetPoints;
    this._offers = offers;
    this._destinations = destinations;
    this._btnAddNewEvent = btnAddNewEvent;

    this._editPointComponent = null;
    this._point = emptyPoint;

    this._handleEscKeyDown = this._handleEscKeyDown.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);

    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._handleSaveClick = this._handleSaveClick.bind(this);

  }

  init() {
    this._editPointComponent = new EditPoint(this._point, this._offers, this._destinations, true);
    this._editPointComponent.setSubmitHandler(this._handleSubmit);
    this._editPointComponent.setDeleteClickHandler(this._handleDeleteClick);
    this._editPointComponent.setSaveClickHandler(this._handleSaveClick);
    render(this._pointContainer, this._editPointComponent, Place.AFTER_BEGIN);
  }

  destroy() {
    remove(this._editPointComponent);
    this._editPointComponent = null;
    this._btnAddNewEvent.disabled = false;
  }

  resetPoint() {
    // if (this._mode === Mode.EDIT) {
    //   this._replaceEditToPoint();
    // }
  }

  _handleSubmit() {
    this.destroy();
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

  _handleSaveClick(state) {
    this._changeData(UserAction.ADD_POINT, UpdateType.MINOR, state);
    this.destroy();
  }
}
