import Abstract from './abstract';
import { capitalize } from '../utils/util';
import { FilterType } from '../constants';
import { filter } from '../utils/filter';

const filterItem = (filterType) => `<div class="trip-filters__filter">
  <input id="filter-${filterType}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filterType}" ${filterType === FilterType.EVERYTHING ? 'checked': ''} >
  <label class="trip-filters__filter-label" for="filter-${filterType}">${capitalize(filterType)}</label>
</div>`;

const createFilters = () => `
  <form class="trip-filters" action="#" method="get">
    ${Object.values(FilterType).map(filterItem).join('\n')}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;

export default class Filter extends Abstract {
  constructor() {
    super();

    this._changeFilterHandler = this._changeFilterHandler.bind(this);
  }

  getTemplate() {
    return createFilters();
  }

  setChangeFilterHandler(cb) {
    this._callback.changeFilter = cb;
    this.getElement().addEventListener('change', this._changeFilterHandler);
  }

  _changeFilterHandler(evt) {
    console.log(evt.target.value)
    evt.preventDefault();
    this._callback.changeFilter(evt.target.value);
  }
}
