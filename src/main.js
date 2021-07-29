import {createTripInfo} from './view/trip-info.js';
import {createMenu} from './view/menu.js';
import {createFilters} from './view/filter.js';
import {createSort} from './view/form-sort.js';
import {createEventsList} from './view/events-list.js';
import {createEvent} from './view/event.js';
import {createNewPoint} from './view/new-point.js';
import {createEditionPoint} from './view/edit-point.js';

import {renderList} from './util.js';


const BodyMainElements = {
  header: document.querySelector('header.page-header'),
  main: document.querySelector('main.page-main'),
};

const points = [
  {point: 'Taxi Amsterdam', timeIn: '10:30', timeOut: '11:00'},
  {point: 'Flight Chamonix', timeIn: '11:30', timeOut: '12:00'},
  {point: 'Drive Chamonix', timeIn: '12:30', timeOut: '13:00'},
];

const render = (container, content, place = 'beforeend') => container.insertAdjacentHTML(place, content);

const tripMain = BodyMainElements.header.querySelector('.trip-main');
render(tripMain, createTripInfo(), 'afterbegin');

const menu = BodyMainElements.header.querySelector('.trip-controls__navigation');
render(menu, createMenu());

const filter = BodyMainElements.header.querySelector('.trip-controls__filters');
render(filter, createFilters());

const tripEventsSection = BodyMainElements.main.querySelector('.trip-events');
render(tripEventsSection, createSort());
render(tripEventsSection, createEventsList());
const eventsList = BodyMainElements.main.querySelector('.trip-events__list');
render(eventsList, createNewPoint());
render(eventsList, renderList(points, createEvent));
render(eventsList, createEditionPoint());
