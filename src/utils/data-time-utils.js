import dayjs from 'dayjs';


const getHoursAndMinutes = (date) => dayjs(date).format('HH:mm');

const addZero = (number) => number > 9 ? number : `0${number}`;

const getMinutes = (from, to) => dayjs(to).diff(dayjs(from), 'm');

const getDateFormat = (days, hours, minutes) => {
  if (days >= 1) {
    return `${addZero(days)}D ${addZero(hours % 24)}H ${addZero(minutes % 60)}M`;
  }
  if (hours >= 1) {
    return `${addZero(hours)}H ${addZero(minutes % 60)}M`;
  }
  return `${addZero(minutes)}M`;
};

const getDiffTime = (dateFrom, dateTo) => {
  const date2 = dayjs(dateFrom);
  const date1 = dayjs(dateTo);
  const days = date1.diff(date2, 'd');
  const hours = date1.diff(date2, 'h');
  const minutes = date1.diff(date2, 'm');
  return getDateFormat (days, hours, minutes);
};

const getMonthAndDay = (date) => dayjs(date).format('MMM D');

const getFullDateTime = (date) => dayjs(date).format('DD/MM/YY hh:mm');

export {
  getHoursAndMinutes,
  getDiffTime,
  getMonthAndDay,
  getFullDateTime,
  getMinutes,
  getDateFormat
};

