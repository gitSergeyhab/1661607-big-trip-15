import dayjs from 'dayjs';
import {showOfflineMessage} from './show-offline-message.js';


const TITLE_OFFLINE_INDICATOR = ' [offline]';
const BODY_OFFLINE_INDICATOR = ' OFFLINE +';
const BTN_TEXT = 'New event';

const renderList = (list = [], templateFunction = () => '') => list.map((item) => templateFunction(item)).join('\n');

const getNotImplementedError = (method) => {
  throw new Error(`Abstract method not implemented: ${method}`);
};

const getIndex = (items, wantedItem) => items.findIndex((item) => item.id === wantedItem.id);

const sorByDay = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
const sorByTime = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointA.dateTo)) - dayjs(pointB.dateFrom).diff(dayjs(pointB.dateTo));
const sorByPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

const capitalize = (item) => `${item[0].toUpperCase()}${item.slice(1)}`;

const isOnline = () => window.navigator.onLine;

const notifyNetStatus = (btn) => {
  if (isOnline()) {
    document.title = document.title.replace(TITLE_OFFLINE_INDICATOR, '');
    btn.textContent = BTN_TEXT;
    btn.style.border = '';
    btn.disabled = false;
    return;
  }

  document.title += TITLE_OFFLINE_INDICATOR;
  btn.textContent = BODY_OFFLINE_INDICATOR;
  btn.style.border = '2px solid red';
  btn.disabled = true;
  showOfflineMessage();
};


export {
  renderList,
  getNotImplementedError,
  sorByDay,
  sorByTime,
  sorByPrice,
  getIndex,
  capitalize,
  isOnline,
  notifyNetStatus
};
