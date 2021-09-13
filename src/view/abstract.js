import {getNotImplementedError} from '../utils/util.js';
import {createElement} from '../utils/dom-utils.js';


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
}
