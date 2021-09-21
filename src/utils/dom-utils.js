import Abstract from '../view/abstract.js';
import {Place} from '../constants.js';


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

  if (parent === null || newElement === null) {
    throw new Error('Can\'t replace unexisting elements');
  }

  parent.replaceChild(newElement, oldElement);
};

const remove = (component) => {
  if (component === null) {
    return;
  }

  if (!(component instanceof Abstract)) {
    throw new Error('Can remove only components');
  }

  component.getElement().remove();
  component.removeElement();
};


export {
  createElement,
  replace,
  render,
  remove
};
