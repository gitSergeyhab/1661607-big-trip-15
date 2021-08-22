const Place = {
  BEFORE_BEGIN: 'beforebegin',
  AFTER_BEGIN: 'afterbegin',
  BEFORE_END: 'beforeend',
  AFTER_END: 'afterend',
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
  Unsubscribe,
  HOUR_IN_MSECONDS,
  DEFAULT_POINT_TYPE
};
