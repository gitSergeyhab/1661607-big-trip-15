import AbstractObserver from './abstract-observer';

export default class DestinationsModel extends AbstractObserver {
  constructor() {
    super();
    this._destinations = [];
  }

  get destinations() {
    return this._destinations;
  }

  setDestination(destinations) {
    this._destinations = destinations;
  }
}
