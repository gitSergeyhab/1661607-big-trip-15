import dayjs from 'dayjs';

const renderList = (list = [], templateFunction = () => '') => list.map((item) => templateFunction(item)).join('\n');


const getRandomInt = (min, max) => {
  [min, max] = [Math.min(min, max), Math.max(min, max)];
  return Math.round(Math.random()*(max - min) + min);
};

const getNotImplementedError = (method) => {
  throw new Error(`Abstract method not implemented: ${method}`);
};

const updateItem = (points, updatePoint) => {
  const index = points.findIndex((point) => point.id === updatePoint.id);
  return index === -1 ? points : [...points.slice(0, index), updatePoint, ...points.slice(index + 1)];
};

const sorByDay = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
const sorByTime = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointA.dateTo)) - dayjs(pointB.dateFrom).diff(dayjs(pointB.dateTo));
const sorByPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;


export {
  renderList,
  getRandomInt,
  getNotImplementedError,
  updateItem,
  sorByDay,
  sorByTime,
  sorByPrice
};
