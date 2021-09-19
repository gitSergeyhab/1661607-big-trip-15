import {renderList, capitalize} from '../utils/util.js';
import {getFullDateTime} from '../utils/data-time-utils.js';
import Smart from './smart.js';

import flatpickr from 'flatpickr';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const DATE_FORMAT = 'd/m/y H:i';
const OFFER_SPLIT_ID = 'event-offer-luggage-';
const ERROR_INPUT_DESTINATION_MESSAGE = 'Chose city from list!';

const DateField = {
  FROM: 'dateFrom',
  TO: 'dateTo',
};

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

const DateSelector = {
  START: '.event__input--time[name="event-start-time"]',
  END: '.event__input--time[name="event-end-time"]',
};

const disable = (isDisabled) => isDisabled ? 'disabled' : '';
const renderCancelBtn = (isDisabled) => `<button class="event__reset-btn" type="reset" ${disable(isDisabled)}>Cancel</button>`;
const renderDeleteBtn = (isDeleting, isDisabled) => `<button class="event__reset-btn" type="reset" ${disable(isDisabled)}>${isDeleting ? 'Deleting...' : 'Delete'}</button>`;

const getOffersByType = (offers, type) => offers.find((offer) => offer.type === type).offers;

const createTypeItem = (type, chosenType, isDisabled) => `<div class="event__type-item">
  <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${type === chosenType ? 'checked' : ''} ${disable(isDisabled)}>
  <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${capitalize(type)}</label>
</div>`;

const createEventTypeList = (chosenType, isDisabled) => Object.values(PointType).map((type) => createTypeItem(type, chosenType, isDisabled)).join('\n');


const getCityNames = (destinations) => destinations.map((item) => (`<option value="${item.name}"></option>`)).join('\n');

const createRollupBtn = (isNewPoint, isDisabled) => isNewPoint ? '' : `<button class="event__rollup-btn" type="button" ${disable(isDisabled)}>
    <span class="visually-hidden">Open event</span>
  </button>`;


const crateEventPhoto = (picture) => `<img class="event__photo" src="${picture.src}" alt="Event photo"></img>`;

const isChosenOffer = (serverOffer, offers) => offers.some((offer) => offer.title === serverOffer.title);

const createOfferHtml = (serverOffer, offers, isDisabled) => `
<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden"
    id="event-offer-luggage-${serverOffer.title}"
    type="checkbox" name="event-offer-luggage"
    ${isChosenOffer(serverOffer, offers) ? 'checked' : ''} ${disable(isDisabled)}>
  <label class="event__offer-label" for="event-offer-luggage-${serverOffer.title}">
    <span class="event__offer-title">${serverOffer.title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${serverOffer.price}</span>
  </label>
</div>`;

const renderOffers = (offers, serverOffers, isDisabled) => serverOffers.map((serverOffer) => createOfferHtml(serverOffer, offers, isDisabled)).join('\n');

const createOffersContainer = (offers, serverOffers, isDisabled) => `<section class="event__section  event__section--offers">
  <h3 class="event__section-title  event__section-title--offers">Offers</h3>
  <div class="event__available-offers">${renderOffers(offers, serverOffers, isDisabled)}</div>
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


const createPoint =  ({id, basePrice, dateFrom, dateTo, destination, offers, type, hasOffers, hasDestination, serverOffers, serverDestinations, isSaving, isDeleting, isDisabled}, isNewPoint) => `
<li class="trip-events__item" data-id=${id}>
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${disable(isDisabled)}>

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${createEventTypeList(type, isDisabled)}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-${id}">
          ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${destination.name}" list="destination-list-${id}" ${disable(isDisabled)}>
        <datalist id="destination-list-${id}">
          ${getCityNames(serverDestinations)}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-${id}">From</label>
        <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${getFullDateTime(dateFrom)}" ${disable(isDisabled)}>
        &mdash;
        <label class="visually-hidden" for="event-end-time-${id}">To</label>
        <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${getFullDateTime(dateTo)}" ${disable(isDisabled)}>
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-${id}" type="number" min="0" name="event-price" value=${basePrice} ${disable(isDisabled)}>
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit" ${disable(isDisabled)}> ${isSaving ? 'Saving...' : 'Save'}</button>
      ${isNewPoint ? renderCancelBtn(isDisabled) : renderDeleteBtn(isDeleting, isDisabled)}
      ${createRollupBtn(isNewPoint, isDisabled)}

    </header>
    <section class="event__details">
      ${hasOffers ? createOffersContainer(offers, serverOffers, isDisabled) : ''}
      ${hasDestination ? createDestination(destination) : ''}
    </section>
  </form>
</li>`;


export default class EditPoint extends Smart {
  constructor(point, offers, destinations, isNewPoint) {
    super();
    this._point = point;
    this._offers = offers;
    this._destinations = destinations;
    this._isNewPoint = isNewPoint;
    this._state = EditPoint.ParsePointToState(point, offers, destinations);

    this._datepickerStart = null;
    this._datepickerEnd = null;

    this._rollupBtnClickHandler = this._rollupBtnClickHandler.bind(this);

    this._changeTypeHandler = this._changeTypeHandler.bind(this);
    this._changeDestinationHandler = this._changeDestinationHandler.bind(this);
    this._changePriceHandler = this._changePriceHandler.bind(this);
    this._changeStartDateHandler = this._changeStartDateHandler.bind(this);
    this._changeEndDateHandler = this._changeEndDateHandler.bind(this);

    this._submitHandler = this._submitHandler.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);

    this.setInnerHandlers();
  }

  getTemplate() {
    return createPoint(this._state, this._isNewPoint);
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
    if (!this._isNewPoint) {
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

    const dateLimit = {maxDate: this.getElement().querySelector(DateSelector.END).value};
    this._datepickerStart = this._createFlatPicker(DateSelector.START, DateField.FROM, this._changeStartDateHandler, dateLimit);
  }

  _setDatepickerEnd() {
    if (this._datepickerEnd) {
      this._datepickerEnd.destroy();
      this._datepickerEnd = null;
    }

    const dateLimit = {minDate: this.getElement().querySelector(DateSelector.START).value};
    this._datepickerEnd = this._createFlatPicker(DateSelector.END, DateField.TO, this._changeEndDateHandler, dateLimit);
  }

  _createFlatPicker(dateSelector, field, onChange, dateLimit) {
    return flatpickr(
      this.getElement().querySelector(dateSelector),
      {
        dateFormat: DATE_FORMAT,
        defaultDate: this._state[field],
        enableTime: true,
        'time_24hr': true,
        ...dateLimit,
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
    this.updateState({
      offers: this._getCheckedOffers(),
    }, false);
    this._callback.submit(EditPoint.ParseStateToPoint(this._state));
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
    const target = evt.target;
    const cityName = target.value;
    const isValid = this._destinations.some((dest) => dest.name === cityName);
    if (!isValid) {
      target.setCustomValidity(ERROR_INPUT_DESTINATION_MESSAGE);
    } else {
      target.setCustomValidity('');
    }
    target.reportValidity();


    const destination = this._destinations.find((serverDestination) => serverDestination.name === cityName);
    if (destination) {
      this.updateState({
        destination,
        offers: this._getCheckedOffers(),
      });
    }
  }

  _changePriceHandler(evt) {
    evt.preventDefault();
    const target = evt.target;
    this.updateState({
      basePrice: +target.value,
    }, false);
  }

  _changeStartDateHandler([userDate]) {
    this.updateState({
      dateFrom: userDate,
    });
  }

  _changeEndDateHandler([userDate]) {
    this.updateState({
      dateTo: userDate,
    });
  }

  _deleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick();
  }


  static ParsePointToState (point, offers, destinations) {
    const thatTypeOffers = getOffersByType(offers, point.type);
    return {
      ...point,
      hasOffers: thatTypeOffers && thatTypeOffers.length,
      hasDestination: point.destination && point.destination.description,
      serverOffers: thatTypeOffers,
      serverDestinations: destinations,
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
  }

  static ParseStateToPoint (state) {
    const stateClone = {...state};

    delete stateClone.hasOffers;
    delete stateClone.hasDestination;
    delete stateClone.serverOffers;
    delete stateClone.serverDestinations;

    delete stateClone.isDisabled;
    delete stateClone.isSaving;
    delete stateClone.isDeleting;

    return stateClone;
  }
}
