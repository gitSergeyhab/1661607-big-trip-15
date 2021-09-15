import dayjs from 'dayjs';
import { FilterType } from '../constants';


export const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => dayjs().isBefore(point.dateFrom, 'day')),
  [FilterType.PAST]: (points) => points.filter((point) => dayjs().isAfter(point.dateTo, 'day')),
};
