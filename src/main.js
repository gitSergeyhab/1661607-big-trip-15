import TripInfo from './view/trip-info.js';
import Menu from './view/menu.js';
import Filter from './view/filter.js';
import TripPresenter from './presenter/trip.js';

import {createMockPoint, POINTS, OFFERS, DESTINATIONS, parseToClient} from './mock-data.js';
import {getRandomInt} from './utils/util.js';
import {render} from './utils/dom-utils.js';
import {Place} from './constants.js';

import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';


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


const header = document.querySelector('header.page-header');
const main = document.querySelector('main.page-main');

const tripMain = header.querySelector('.trip-main');

render(tripMain, new TripInfo(points), Place.AFTER_BEGIN);

const menu = tripMain.querySelector('.trip-controls__navigation');
render(menu, new Menu());

const filter = tripMain.querySelector('.trip-controls__filters');
render(filter, new Filter());

const tripEventsSection = main.querySelector('.trip-events');

const tripPresenter = new TripPresenter(tripEventsSection, pointsModel, offersModel.offers, destinationsModel.destinations);
tripPresenter.init();

const AUTHORIZATION = 'Basic !DEATH_METAL!_';
const BASIC_URL = 'https://15.ecmascript.pages.academy/big-trip/';

// fetch(`${BASIC_URL}/points`, {headers: {Authorization: AUTHORIZATION}})
//   .then((res) => res.json()).then((res) => console.log(res)).then(() => console.log('points________________________'))

// fetch(`${BASIC_URL}/destinations`, {headers: {Authorization: AUTHORIZATION}})
//   .then((res) => res.json()).then((res) => console.log(res)).then(() => console.log('destinations________________________'))

// fetch(`${BASIC_URL}/offers`, {headers: {Authorization: AUTHORIZATION}})
//   .then((res) => res.json()).then((res) => console.log(res)).then(() => console.log('offers________________________'))


