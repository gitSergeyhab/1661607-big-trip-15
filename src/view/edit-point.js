import {renderList, capitalize} from '../utils/util.js';
import {getFullDateTime} from '../utils/data-time-utils.js';
import Smart from './smart.js';

import flatpickr from 'flatpickr';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const DATE_FORMAT = 'd/m/y H:i';
const OFFER_SPLIT_ID = 'event-offer-luggage-';
// const DEFAULT_DESTINATION = {
//   name: 'Valencia',
//   description: '',
//   pictures: [],
// };

const PointType = {
  RESTAURANT: 'restaurant',
  SIGHTSEEING: 'sightseeing',
  CHECK_IN: 'check-in',
  FLIGHT: 'flight',
  DRIVE: 'drive',
  TRANSPORT: 'transport',
  SHIP: 'ship',
  TRAIN: 'train',
  BUS: 'bus',
  TAXI: 'taxi',
};

const getOffersByType = (offers, type) => offers.find((offer) => offer.type === type).offers;

const createTypeItem = (type, chosenType) => `<div class="event__type-item">
  <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${type === chosenType ? 'checked' : ''}>
  <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${capitalize(type)}</label>
</div>`;

const createEventTypeList = (chosenType) => Object.values(PointType).map((type) => createTypeItem(type, chosenType)).join('\n');


const getCityNames = (destinations) => destinations.map((item) => (`<option value="${item.name}"></option>`)).join('\n');

const createEditBtn = (newPoint) => newPoint ? '' : `<button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>`;


const crateEventPhoto = (picture) => `<img class="event__photo" src="${picture.src}" alt="Event photo"></img>`;

const isChosenOffer = (serverOffer, offers) => offers.some((offer) => offer.title === serverOffer.title);

const createOfferHtml = (serverOffer, offers) => `
<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden"
    id="event-offer-luggage-${serverOffer.title}"
    type="checkbox" name="event-offer-luggage"
    ${isChosenOffer(serverOffer, offers) ? 'checked' : ''}>
  <label class="event__offer-label" for="event-offer-luggage-${serverOffer.title}">
    <span class="event__offer-title">${serverOffer.title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${serverOffer.price}</span>
  </label>
</div>`;

const renderOffers = (offers, serverOffers) => serverOffers.map((serverOffer) => createOfferHtml(serverOffer, offers)).join('\n');

const createOffersContainer = (offers, serverOffers) => `<section class="event__section  event__section--offers">
  <h3 class="event__section-title  event__section-title--offers">Offers</h3>
  <div class="event__available-offers">${renderOffers(offers, serverOffers, createOfferHtml)}</div>
</section>`;


const createPhotoSection = (pictures) => `
  <div class="event__photos-container">
    <div class="event__photos-tape">
      ${renderList(pictures || [], crateEventPhoto)}
    </div>
  </div>`;

const createDestination = (destination) => !destination ? '' : `
  <section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destination.description}</p>
    ${createPhotoSection(destination.pictures)}
  </section>`;


const createPoint =  ({id, basePrice, dateFrom, dateTo, destination, offers, type, hasOffers, hasDestination, serverOffers, serverDestinations}, newPoint) => `
<li class="trip-events__item" data-id=${id}>
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${createEventTypeList(type)}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-${id}">
          ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${destination.name}" list="destination-list-${id}">
        <datalist id="destination-list-${id}">
          ${getCityNames(serverDestinations)}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-${id}">From</label>
        <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${getFullDateTime(dateFrom)}"}>
        &mdash;
        <label class="visually-hidden" for="event-end-time-${id}">To</label>
        <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${getFullDateTime(dateTo)}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value=${basePrice}>
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">${newPoint ? 'Cancel' : 'Delete'}</button>

      ${createEditBtn(newPoint)}

    </header>
    <section class="event__details">
      ${hasOffers ? createOffersContainer(offers, serverOffers) : ''}
      ${hasDestination ? createDestination(destination) : ''}
    </section>
  </form>
</li>`;


export default class EditPoint extends Smart {
  constructor(point, offers, destinations, newPoint) {
    super();
    this._point = point;
    this._offers = offers;
    this._destinations = destinations;
    this._new = newPoint;
    this._state = EditPoint.ParsePointToState(point, offers, destinations);

    this._datepickerStart = null;
    this._datepickerEnd = null;

    this._rollupBtnClickHandler = this._rollupBtnClickHandler.bind(this);
    this._submitHandler = this._submitHandler.bind(this);
    this._changeTypeHandler = this._changeTypeHandler.bind(this);
    this._changeDestinationHandler = this._changeDestinationHandler.bind(this);
    this._changePriceHandler = this._changePriceHandler.bind(this);
    this._changeStartDateHandler = this._changeStartDateHandler.bind(this);
    this._changeEndDateHandler = this._changeEndDateHandler.bind(this);

    this._deleteClickHandler = this._deleteClickHandler.bind(this);
    this._saveClickHandler = this._saveClickHandler.bind(this);

    this.setInnerHandlers();
  }

  getTemplate() {
    return createPoint(this._state, this._new);
  }

  removeElement() {
    super.removeElement();
    if (this._datepickerStart) {
      this._datepickerStart.destroy();
      this._datepickerEnd.destroy();
      this._datepickerStart = null;
      this._datepickerEnd = null;
    }
  }

  resetState() {
    this.updateState(EditPoint.ParsePointToState(this._point, this._offers, this._destinations));
  }

  restoreHandlers() {
    this.setInnerHandlers();
    this.setSubmitHandler(this._callback.submit);
    this.setDeleteClickHandler(this._callback.deleteClick);
    this.setSaveClickHandler(this._callback.saveClick);
    if (!this._new) {
      this.setChangeViewHandler(this._callback.rollupBtnClick);
    }
  }

  setChangeViewHandler(cb) {
    this._callback.rollupBtnClick = cb;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._rollupBtnClickHandler);
  }

  setSubmitHandler(cb) {
    this._callback.submit = cb;
    this.getElement().querySelector('.event--edit').addEventListener('submit', this._submitHandler);
  }

  setDeleteClickHandler(cb) {
    this._callback.deleteClick = cb;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._deleteClickHandler);
  }

  setSaveClickHandler(cb) {
    this._callback.saveClick = cb;
    this.getElement().querySelector('.event__save-btn').addEventListener('click', this._saveClickHandler);
  }

  setInnerHandlers() {
    this._setChangeType();
    this._setChangeDestination();
    this._setChangePrice();
    this._setDatepickerStart();
    this._setDatepickerEnd();
  }

  _setChangeDestination() {
    this.getElement().querySelector('.event__input--destination').addEventListener('change', this._changeDestinationHandler);
  }

  _setChangeType() {
    this.getElement().querySelector('.event__type-group').addEventListener('click', this._changeTypeHandler);
  }

  _setChangePrice() {
    this.getElement().querySelector('.event__input--price').addEventListener('change', this._changePriceHandler);
  }

  _setDatepickerStart() {
    if (this._datepickerStart) {
      this._datepickerStart.destroy();
      this._datepickerStart = null;
    }

    this._datepickerStart = this._createFlatPicker('start', 'dateFrom', this._changeStartDateHandler);
  }

  _setDatepickerEnd() {
    if (this._datepickerEnd) {
      this._datepickerEnd.destroy();
      this._datepickerEnd = null;
    }

    this._datepickerEnd = this._createFlatPicker('end', 'dateTo', this._changeEndDateHandler);
  }

  _createFlatPicker(typePicker, field, onChange) {
    return flatpickr(
      this.getElement().querySelector(`.event__input--time[name="event-${typePicker}-time"]`),
      {
        dateFormat: DATE_FORMAT,
        defaultDate: this._state[field],
        onChange,
      },
    );
  }

  _getCheckedOffers() {
    const checkedOffers = Array.from(this.getElement().querySelectorAll('.event__offer-checkbox')).filter((offer) => offer.checked);
    const chosenOfferTitles = checkedOffers.map((offer) => offer.id.split(OFFER_SPLIT_ID)[1]);
    return this._state.serverOffers.filter((offer) => chosenOfferTitles.some((title) => title === offer.title));
  }

  _rollupBtnClickHandler(evt) {
    evt.preventDefault();
    this._callback.rollupBtnClick();
  }

  _submitHandler(evt) {
    evt.preventDefault();
    this._callback.rollupBtnClick();
  }

  _changeTypeHandler(evt) {
    const input = evt.target.closest('input');
    if (input) {
      const type = input.value;
      const offerObject = this._offers.find((offer) => offer.type === type);
      const serverOffers = offerObject ? offerObject.offers : [];
      this.updateState({
        type,
        serverOffers,
        hasOffers: serverOffers && serverOffers.length,
      });
    }
  }

  _changeDestinationHandler(evt) {
    evt.preventDefault();

    const cityName = evt.target.value;
    const isValid = this._destinations.some((dest) => dest.name === cityName);
    if (!isValid) {
      return;
    }

    const destination = this._destinations.find((serverDestination) => serverDestination.name === cityName);
    this.updateState({
      destination,
      offers: this._getCheckedOffers(),
    });
  }

  _changePriceHandler(evt) {
    evt.preventDefault();
    this.updateState({
      basePrice: parseInt(evt.target.value, 10) || 0,
    }, false);
  }

  _changeStartDateHandler([userDate]) {
    this.updateState({
      dateFrom: userDate,
    }, false);
  }

  _changeEndDateHandler([userDate]) {
    this.updateState({
      dateTo: userDate,
    }, false);
  }

  _deleteClickHandler(evt) {
    evt.target.textContent = 'Deleting...';
    evt.preventDefault();
    this._callback.deleteClick();
  }

  _saveClickHandler(evt) {
    evt.preventDefault();
    evt.target.textContent = 'Saving...';
    this.updateState({
      offers: this._getCheckedOffers(),
    }, false);
    this._callback.saveClick(EditPoint.ParseStateToPoint(this._state));
  }


  static ParsePointToState (point, offers, destinations) {
    const thatTypeOffers = getOffersByType(offers, point.type);
    return {
      ...point,
      hasOffers: thatTypeOffers && thatTypeOffers.length,
      hasDestination: point.destination && point.destination.description,
      serverOffers: thatTypeOffers,
      serverDestinations: destinations,
    };
  }

  static ParseStateToPoint (state) {
    delete state.hasOffers;
    delete state.hasDestination;
    delete state.serverOffers;
    delete state.serverDestinations;

    return state;
  }
}
