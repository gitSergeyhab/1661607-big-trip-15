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

const getFullDadeTime = (dateStamp) => dayjs(dateStamp).format('DD/MM/YY hh:mm');

const createOfferHtml = ({title, price, id}) => `
<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${id}" type="checkbox" name="event-offer-luggage" checked>
  <label class="event__offer-label" for="event-offer-luggage-${id}">
    <span class="event__offer-title">${title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${price}</span>
  </label>
</div>`;

export {renderList, getRandomInt, getHoursAndMinutes, getDiffTime, getMonthAndDay, getFullDadeTime, createOfferHtml};
