
import { render, remove } from '../utils/dom-utils';
import Filter from '../view/filter';
import { UpdateType } from '../constants';

export default class FilterPresenter {
  constructor(container, filterModel) {
    this._container = container;
    this._filterModel = filterModel;
    this._filterComponent = null;

    this._handleFilterChange = this._handleFilterChange.bind(this);
  }

  init() {
    this._renderFilter();
    // console.log(this._filterModel)
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

  _handleFilterChange(chosenFilter) {
    this._filterModel.setFilter(UpdateType.MINOR, chosenFilter);
    // console.log(this._filterModel)
  }
}
