import Abstract from './abstract';
import {getNotImplementedError} from '../utils/util';


export default class Smart extends Abstract {
  restoreHandlers() {
    getNotImplementedError('restoreHandlers');
  }

  updateElement() {
    const oldElement = this.getElement();
    const parent = oldElement.parentElement;
    this.removeElement();
    const newElement = this.getElement();
    parent.replaceChild(newElement, oldElement);

    this.restoreHandlers();
  }

  updateState(update, resetElement = true) {
    if (!update) {
      return;
    }

    this._state = {...this._state, ...update};

    if (resetElement) {
      this.updateElement();
    }
  }
}
