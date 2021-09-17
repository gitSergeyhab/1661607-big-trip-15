import Abstract from './abstract';
import { capitalize } from '../utils/util';
import { FilterType } from '../constants';

const filterItem = (filterType) => `<div class="trip-filters__filter">
  <input id="filter-${filterType}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filterType}" ${filterType === FilterType.EVERYTHING ? 'checked': ''} >
  <label class="trip-filters__filter-label" for="filter-${filterType}">${capitalize(filterType)}</label>
</div>`;

const createFilterTemplate = () => `
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
    return createFilterTemplate();
  }

  toggle(disabled) {
    this.getElement().querySelectorAll('.trip-filters__filter-input').forEach((input) => input.disabled = disabled);
  }

  setNeedFilter(currentFilter) {
    this.getElement().querySelectorAll('.trip-filters__filter-input').forEach((input) => input.checked = currentFilter === input.value);
  }


  setChangeFilterHandler(cb) {
    this._callback.changeFilter = cb;
    this.getElement().addEventListener('change', this._changeFilterHandler);
  }

  _changeFilterHandler(evt) {
    evt.preventDefault();
    this._callback.changeFilter(evt.target.value);
  }
}
