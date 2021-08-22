import Abstract from './view/abstract.js';
import TripInfo from './view/trip-info.js';
import Menu from './view/menu.js';
import Filter from './view/filter.js';
import Sort from './view/sort.js';
import PointList from './view/point-list.js';
import CollapsedPoint from './view/event.js';
// import Point from './view/point.js';

import {createMockPoint} from './mock-data.js';

import {getRandomInt} from './utils/util.js';


const Place = {
  BEFORE_BEGIN: 'beforebegin',
  AFTER_BEGIN: 'afterbegin',
  BEFORE_END: 'beforeend',
  AFTER_END: 'afterend',
};

const renderElement = (container, element, place = Place.BEFORE_END) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (element instanceof Abstract) {
    element = element.getElement();
  }

  container.insertAdjacentElement(place, element);
};

const POINTS_MAX_COUNT = 4;

const points = new Array(getRandomInt(2, POINTS_MAX_COUNT)).fill().map(createMockPoint);

const header = document.querySelector('header.page-header');
const main = document.querySelector('main.page-main');


// const render = (container, content, place = 'beforeend') => container.insertAdjacentHTML(place, content);

const tripMain = header.querySelector('.trip-main');

renderElement(tripMain, new TripInfo(points), Place.AFTER_BEGIN);

const menu = tripMain.querySelector('.trip-controls__navigation');
renderElement(menu, new Menu());

const filter = tripMain.querySelector('.trip-controls__filters');
renderElement(filter, new Filter());

const tripEventsSection = main.querySelector('.trip-events');
renderElement(tripEventsSection, new Sort());

const pointList = new PointList();
renderElement(tripEventsSection, pointList);

points.forEach((point) => {
  renderElement(pointList, new CollapsedPoint(point));
});
