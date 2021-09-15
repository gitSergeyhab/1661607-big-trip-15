import AbstractObserver from './abstract-observer';
import { FilterType } from '../constants';

export default class FilterModel extends AbstractObserver {
  constructor() {
    super();
    this._filter = FilterType.EVERYTHING;
  }

  get filter() {
    return this._filter;
  }

  setFilter(updateType, filter) {
    this._filter = filter;
    this._notify(updateType, filter);
  }
}
