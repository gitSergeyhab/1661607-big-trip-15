/* eslint-disable camelcase*/
import {getHoursAndMinutes, getDiffTime, getMonthAndDay, renderList, Unsubscribe} from '../util.js';


const createOfferLi = ({title, price}) => `
  <li class="event__offer">
    <span class="event__offer-title">${title || Unsubscribe.SHORT}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${price || Unsubscribe.SHORT}</span>
  </li>`;

const addFavoriteClass = (ok = false) => ok ? 'event__favorite-btn--active' : '';

export const createEvent = ({base_price, destination__name, date_from, date_to, offers, is_favorite}) => `
  <li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="2019-03-18">${getMonthAndDay(date_from)}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/taxi.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${destination__name || Unsubscribe.LONG}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="2019-03-18T10:30">${getHoursAndMinutes(date_from)}</time>
          &mdash;
          <time class="event__end-time" datetime="2019-03-18T11:00">${getHoursAndMinutes(date_to)}</time>
        </p>
        <p class="event__duration">${getDiffTime(date_from, date_to)}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${base_price || Unsubscribe.SHORT}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${renderList(offers, createOfferLi)}
      </ul>

      <button class="event__favorite-btn ${addFavoriteClass(is_favorite)}" type="button">
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
