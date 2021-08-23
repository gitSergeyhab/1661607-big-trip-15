/* eslint-disable camelcase*/
import {Unsubscribe} from '../constants.js';
import {renderList} from '../utils/util.js';
// import {createOfferHtml} from '../utils/dom-utils.js';
import {getFullDadeTime} from '../utils/data-time-utils.js';
import Abstract from './abstract.js';

const createEditBtn = (newPoint) => newPoint ? '' : `<button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>`;


const crateEventPhoto = (picture) => `<img class="event__photo" src="${picture.src}" alt="Event photo"></img>`;

const createOfferHtml = ({title, price, id}) => `
<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${id}" type="checkbox" name="event-offer-luggage" checked>
  <label class="event__offer-label" for="event-offer-luggage-${id}">
    <span class="event__offer-title">${title || Unsubscribe.MEDIUM}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${price || Unsubscribe.MEDIUM}</span>
  </label>
</div>`;

const createPhotoSection = (pictures) => `
  <div class="event__photos-container">
    <div class="event__photos-tape">
      ${renderList(pictures || [], crateEventPhoto)}
    </div>
  </div>`;

const createDestination = (destination, newPoint) => !destination ? '' : `
  <section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destination.description}</p>
    ${newPoint ? createPhotoSection(destination.pictures) : ''}
  </section>`;


const createPoint =  ({id, basePrice, dateFrom, dateTo, destination, offers, type}, newPoint) => `
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

            <div class="event__type-item">
              <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
              <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
              <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
              <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
              <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
              <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
              <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
              <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
              <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
              <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
              <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
            </div>
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-${id}">
          ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-${id}}" type="text" name="event-destination" value=${destination ? destination.name : Unsubscribe.MEDIUM} list="destination-list-1">
        <datalist id="destination-list-${id}">
          <option value="Amsterdam"></option>
          <option value="Geneva"></option>
          <option value="Chamonix"></option>
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-${id}">From</label>
        <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${getFullDadeTime(dateFrom)}"}>
        &mdash;
        <label class="visually-hidden" for="event-end-time-${id}">To</label>
        <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${getFullDadeTime(dateTo)}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value=${basePrice}>
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Cancel</button>

      ${createEditBtn(newPoint)}

    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
        ${renderList(offers, createOfferHtml)}
        </div>
      </section>
      ${createDestination(destination, newPoint)}
    </section>
  </form>
</li>`;


export default class EditPoint extends Abstract {
  constructor(data, newPoint) {
    super();
    this._data = data;
    this._new = newPoint;

    this._rollupBtnClickHandler = this._rollupBtnClickHandler.bind(this);
    this._submitHandler = this._submitHandler.bind(this);

  }

  _getTemplate() {
    return createPoint(this._data, this._new);
  }

  _rollupBtnClickHandler(evt) {
    evt.preventDefault();
    this._callback.rollupBtnClick();
  }

  _submitHandler(evt) {
    evt.preventDefault();
    this._callback.rollupBtnClick();
  }

  setChangeViewHandler(cb) {
    this._callback.rollupBtnClick = cb;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._rollupBtnClickHandler);
  }

  setSubmitHandler(cb) {
    this._callback.submit = cb;
    this.getElement().querySelector('.event--edit').addEventListener('submit', this._submitHandler);
  }
}
