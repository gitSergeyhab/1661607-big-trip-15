import TripPresenter from './presenter/trip.js';
import FilterPresenter from './presenter/filter-presenter.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';

import Menu from './view/menu.js';
import Stats from './view/stats.js';

import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
import FilterModel from './model/filter-model.js';

import Api from './api/api.js';
import Store from './api/store.js';
import Provider from './api/provider.js';

import {remove, render} from './utils/dom-utils.js';
import {isOnline, notifyNetStatus } from './utils/util.js';
import {MenuItem, UpdateType} from './constants.js';


const StoreName = {
  POINTS: 'points',
  OFFERS: 'offers',
  DESTINATIONS: 'destinations',
};

const AUTHORIZATION = 'Basic _!DEATH_METAL!';
const BASIC_URL = 'https://15.ecmascript.pages.academy/big-trip/';
const STORE_PREFIX = 'big-trip-storage';
const STORE_VER = 'v15';
const StoreKey = {
  POINTS: `${STORE_PREFIX}-${StoreName.POINTS}-${STORE_VER}`,
  OFFERS: `${STORE_PREFIX}-${StoreName.OFFERS}-${STORE_VER}`,
  DESTINATIONS: `${STORE_PREFIX}-${StoreName.DESTINATIONS}-${STORE_VER}`,
};

const header = document.querySelector('header.page-header');
const main = document.querySelector('main.page-main');
const tripMain = header.querySelector('.trip-main');
const btnAddNewEvent = document.querySelector('.trip-main__event-add-btn');
const menuContainer = tripMain.querySelector('.trip-controls__navigation');
const filterContainer = tripMain.querySelector('.trip-controls__filters');
const tripEventsSection = main.querySelector('.trip-events');

const api = new Api(BASIC_URL, AUTHORIZATION);
const store = new Store(window.localStorage, StoreKey.POINTS, StoreKey.OFFERS, StoreKey.DESTINATIONS);
const apiWithProvider = new Provider(api, store);

const pointsModel = new PointsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const filterModel = new FilterModel();


new TripInfoPresenter(tripMain, pointsModel);

const filterPresenter = new FilterPresenter(filterContainer, filterModel);
filterPresenter.init();

let flagStats = false;
let tripPresenter;
let statsComponent = null;
const handleMenuClick = (menuItem) => {
  switch(menuItem) {
    case MenuItem.STATS:
      flagStats = true;
      tripPresenter.hide();
      filterPresenter.toggle(true);
      statsComponent = new Stats(pointsModel.points);
      render(main, statsComponent);
      btnAddNewEvent.disabled = true;
      break;
    case MenuItem.TABLE:
      flagStats = false;

      remove(statsComponent);
      tripPresenter.show();
      filterPresenter.toggle(false);
      btnAddNewEvent.disabled = !isOnline();
  }
};


const menuComponent = new Menu();
render(menuContainer, menuComponent);
menuComponent.setMenuClickHandler(handleMenuClick);

// забрать Offers и Destinations, чтоб было что положить в tripPresenter
const promiseOffersAndDestinations = Promise.all([apiWithProvider.getOffers(), apiWithProvider.getDestinations()]).then((response) => {
  offersModel.setOffers(response[0]);
  destinationsModel.setDestination(response[1]);
});

promiseOffersAndDestinations
  .then(() => tripPresenter = new TripPresenter(tripEventsSection, pointsModel, filterModel, offersModel.offers, destinationsModel.destinations, apiWithProvider, btnAddNewEvent, flagStats))
  .then(() => {
    apiWithProvider.getPoints()
      .then((points) => {
        pointsModel.setPoints(UpdateType.INIT, points);
      })
      .catch(() => {
        pointsModel.setPoints(UpdateType.INIT, []);
      });
  });


window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js'));

notifyNetStatus(btnAddNewEvent);

window.addEventListener('online', () => {
  notifyNetStatus(btnAddNewEvent);
  apiWithProvider.sync();
});

window.addEventListener('offline', () => notifyNetStatus(btnAddNewEvent));
