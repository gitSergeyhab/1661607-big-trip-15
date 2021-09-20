import Filter from '../view/filter';
import {UpdateType} from '../constants';
import {render, remove} from '../utils/dom-utils';


export default class FilterPresenter {
  constructor(container, filterModel) {
    this._container = container;
    this._filterModel = filterModel;
    this._filterComponent = null;

    this._handleFilterChange = this._handleFilterChange.bind(this);
    this._toggleRadio = this._toggleRadio.bind(this);

    this._filterModel.addObserver(this._toggleRadio);
  }

  init() {
    this._renderFilter();
  }

  toggle(disabled) {
    if (this._filterComponent) {
      this._filterComponent.toggle(disabled);
    }
  }

  _renderFilter() {
    if (this._filterComponent) {
      remove(this._filterComponent);
      this._filterComponent = null;
    }

    this._filterComponent = new Filter();
    render(this._container, this._filterComponent);
    this._filterComponent.setChangeFilterHandler(this._handleFilterChange);
  }

  _toggleRadio() {
    this._filterComponent.setNeedFilter(this._filterModel.filter);
  }

  _handleFilterChange(chosenFilter) {
    this._filterModel.setFilter(UpdateType.MAJOR, chosenFilter);
  }
}
