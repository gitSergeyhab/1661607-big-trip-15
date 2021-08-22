import {Unsubscribe} from '../constants.js';
import Abstract from '../view/abstract.js';
import { Place } from '../constants.js';


const createOfferHtml = ({title, price, id}) => `
<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${id}" type="checkbox" name="event-offer-luggage" checked>
  <label class="event__offer-label" for="event-offer-luggage-${id}">
    <span class="event__offer-title">${title || Unsubscribe.MEDIUM}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${price || Unsubscribe.MEDIUM}</span>
  </label>
</div>`;

const createElement = (htmlText) => {
  const div = document.createElement('div');
  div.innerHTML = htmlText;
  return div.firstElementChild;
};

const render = (container, element, place = Place.BEFORE_END) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (element instanceof Abstract) {
    element = element.getElement();
  }

  container.insertAdjacentElement(place, element);
};

const replace = (newElement, oldElement) => {
  if (oldElement instanceof Abstract) {
    oldElement = oldElement.getElement();
  }

  if (newElement instanceof Abstract) {
    newElement = newElement.getElement();
  }

  const parent = oldElement.parentElement;

  if (parent === null || newElement === null || oldElement === null) {
    throw new Error('Can\'t replace unexisting elements');
  }

  parent.replaceChild(newElement, oldElement);
};

const remove = (component) => {
  if (!(component instanceof Abstract)) {
    throw new Error('Can remove only components');
  }

  component.getElement().remove();
  component.removeElement();
};


export {
  createOfferHtml,
  createElement,
  replace,
  render,
  remove
};
