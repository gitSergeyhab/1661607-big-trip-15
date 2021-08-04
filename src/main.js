import {createTripInfo} from './view/trip-info.js';
import {createMenu} from './view/menu.js';
import {createFilters} from './view/filter.js';
import {createSort} from './view/form-sort.js';
import {createEventsList} from './view/events-list.js';
import {createEvent} from './view/event.js';
import {createNewPoint} from './view/new-point.js';
import {createEditionPoint} from './view/edit-point.js';
import {createPoint} from './mock-data.js';

import {renderList, getRandomInt} from './utils/util.js';


const POINTS_MAX_COUNT = 4;

const points = new Array(getRandomInt(2, POINTS_MAX_COUNT)).fill().map(createPoint);

const BodyMainElements = {
  header: document.querySelector('header.page-header'),
  main: document.querySelector('main.page-main'),
};


const render = (container, content, place = 'beforeend') => container.insertAdjacentHTML(place, content);

const tripMain = BodyMainElements.header.querySelector('.trip-main');
render(tripMain, createTripInfo(points), 'afterbegin');

const menu = BodyMainElements.header.querySelector('.trip-controls__navigation');
render(menu, createMenu());

const filter = BodyMainElements.header.querySelector('.trip-controls__filters');
render(filter, createFilters());

const tripEventsSection = BodyMainElements.main.querySelector('.trip-events');
render(tripEventsSection, createSort());
render(tripEventsSection, createEventsList());
const eventsList = BodyMainElements.main.querySelector('.trip-events__list');
render(eventsList, createNewPoint(points[1]));
render(eventsList, renderList(points, createEvent));
render(eventsList, createEditionPoint(points[0]));
