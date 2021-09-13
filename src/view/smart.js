import { getNotImplementedError } from '../utils/util';
import Abstract from './abstract';


export default class Smart extends Abstract {
  restoreHandlers() {
    getNotImplementedError('restoreHandlers');
  }

  updateElement() {
    const oldElement = this.getElement();
    const parent = oldElement.parentElement;
    this.removeElement();
    const newElement = this.getElement();
    // console.log(newElement)
    parent.replaceChild(newElement, oldElement);

    this.restoreHandlers();
  }

  updateState(update, resetElement = true) {
    if (!update) {
      return;
    }

    // this._state = Object.assign({}, this._state, update);
    this._state = {...this._state, ...update};

    if (resetElement) {
      this.updateElement();
    }
  }
}
