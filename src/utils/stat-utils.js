import { getMinutes, getDateFormat } from './data-time-utils';


const filterBySum = (object1, object2) => object2.sum - object1.sum;

const getPriceFormat = (price) => `€ ${price}`;
const getCountFormat = (val) => `${val}x`;
const getTimeFormat = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(minutes / 60 / 24 );
  return getDateFormat (days, hours, minutes);
};

const getSumPrice = (points, label) => points.reduce((acc, point) => point.type === label ? acc + point.basePrice : acc, 0);
const getCountType = (points, label) => points.reduce((acc, point) => point.type === label ? ++acc : acc, 0);
const getSumTime = (points, label) => points.reduce((acc, point) => point.type === label ? acc + getMinutes(point.dateFrom, point.dateTo) : acc, 0);

const getLabels = (points) => ([...new Set(points.map((point) => point.type))]);

const getGraphData = (points, countFunction) => {
  const labels = getLabels(points);
  const labelCounts = labels.map((label) => ({type: label, sum: countFunction(points, label)}));
  labelCounts.sort(filterBySum);
  return {
    labels: labelCounts.map((labelPrice) => labelPrice.type.toUpperCase()),
    counts: labelCounts.map((labelPrice) => labelPrice.sum),
  };
};

export {
  getPriceFormat,
  getCountFormat,
  getTimeFormat,
  getSumPrice,
  getCountType,
  getSumTime,
  getGraphData,
  getLabels
};
