/* eslint-disable camelcase*/ // в тз написано, что данные с сервера будут приходить в snake_case, так что  вот...
import {getRandomInt} from './util.js';


const POINTS_MAX_COUNT = 4;
const MAX_PHOTO_COUNT = 5;
const TIME_DIFF = 8000000;
const MAX_OFFER_COUNT = 6;

const Price = {
  MIN: 0,
  MAX: 500,
};

const pointTypes = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const cities = ['Paris', 'Berlin', 'New York', 'Muhosransk'];
const offerNames = ['Order Uber', 'Add luggage', 'Switch to comfort', 'Rent a car', 'Book tickets', 'Lunch in city'];
const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus';

const texts = text.split('. ').map((t) => `${t}.`);

const getRandValueFromList = (list) => list[getRandomInt(0, list.length - 1)];

const getRandDescription = () => new Array(getRandomInt(1, texts.length)).fill().map(() => getRandValueFromList(texts)).join(' ');

const fakeSrc = () => `http://picsum.photos/248/152?r=${Math.random()}`;

const getRandomSrcs = () => new Array(getRandomInt(1, MAX_PHOTO_COUNT)).fill().map(fakeSrc);

export const get50 = (data) => ([data, null][+(Math.random() > 0.8)]);


const getRandomListNoRepeat = (num, list) => {
  num = num > list.length ? list.length : num;
  const offers = [];
  while (offers.length < num){
    const offer = getRandValueFromList(list);
    if (! offers.some((off) => off === offer)) {
      offers.push(offer);
    }
  }
  return offers;
};

const createOffers = () => getRandomListNoRepeat(getRandomInt(0, MAX_OFFER_COUNT), offerNames)
  .map((item) => ({title: get50(item), price: get50(getRandomInt(0, Price.MAX)), id: get50(Math.random())}));

const getId = () => {
  let id = 0;
  return () => {
    id++;
    return id.toString();
  };
};

const getPointId = getId();

const createPoint = () => {
  const dataStampNow = new Date() - 0;
  const dataStampFrom = dataStampNow + getRandomInt(0, TIME_DIFF);
  const dataStampTo = dataStampFrom + getRandomInt(0, TIME_DIFF);
  return {
    base_price: get50(getRandomInt(Price.MIN, Price.MAX)),
    date_from: get50(dataStampFrom),
    date_to: get50(dataStampTo),
    destination__name: get50(getRandValueFromList(cities)),
    destination__description: get50(getRandDescription()),
    destination__photos: get50(getRandomSrcs()),
    id: get50(getPointId()),
    is_favorite: get50(Math.random() < 0.5),
    type: get50(getRandValueFromList(pointTypes)),
    offers: createOffers(),
  };
};

export const points = new Array(getRandomInt(2, POINTS_MAX_COUNT)).fill().map(createPoint);

