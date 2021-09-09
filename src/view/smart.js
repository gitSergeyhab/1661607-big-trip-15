import { getNotImplementedError } from '../utils/util';
import Abstract from './abstract';


export default class Smart extends Abstract {
  restoreHandlers() {
    getNotImplementedError('getTemplate');
  }

  updateElement() {
    const oldElement = this.getElement();
    const parent = oldElement.parentElement;
    this.removeElement();
    const newElement = this.getElement();
    parent.replaceChild(newElement, oldElement);

    this.restoreHandlers();
  }

  updateState(update) {
    if (!update) {
      return;
    }

    this._state = Object.assign({}, this._state, update);
    this.updateElement();
  }
}
