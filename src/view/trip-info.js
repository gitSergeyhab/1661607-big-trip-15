import Abstract from './abstract';

const JOIN_CITIES_SYMBOL = ' &mdash; ';


const createTripInfo = (price, cities, dates) => `
  <section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${cities.join(JOIN_CITIES_SYMBOL)}</h1>

      <p class="trip-info__dates">${dates}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${price}</span>
    </p>
  </section>`;

export default class TripInfo extends Abstract {
  constructor(price, cities, dates) {
    super();
    this._price = price;
    this._cities = cities;
    this._dates = dates;
  }

  getTemplate() {
    return createTripInfo(this._price, this._cities, this._dates);
  }
}
