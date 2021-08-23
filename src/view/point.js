/* eslint-disable camelcase*/
import {Unsubscribe} from '../constants.js';
import {renderList} from '../utils/util.js';
import {getHoursAndMinutes, getDiffTime, getMonthAndDay} from '../utils/data-time-utils.js';
import Abstract from './abstract.js';


const createOfferLi = ({title, price}) => `
  <li class="event__offer">
    <span class="event__offer-title">${title || Unsubscribe.SHORT}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${price || Unsubscribe.SHORT}</span>
  </li>`;

const addFavoriteClass = (ok = false) => ok ? 'event__favorite-btn--active' : '';

const createEvent = ({basePrice, destination, dateFrom, dateTo, offers, isFavorite}) => `
  <li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="2019-03-18">${getMonthAndDay(dateFrom)}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/taxi.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${destination ? destination.name : Unsubscribe.LONG}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="2019-03-18T10:30">${getHoursAndMinutes(dateFrom)}</time>
          &mdash;
          <time class="event__end-time" datetime="2019-03-18T11:00">${getHoursAndMinutes(dateTo)}</time>
        </p>
        <p class="event__duration">${getDiffTime(dateFrom, dateTo)}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice || Unsubscribe.SHORT}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${renderList(offers, createOfferLi)}
      </ul>

      <button class="event__favorite-btn ${addFavoriteClass(isFavorite)}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;

export default class Point extends Abstract {
  constructor(data) {
    super();
    this._data = data;

    this._rollupBtnClickHandler = this._rollupBtnClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  _getTemplate() {
    return createEvent(this._data);
  }

  _rollupBtnClickHandler(evt) {
    evt.preventDefault();
    this._callback.rollupBtnClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.clickFavorite();
    this.getElement().querySelector('.event__favorite-btn ').classList.toggle('event__favorite-btn--active');
  }

  setChangeViewHandler(cb) {
    this._callback.rollupBtnClick = cb;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._rollupBtnClickHandler);
  }

  setFavoriteClickHandler(cb) {
    this._callback.clickFavorite = cb;
    this.getElement().querySelector('.event__favorite-btn ').addEventListener('click', this._favoriteClickHandler);
  }
}
