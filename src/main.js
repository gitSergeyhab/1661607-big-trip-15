import TripInfo from './view/trip-info.js';
import Menu from './view/menu.js';
import Stats from './view/stats.js';
import Filter from './view/filter.js';
import TripPresenter from './presenter/trip.js';
import FilterPresenter from './presenter/filter-presenter.js';

import {createMockPoint, POINTS, OFFERS, DESTINATIONS, parseToClient} from './mock-data.js';
import {getRandomInt} from './utils/util.js';
import {remove, render} from './utils/dom-utils.js';
import {Place, MenuItem} from './constants.js';

import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
import FilterModel from './model/filter-model.js';
import dayjs from 'dayjs';


// const points = new Array(getRandomInt(0,1)).fill().map(createMockPoint);
// const points = new Array(getRandomInt(3,6)).fill().map(createMockPoint);

const points = POINTS.map(parseToClient);
console.log('POINTS', POINTS)
console.log('OFFERS', OFFERS)
console.log('DESTINATIONS', DESTINATIONS)


const pointsModel = new PointsModel();
pointsModel.setPoints(points);

const offersModel = new OffersModel();
offersModel.setOffers(OFFERS);

const destinationsModel = new DestinationsModel();
destinationsModel.setDestination(DESTINATIONS);

const filterModel = new FilterModel();


const header = document.querySelector('header.page-header');
const main = document.querySelector('main.page-main');

const tripMain = header.querySelector('.trip-main');

render(tripMain, new TripInfo(points), Place.AFTER_BEGIN);

const btnAddNewEvent = document.querySelector('.trip-main__event-add-btn');


const filterContainer = tripMain.querySelector('.trip-controls__filters');
const filterPresenter = new FilterPresenter(filterContainer, filterModel);
filterPresenter.init();

const tripEventsSection = main.querySelector('.trip-events');

const tripPresenter = new TripPresenter(tripEventsSection, pointsModel, filterModel,  offersModel.offers, destinationsModel.destinations);
tripPresenter.init();

const AUTHORIZATION = 'Basic !DEATH_METAL!_';
const BASIC_URL = 'https://15.ecmascript.pages.academy/big-trip/';

// fetch(`${BASIC_URL}/points`, {headers: {Authorization: AUTHORIZATION}})
//   .then((res) => res.json()).then((res) => console.log(res)).then(() => console.log('points________________________'))

// fetch(`${BASIC_URL}/destinations`, {headers: {Authorization: AUTHORIZATION}})
//   .then((res) => res.json()).then((res) => console.log(res)).then(() => console.log('destinations________________________'))

// fetch(`${BASIC_URL}/offers`, {headers: {Authorization: AUTHORIZATION}})
//   .then((res) => res.json()).then((res) => console.log(res)).then(() => console.log('offers________________________'))


let statsComponent = null;
const handleMenuClick = (menuItem) => {
  switch(menuItem) {
    case MenuItem.STATS:
      btnAddNewEvent.disabled = true;
      tripPresenter.hide();
      statsComponent = new Stats(points);
      render(main, statsComponent);
      break;
    case MenuItem.TABLE:
      btnAddNewEvent.disabled = false;
      remove(statsComponent);
      tripPresenter.show();
  }
};


const menuContainer = tripMain.querySelector('.trip-controls__navigation');
const menuComponent = new Menu();
render(menuContainer, menuComponent);
menuComponent.setMenuClickHandler(handleMenuClick);
