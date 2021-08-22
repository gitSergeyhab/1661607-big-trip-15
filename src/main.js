import TripInfo from './view/trip-info.js';
import Menu from './view/menu.js';
import Filter from './view/filter.js';
import TripPresenter from './presenter/trip.js';

import {createMockPoint} from './mock-data.js';
import {getRandomInt} from './utils/util.js';
import {render} from './utils/dom-utils.js';
import {Place} from './constants.js';


const points = new Array(getRandomInt(3, 6)).fill().map(createMockPoint);

const header = document.querySelector('header.page-header');
const main = document.querySelector('main.page-main');

const tripMain = header.querySelector('.trip-main');

render(tripMain, new TripInfo(points), Place.AFTER_BEGIN);

const menu = tripMain.querySelector('.trip-controls__navigation');
render(menu, new Menu());

const filter = tripMain.querySelector('.trip-controls__filters');
render(filter, new Filter());

const tripEventsSection = main.querySelector('.trip-events');

const tripPresenter = new TripPresenter(tripEventsSection);
tripPresenter.init(points);
