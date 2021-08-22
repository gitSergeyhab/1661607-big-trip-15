import Abstract from './abstract';

const countInArray = (arr, field) => arr.reduce((acc, item) =>  acc + (+item[field] || 0) , 0);


const countFullPrice = (data) => {
  const basePrice = countInArray(data, 'base_price');
  const offersPrice = data.reduce((acc, item) => acc + (countInArray(item.offers, 'price') || 0), 0);
  return basePrice + offersPrice;
};

const createTripInfo = (data) => `
  <section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>

      <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${countFullPrice(data)}</span>
    </p>
  </section>`;


export default class TripInfo extends Abstract {
  constructor(data) {
    super();
    this._data = data;
  }

  _getTemplate() {
    return createTripInfo(this._data);
  }
}
