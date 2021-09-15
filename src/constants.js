const Place = {
  BEFORE_BEGIN: 'beforebegin',
  AFTER_BEGIN: 'afterbegin',
  BEFORE_END: 'beforeend',
  AFTER_END: 'afterend',
};

const EmptyMessage = {
  EVERYTHING: 'Click New Event to create your first point',
  PAST: 'There are no past events now',
  FUTURE: 'There are no future events now',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
};








const Unsubscribe = {
  SHORT: '...',
  MEDIUM: 'updating...',
  LONG: 'information is being updated...',
};

const HOUR_IN_MSECONDS = 3600000;
const DEFAULT_POINT_TYPE = 'bus';


export {
  Place,
  EmptyMessage,
  Unsubscribe,
  HOUR_IN_MSECONDS,
  DEFAULT_POINT_TYPE,
  UserAction,
  UpdateType,
  SortType
};
