
import {render, remove} from '../utils/dom-utils';
import {Place } from '../constants';
import TripInfo from '../view/trip-info';


const countInArray = (arr, field) => arr.reduce((acc, item) =>  acc + (+item[field] || 0) , 0);


const countFullPrice = (data) => {
  const basePrice = countInArray(data, 'basePrice');
  const offersPrice = data.reduce((acc, item) => acc + (countInArray(item.offers, 'price') || 0), 0);
  return basePrice + offersPrice;
};

export default class TripInfoPresenter {
  constructor(container, pointsModel) {
    this._container = container;
    this._tripInfoComponent = null;
    this._pointsModel = pointsModel;


    this._renderTipInfo = this._renderTipInfo.bind(this);
    this._pointsModel.addObserver(this._renderTipInfo);

    this._renderTipInfo();
  }


  _renderTipInfo() {
    if (this._tripInfoComponent) {
      remove(this._tripInfoComponent);
    }

    this._tripInfoComponent = new TripInfo(countFullPrice(this._pointsModel.points));
    render(this._container, this._tripInfoComponent, Place.AFTER_BEGIN);
  }
}
