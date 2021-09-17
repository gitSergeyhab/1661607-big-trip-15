// import TripInfo from './view/trip-info.js';
import Menu from './view/menu.js';
import Stats from './view/stats.js';
import TripPresenter from './presenter/trip.js';
import FilterPresenter from './presenter/filter-presenter.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';

import {createMockPoint, POINTS, OFFERS, DESTINATIONS, parseToClient} from './mock-data.js';
import {remove, render} from './utils/dom-utils.js';
import {Place, MenuItem, UpdateType} from './constants.js';

import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
import FilterModel from './model/filter-model.js';
import Api from './api/api.js';


const AUTHORIZATION = 'Basic !DEATH_METAL!_';
const BASIC_URL = 'https://15.ecmascript.pages.academy/big-trip/';
const api = new Api(BASIC_URL, AUTHORIZATION);


const pointsModel = new PointsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const filterModel = new FilterModel();


const header = document.querySelector('header.page-header');
const main = document.querySelector('main.page-main');
const tripMain = header.querySelector('.trip-main');
const btnAddNewEvent = document.querySelector('.trip-main__event-add-btn');


new TripInfoPresenter(tripMain, pointsModel);

const filterContainer = tripMain.querySelector('.trip-controls__filters');
const filterPresenter = new FilterPresenter(filterContainer, filterModel);
filterPresenter.init();

const tripEventsSection = main.querySelector('.trip-events');

let tripPresenter;
let statsComponent = null;
const handleMenuClick = (menuItem) => {
  switch(menuItem) {
    case MenuItem.STATS:
      btnAddNewEvent.disabled = true;
      tripPresenter.hide();
      filterPresenter.toggle(true);
      statsComponent = new Stats(pointsModel.points);
      render(main, statsComponent);
      break;
    case MenuItem.TABLE:
      btnAddNewEvent.disabled = false;
      remove(statsComponent);
      tripPresenter.show();
      filterPresenter.toggle(false);
  }
};


const menuContainer = tripMain.querySelector('.trip-controls__navigation');
const menuComponent = new Menu();
render(menuContainer, menuComponent);
menuComponent.setMenuClickHandler(handleMenuClick);


const promiseOffersAndDestinations = Promise.all([api.getOffers(), api.getDestinations()]).then((response) => {
  offersModel.setOffers(response[0]);
  destinationsModel.setDestination(response[1]);
});



promiseOffersAndDestinations
  .then(() => {
    tripPresenter = new TripPresenter(tripEventsSection, pointsModel, filterModel, offersModel.offers, destinationsModel.destinations, api);
  })
  .then(() => {
    api.getPoints()
      .then((points) => {
        pointsModel.setPoints(UpdateType.INIT, points);
      })
      .catch(() => {
        pointsModel.setPoints(UpdateType.INIT, []);
      });
  });

