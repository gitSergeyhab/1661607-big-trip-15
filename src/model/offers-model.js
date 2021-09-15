import AbstractObserver from './abstract-observer';

export default class OffersModel extends AbstractObserver {
  constructor() {
    super();
    this._offers = [];
  }

  get offers() {
    return this._offers;
  }

  setOffers(offers) {
    this._offers = offers;
  }
}
