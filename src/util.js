import dayjs from 'dayjs';

const Unsubscribe = {
  SHORT: '...',
  MEDIUM: 'updating...',
  LONG: 'information is being updated...',
} ;


const HOUR_IN_MSECONDS = 3600000;


const renderList = (list = [], templateFunction = () => '') => list.map((item) => templateFunction(item)).join('\n');

const getRandomInt = (min, max) => {
  [min, max] = [Math.min(min, max), Math.max(min, max)];
  return Math.round(Math.random()*(max - min) + min);
};


const catchNull = (needFunction, ...checkParams) => {
  if (checkParams.every(Boolean)) {
    return needFunction(...checkParams);
  }
  return Unsubscribe.SHORT;
};


const getHoursAndMinutes0 = (dateStamp) => dayjs(dateStamp).format('HH:mm');
const getHoursAndMinutes = (dateStamp) => catchNull(getHoursAndMinutes0, dateStamp);

const getDiffTime0 = (dateFrom, dateTo) => {
  const date2 = dayjs(dateFrom);
  const date1 = dayjs(dateTo);
  const minutes = date1.diff(date2, 'm') % 60;
  if ((dateTo - dateFrom) < HOUR_IN_MSECONDS) {
    return `${minutes}M`;
  }
  return `${date1.diff(date2, 'h')}H ${minutes}M`;
};
const getDiffTime = (dateFrom, dateTo)  => catchNull(getDiffTime0, dateFrom, dateTo);

const getMonthAndDay0 = (dateStamp) => dayjs(dateStamp).format('MMM D');
const getMonthAndDay = (dateStamp) => catchNull(getMonthAndDay0, dateStamp);


const getFullDadeTime0 = (dateStamp) => dayjs(dateStamp).format('DD/MM/YY hh:mm');
const getFullDadeTime = (dateStamp) => catchNull(getFullDadeTime0, dateStamp);


const createOfferHtml = ({title, price, id}) => `
<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${id}" type="checkbox" name="event-offer-luggage" checked>
  <label class="event__offer-label" for="event-offer-luggage-${id}">
    <span class="event__offer-title">${title || Unsubscribe.MEDIUM}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${price || Unsubscribe.MEDIUM}</span>
  </label>
</div>`;

export {renderList, getRandomInt, getHoursAndMinutes, getDiffTime, getMonthAndDay, getFullDadeTime, createOfferHtml, Unsubscribe};
