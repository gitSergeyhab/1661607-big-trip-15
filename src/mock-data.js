/* eslint-disable camelcase*/ // в тз написано, что данные с сервера будут приходить в snake_case, так что  вот...
import {getRandomInt} from './utils/util.js';


const TIME_DIFF = 8000000;
const MAX_OFFER_COUNT = 6;

const Price = {
  MIN: 0,
  MAX: 500,
};

const POINT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const CITIES = ['Paris', 'Berlin', 'New York', 'Muhosransk'];
const OFFER_NAMES = ['Order Uber', 'Add luggage', 'Switch to comfort', 'Rent a car', 'Book tickets', 'Lunch in city'];
const TEXT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus';

const texts = TEXT.split('. ');

const getRandValueFromList = (list) => list[getRandomInt(0, list.length - 1)];

const getRandDescription = () => new Array(getRandomInt(1, texts.length)).fill().map(() => getRandValueFromList(texts)).join('. ');

const fakeSrc = () => `http://picsum.photos/248/152?r=${Math.random()}`;


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

const createOffers = () => getRandomListNoRepeat(getRandomInt(0, MAX_OFFER_COUNT), OFFER_NAMES)
  .map((item) => ({title: item, price: getRandomInt(0, Price.MAX), id: Math.random()}));


const createPicture = () => ({
  src: fakeSrc(),
  description: getRandValueFromList(texts),
});

const createPicturies = () => new Array(getRandomInt(0, 3)).fill().map(createPicture);

const crateDestination = () => ({
  description: getRandDescription(),
  name: getRandValueFromList(CITIES),
  pictures: createPicturies(),
});

export const createMockPoint = () => {
  const dataStampNow = new Date() - 0;
  const dataStampFrom = dataStampNow + getRandomInt(0, TIME_DIFF);
  const dataStampTo = dataStampFrom + getRandomInt(0, TIME_DIFF);
  return {
    basePrice: getRandomInt(Price.MIN, Price.MAX),
    dateFrom: dataStampFrom,
    dateTo: dataStampTo,
    id: Math.random(),
    isFavorite: Math.random() < 0.5,
    type: getRandValueFromList(POINT_TYPES),
    offers: createOffers(),
    destination: crateDestination(),
  };

};

