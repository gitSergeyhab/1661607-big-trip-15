import dayjs from 'dayjs';


const HOUR_IN_MSECONDS = 3600000;


const renderList = (list = [], templateFunction = (x) => x) => list.map((item) => templateFunction(item)).join('\n');

const getRandomInt = (min, max) => {
  [min, max] = [Math.min(min, max), Math.max(min, max)];
  return Math.round(Math.random()*(max - min) + min);
};

const getHoursAndMinutes = (dataStamp) => dayjs(dataStamp).format('HH:mm');

const getDiffTime = (dateFrom, dateTo) => {
  const date2 = dayjs(dateFrom);
  const date1 = dayjs(dateTo);
  const minutes = date1.diff(date2, 'm') % 60;
  if ((dateTo - dateFrom) < HOUR_IN_MSECONDS) {
    return `${minutes}M`;
  }
  return `${date1.diff(date2, 'h')}H ${minutes}M`;
};

const getMonthAndDay = (dateStamp) => dayjs(dateStamp).format('MMM D');

export {renderList, getRandomInt, getHoursAndMinutes, getDiffTime, getMonthAndDay};
