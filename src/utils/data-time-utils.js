import dayjs from 'dayjs';
import {HOUR_IN_MSECONDS, Unsubscribe} from '../constants.js';


const getHoursAndMinutes = (dateStamp) => dateStamp ? dayjs(dateStamp).format('HH:mm') : Unsubscribe.SHORT;

const getDiffTime = (dateFrom, dateTo) => {
  if (dateFrom && dateTo) {
    const date2 = dayjs(dateFrom);
    const date1 = dayjs(dateTo);
    const minutes = date1.diff(date2, 'm') % 60;
    if ((dateTo - dateFrom) < HOUR_IN_MSECONDS) {
      return `${minutes}M`;
    }
    return `${date1.diff(date2, 'h')}H ${minutes}M`;
  }
  return Unsubscribe.MEDIUM;

};

const getMonthAndDay = (dateStamp) => dateStamp ?  dayjs(dateStamp).format('MMM D') : Unsubscribe.SHORT;


const getFullDateTime = (dateStamp) => dateStamp ?  dayjs(dateStamp).format('DD/MM/YY hh:mm') : Unsubscribe.SHORT;

export {getHoursAndMinutes, getDiffTime, getMonthAndDay, getFullDateTime};

