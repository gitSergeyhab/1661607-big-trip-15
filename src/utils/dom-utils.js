import {Unsubscribe} from '../constants.js';

const createOfferHtml = ({title, price, id}) => `
<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${id}" type="checkbox" name="event-offer-luggage" checked>
  <label class="event__offer-label" for="event-offer-luggage-${id}">
    <span class="event__offer-title">${title || Unsubscribe.MEDIUM}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${price || Unsubscribe.MEDIUM}</span>
  </label>
</div>`;

export {createOfferHtml};
