import dayjs from 'dayjs';

import TripInfo from '../view/trip-info';

import {sorByDay} from '../utils/util';
import {render, remove} from '../utils/dom-utils';
import {Place} from '../constants';


const LOADING_MESSAGE = 'loading...';
const TOO_MANY_CITIES_SYMBOL = '...' ;
const BETWEEN_DATE_SYMBOL = '&nbsp;&mdash;&nbsp;';
const DateFormat = {
  DAY_MONTH: 'D MMM',
  MONTH: 'MMM',
  DAY: 'D',
};

const PriceField = {
  BASE_PRICE: 'basePrice',
  OFFER_PRICE: 'price',
};

const countInArray = (arr, field) => arr.reduce((acc, item) =>  acc + (+item[field] || 0) , 0); // считает сумму по указанным полям в массиве

const getDayAndMonth = (date) => dayjs(date).format(DateFormat.DAY_MONTH);
const getMonth = (date) => dayjs(date).format(DateFormat.MONTH);
const getDay = (date) => dayjs(date).format(DateFormat.DAY);

const countFullPrice = (data) => {
  const basePrice = countInArray(data, PriceField.BASE_PRICE);
  const offersPrice = data.reduce((acc, item) => acc + (countInArray(item.offers, PriceField.OFFER_PRICE) || 0), 0);
  return basePrice + offersPrice;
};

const getCityName = (point) => point.destination.name;

const createCitiesArray = (points) => {
  if (!points.length) {
    return [LOADING_MESSAGE];
  }

  return points.length > 2 ? [getCityName(points[0]), TOO_MANY_CITIES_SYMBOL, getCityName(points[points.length - 1])] : points.map(getCityName);
};

const getStartFinishDates = (points) => {
  if (!points.length) {
    return LOADING_MESSAGE;
  }

  if (getDayAndMonth(points[0].dateFrom) === getDayAndMonth(points[points.length - 1].dateTo)) {
    return getDayAndMonth(points[0].dateFrom);
  }

  if (getMonth(points[0].dateFrom) === getMonth(points[points.length - 1].dateTo)) {
    return `${getDay(points[0].dateFrom)} ${BETWEEN_DATE_SYMBOL} ${getDay(points[points.length - 1].dateTo)} ${getMonth(points[0].dateFrom)}`;
  }

  return `${getDayAndMonth(points[0].dateFrom)} ${BETWEEN_DATE_SYMBOL} ${getDayAndMonth(points[points.length - 1].dateTo)}`;
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

  _getPoints() {
    return this._pointsModel.points.slice().sort(sorByDay);
  }


  _renderTipInfo() {
    if (this._tripInfoComponent) {
      remove(this._tripInfoComponent);
    }

    this._tripInfoComponent = new TripInfo(
      countFullPrice(this._getPoints()),
      createCitiesArray(this._getPoints()),
      getStartFinishDates(this._getPoints()),
    );
    render(this._container, this._tripInfoComponent, Place.AFTER_BEGIN);
  }
}
