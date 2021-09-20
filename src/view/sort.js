import Abstract from './abstract';
import {capitalize} from '../utils/util';


const SORT_TYPE_SPLIT = 'sort-';

const sortTypeValues = {
  DAY: {name: 'day', attribute: 'checked'},
  EVENT: {name: 'event', attribute: 'disabled'},
  TIME: {name: 'time', attribute: ''},
  PRICE: {name: 'price', attribute: ''},
  OFFERS: {name: 'offers', attribute: 'disabled'},
};


const createFilterItem = (sortType) => `<div class="trip-sort__item  trip-sort__item--${sortType.name}">
  <input id="sort-${sortType.name}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sortType.name}" ${sortType.attribute}>
  <label class="trip-sort__btn" for="sort-${sortType.name}">${capitalize(sortType.name)}</label>
</div>`;

const createSort = () => `
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  ${Object.values(sortTypeValues).map((createFilterItem)).join('\n')}
  </form>`;

export default class Sort extends Abstract {
  constructor() {
    super();
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSort();
  }

  setChangeTypeHandler(cb) {
    this._callback.changeType = cb;
    this.getElement().addEventListener('change', this._sortTypeChangeHandler);
  }

  _sortTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.changeType(evt.target.value.split(SORT_TYPE_SPLIT)[1]);
  }
}
