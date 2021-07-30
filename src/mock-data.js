/* eslint-disable */

import {getRandomInt} from './util.js';
// import dayjs from 'dayjs';

const POINTS_MAX_COUNT = 22;
const MAX_PHOTO_COUNT = 5;
const TIME_DIFF = 8000000;
const MAX_OFFER_COUNT = 6;

const Price = {
  MIN: 0,
  MAX: 500,
}

const pointTypes = ["taxi", "bus", "train", "ship", "drive", "flight", "check-in", "sightseeing", "restaurant"];
const cities = ['Paris', 'Berlin', 'New York', 'Muhosransk'];
const offerNames = ['Order Uber', 'Add luggage', 'Switch to comfort', 'Rent a car', 'Book tickets', 'Lunch in city', ]
const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus'

const texts = text.split('. ').map(t => `${t}.`);

const getRandValueFromList = list => list[getRandomInt(0, list.length - 1)];

const getRandDescription = () => new Array(getRandomInt(1, texts.length)).fill().map(() => getRandValueFromList(texts)).join(' ');

const fakeSrc = () => `http://picsum.photos/248/152?r=${Math.random()}`;

const getRandomSrcs = () => new Array(getRandomInt(1, MAX_PHOTO_COUNT)).fill().map(fakeSrc);


const getRandomListNoRepeat = (num, list) => {
  num = num > list.length ? list.length : num;
  const offers = [];
  while (offers.length < num){
    const offer = getRandValueFromList(list);
    if (! offers.some(off => off === offer)) {
      offers.push(offer)
    }
  }
  return offers;
};

const createOffers = () => getRandomListNoRepeat(getRandomInt(0, MAX_OFFER_COUNT), offerNames)
  .map(item => ({title: item, price: getRandomInt(0, Price.MAX)}));

const getId = () => {
  let id = 0;
  return () => {
    id++;
    return id.toString();
  }
};

const getPointId = getId();

const createPoint = () => {
  const dataStampNow = new Date() - 0;
  const dataStampFrom = dataStampNow + getRandomInt(0, TIME_DIFF);
  const dataStampTo = dataStampFrom + getRandomInt(0, TIME_DIFF);
  return {
    base_price: getRandomInt(Price.MIN, Price.MAX),
    date_from: dataStampFrom,
    date_to: dataStampTo,
    destination__name: getRandValueFromList(cities),
    destination__description: getRandDescription(),
    destination__photos: getRandomSrcs(),
    id: getPointId(),
    is_favorite: Math.random() < 0.5,
    type: getRandValueFromList(pointTypes),
    offers: createOffers(),
  }
};

export const points = new Array(getRandomInt(0, POINTS_MAX_COUNT)).fill().map(createPoint)





// const localPoint = {
//   base_price: 222,
//   date_from: /*"2019-07-10T22:55:56.845Z"*/ dayjs(),
//   date_to: "2019-07-11T11:22:13.375Z",
//   destination: '$Destination$',
//   is_favorite: false,
//   offers: [
//     {
//       title: "Choose meal",
//       price: 180
//     }, {
//       title: "Upgrade to comfort class",
//       price: 50
//     }
//   ],
//   type: "taxi"
// };

// const destination = {
//   description: "Chamonix, is a beautiful city, a true asian pearl, with crowded streets.",
//   name: "Chamonix",
//   pictures: [
//     {
//       src: "http://picsum.photos/300/200?r=0.0762563005163317",
//       description: "Chamonix parliament building"
//     }
//   ]
// };

// const offer = {
//   type: "taxi",
//   offers: [
//     {
//       title: "Upgrade to a business class",
//       price: 120
//     }, {
//       title: "Choose the radio station",
//       price: 60
//     }
//   ]
// }
