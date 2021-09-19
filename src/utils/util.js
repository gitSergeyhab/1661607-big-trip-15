import dayjs from 'dayjs';

const renderList = (list = [], templateFunction = () => '') => list.map((item) => templateFunction(item)).join('\n');


const getRandomInt = (min, max) => {
  [min, max] = [Math.min(min, max), Math.max(min, max)];
  return Math.round(Math.random()*(max - min) + min);
};

const getNotImplementedError = (method) => {
  throw new Error(`Abstract method not implemented: ${method}`);
};

const getIndex = (items, wantedItem) => items.findIndex((item) => item.id === wantedItem.id);


const updateItem = (points, updatePoint) => {
  const index = getIndex(points, updatePoint);
  return index === -1 ? points : [...points.slice(0, index), updatePoint, ...points.slice(index + 1)];
};

const sorByDay = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
const sorByTime = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointA.dateTo)) - dayjs(pointB.dateFrom).diff(dayjs(pointB.dateTo));
const sorByPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

const capitalize = (item) => `${item[0].toUpperCase()}${item.slice(1)}`;

const isOnline = () => window.navigator.onLine;




export {
  renderList,
  getRandomInt,
  getNotImplementedError,
  updateItem,
  sorByDay,
  sorByTime,
  sorByPrice,
  getIndex,
  capitalize,
  isOnline
};
