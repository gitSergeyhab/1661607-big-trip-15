import {getNotImplementedError} from '../utils/util.js';
import {createElement} from '../utils/dom-utils.js';


const SHAKE_ANIMATION_TIMEOUT = 600;

export default class Abstract{
  constructor() {
    if (new.target === Abstract) {
      throw new Error('Can\'t instantiate Abstract, only concrete one.');
    }
    this._callback = {};
    this._element = null;
  }

  getTemplate() {
    getNotImplementedError('getTemplate');
  }

  getElement() {
    if(!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement(){
    this._element = null;
  }

  shake(cb) {
    this.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    setTimeout(() => {
      this.getElement().style.animation = '';
      cb();
    }, SHAKE_ANIMATION_TIMEOUT);
  }
}
