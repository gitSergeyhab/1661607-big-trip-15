/* eslint-disable camelcase*/ // в тз написано, что данные с сервера будут приходить в snake_case, так что  вот...
import {getRandomInt} from './utils/util.js';


const TIME_DIFF = 8000000;
const MAX_OFFER_COUNT = 2;

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

const createPictures = () => new Array(getRandomInt(0, 5)).fill().map(createPicture);

const crateDestination = () => ({
  description: getRandDescription(),
  name: getRandValueFromList(CITIES),
  pictures: createPictures(),
});

export const createMockPoint = () => {
  const dataStampNow = new Date() - 0;
  const dataStampFrom = dataStampNow + getRandomInt(0, TIME_DIFF);
  const dataStampTo = dataStampFrom + getRandomInt(0, TIME_DIFF);
  return {
    basePrice: getRandomInt(Price.MIN, Price.MAX),
    dateFrom: dataStampFrom,
    dateTo: dataStampTo,
    id: getRandomInt(1, 10000),
    isFavorite: Math.random() < 0.5,
    type: getRandValueFromList(POINT_TYPES),
    offers: createOffers(),
    destination: crateDestination(),
  };

};


export const OFFERS = [
  {
      "type": "taxi",
      "offers": [
          {
              "title": "Upgrade to a business class",
              "price": 190
          },
          {
              "title": "Choose the radio station",
              "price": 30
          },
          {
              "title": "Choose temperature",
              "price": 170
          },
          {
              "title": "Drive quickly, I'm in a hurry",
              "price": 100
          },
          {
              "title": "Drive slowly",
              "price": 110
          }
      ]
  },
  {
      "type": "bus",
      "offers": [
          {
              "title": "Infotainment system",
              "price": 50
          },
          {
              "title": "Order meal",
              "price": 100
          },
          {
              "title": "Choose seats",
              "price": 190
          }
      ]
  },
  {
      "type": "train",
      "offers": [
          {
              "title": "Book a taxi at the arrival point",
              "price": 110
          },
          {
              "title": "Order a breakfast",
              "price": 80
          },
          {
              "title": "Wake up at a certain time",
              "price": 140
          }
      ]
  },
  {
      "type": "flight",
      "offers": [
          {
              "title": "Choose meal",
              "price": 120
          },
          {
              "title": "Choose seats",
              "price": 90
          },
          {
              "title": "Upgrade to comfort class",
              "price": 120
          },
          {
              "title": "Upgrade to business class",
              "price": 120
          },
          {
              "title": "Add luggage",
              "price": 170
          },
          {
              "title": "Business lounge",
              "price": 160
          }
      ]
  },
  {
      "type": "check-in",
      "offers": [
          {
              "title": "Choose the time of check-in",
              "price": 70
          },
          {
              "title": "Choose the time of check-out",
              "price": 190
          },
          {
              "title": "Add breakfast",
              "price": 110
          },
          {
              "title": "Laundry",
              "price": 140
          },
          {
              "title": "Order a meal from the restaurant",
              "price": 30
          }
      ]
  },
  {
      "type": "sightseeing",
      "offers": []
  },
  {
      "type": "ship",
      "offers": [
          {
              "title": "Choose meal",
              "price": 130
          },
          {
              "title": "Choose seats",
              "price": 160
          },
          {
              "title": "Upgrade to comfort class",
              "price": 170
          },
          {
              "title": "Upgrade to business class",
              "price": 150
          },
          {
              "title": "Add luggage",
              "price": 100
          },
          {
              "title": "Business lounge",
              "price": 40
          }
      ]
  },
  {
      "type": "drive",
      "offers": [
          {
              "title": "Choose comfort class",
              "price": 110
          },
          {
              "title": "Choose business class",
              "price": 180
          }
      ]
  },
  {
      "type": "restaurant",
      "offers": [
          {
              "title": "Choose live music",
              "price": 150
          },
          {
              "title": "Choose VIP area",
              "price": 70
          }
      ]
  }
];

export const DESTINATIONS = [
  {
      "name": "Chamonix",
      "description": "Chamonix, a true asian pearl, with crowded streets, with a beautiful old town, with an embankment of a mighty river as a centre of attraction, full of of cozy canteens where you can try the best coffee in the Middle East, a perfect place to stay with a family.",
      "pictures": [
          {
              "src": "http://picsum.photos/300/200?r=0.7892608804589321",
              "description": "Chamonix kindergarten"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.0973524783388573",
              "description": "Chamonix zoo"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.924967803854766",
              "description": "Chamonix central station"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.8640273865583332",
              "description": "Chamonix embankment"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.2717168082058723",
              "description": "Chamonix kindergarten"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.7335345096980967",
              "description": "Chamonix biggest supermarket"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.9276011304171963",
              "description": "Chamonix central station"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.3027750761875718",
              "description": "Chamonix street market"
          }
      ]
  },
  {
      "name": "Geneva",
      "description": "Geneva, is a beautiful city, a true asian pearl, with crowded streets, middle-eastern paradise.",
      "pictures": [
          {
              "src": "http://picsum.photos/300/200?r=0.38970122138160157",
              "description": "Geneva street market"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.18256630430242726",
              "description": "Geneva embankment"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.20671429104846295",
              "description": "Geneva biggest supermarket"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.7736230002889597",
              "description": "Geneva biggest supermarket"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.014503869464721708",
              "description": "Geneva embankment"
          }
      ]
  },
  {
      "name": "Amsterdam",
      "description": "Amsterdam, with a beautiful old town, middle-eastern paradise, with an embankment of a mighty river as a centre of attraction, a perfect place to stay with a family, famous for its crowded street markets with the best street food in Asia.",
      "pictures": [
          {
              "src": "http://picsum.photos/300/200?r=0.767824776171024",
              "description": "Amsterdam city centre"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.5662897489010899",
              "description": "Amsterdam park"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.04902707273840945",
              "description": "Amsterdam biggest supermarket"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.5147648534237919",
              "description": "Amsterdam city centre"
          }
      ]
  },
  {
      "name": "Helsinki",
      "description": "Helsinki, a perfect place to stay with a family, famous for its crowded street markets with the best street food in Asia.",
      "pictures": [
          {
              "src": "http://picsum.photos/300/200?r=0.9992146982194865",
              "description": "Helsinki kindergarten"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.4298068039773011",
              "description": "Helsinki parliament building"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.7119407988627826",
              "description": "Helsinki central station"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.9988768084677495",
              "description": "Helsinki parliament building"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.004159164571301943",
              "description": "Helsinki kindergarten"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.821502417128702",
              "description": "Helsinki kindergarten"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.32923370941795893",
              "description": "Helsinki city centre"
          }
      ]
  },
  {
      "name": "Oslo",
      "description": "Oslo, with a beautiful old town.",
      "pictures": [
          {
              "src": "http://picsum.photos/300/200?r=0.5808124275521067",
              "description": "Oslo zoo"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.5389723971695275",
              "description": "Oslo city centre"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.8329050159680442",
              "description": "Oslo kindergarten"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.78955161869642",
              "description": "Oslo biggest supermarket"
          }
      ]
  },
  {
      "name": "Kopenhagen",
      "description": "Kopenhagen, is a beautiful city, with an embankment of a mighty river as a centre of attraction, a perfect place to stay with a family.",
      "pictures": [
          {
              "src": "http://picsum.photos/300/200?r=0.8367696205318287",
              "description": "Kopenhagen biggest supermarket"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.9531445646096095",
              "description": "Kopenhagen kindergarten"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.34040395223432607",
              "description": "Kopenhagen kindergarten"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.13820390559803886",
              "description": "Kopenhagen zoo"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.8884411121632922",
              "description": "Kopenhagen street market"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.619743625740159",
              "description": "Kopenhagen city centre"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.8910563594460168",
              "description": "Kopenhagen park"
          }
      ]
  },
  {
      "name": "Den Haag",
      "description": "Den Haag, for those who value comfort and coziness, full of of cozy canteens where you can try the best coffee in the Middle East, famous for its crowded street markets with the best street food in Asia.",
      "pictures": [
          {
              "src": "http://picsum.photos/300/200?r=0.6188755147242451",
              "description": "Den Haag parliament building"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.6951974597433068",
              "description": "Den Haag embankment"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.38625421155515705",
              "description": "Den Haag central station"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.26444951450997456",
              "description": "Den Haag embankment"
          }
      ]
  },
  {
      "name": "Rotterdam",
      "description": "Rotterdam, is a beautiful city, for those who value comfort and coziness, full of of cozy canteens where you can try the best coffee in the Middle East.",
      "pictures": [
          {
              "src": "http://picsum.photos/300/200?r=0.895479449130639",
              "description": "Rotterdam zoo"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.9693449617786283",
              "description": "Rotterdam central station"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.9727010855224851",
              "description": "Rotterdam embankment"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.15001352139123614",
              "description": "Rotterdam biggest supermarket"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.30930657491228186",
              "description": "Rotterdam central station"
          }
      ]
  },
  {
      "name": "Saint Petersburg",
      "description": "Saint Petersburg, is a beautiful city, a true asian pearl, in a middle of Europe, a perfect place to stay with a family.",
      "pictures": [
          {
              "src": "http://picsum.photos/300/200?r=0.05013546156691162",
              "description": "Saint Petersburg embankment"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.2199478937920456",
              "description": "Saint Petersburg city centre"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.7034805159998181",
              "description": "Saint Petersburg city centre"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.016718434791743952",
              "description": "Saint Petersburg central station"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.6658369539849645",
              "description": "Saint Petersburg biggest supermarket"
          }
      ]
  },
  {
      "name": "Moscow",
      "description": "Moscow, a true asian pearl, in a middle of Europe, with a beautiful old town, full of of cozy canteens where you can try the best coffee in the Middle East.",
      "pictures": [
          {
              "src": "http://picsum.photos/300/200?r=0.7067707303817539",
              "description": "Moscow central station"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.506419502144881",
              "description": "Moscow embankment"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.5832630188090806",
              "description": "Moscow parliament building"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.937470206396632",
              "description": "Moscow street market"
          }
      ]
  },
  {
      "name": "Sochi",
      "description": "Sochi, middle-eastern paradise, famous for its crowded street markets with the best street food in Asia.",
      "pictures": [
          {
              "src": "http://picsum.photos/300/200?r=0.487752967998768",
              "description": "Sochi biggest supermarket"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.3085299989717025",
              "description": "Sochi kindergarten"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.6398272325728813",
              "description": "Sochi zoo"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.3990092136838592",
              "description": "Sochi street market"
          }
      ]
  },
  {
      "name": "Tokio",
      "description": "Tokio, in a middle of Europe, famous for its crowded street markets with the best street food in Asia.",
      "pictures": [
          {
              "src": "http://picsum.photos/300/200?r=0.3330466945621138",
              "description": "Tokio zoo"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.6509930199082405",
              "description": "Tokio central station"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.8529932238492182",
              "description": "Tokio street market"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.7527547041772642",
              "description": "Tokio biggest supermarket"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.9781595883648389",
              "description": "Tokio embankment"
          }
      ]
  },
  {
      "name": "Kioto",
      "description": "Kioto, with a beautiful old town, for those who value comfort and coziness.",
      "pictures": [
          {
              "src": "http://picsum.photos/300/200?r=0.7704240439855963",
              "description": "Kioto street market"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.3357710348696592",
              "description": "Kioto city centre"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.8964550198870613",
              "description": "Kioto park"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.5579737620599787",
              "description": "Kioto city centre"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.766228585434219",
              "description": "Kioto central station"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.058598040775950544",
              "description": "Kioto embankment"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.015624128278770133",
              "description": "Kioto embankment"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.2379448356069067",
              "description": "Kioto kindergarten"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.8438695030376848",
              "description": "Kioto park"
          }
      ]
  },
  {
      "name": "Nagasaki",
      "description": "Nagasaki, a true asian pearl, in a middle of Europe, middle-eastern paradise, for those who value comfort and coziness, with an embankment of a mighty river as a centre of attraction.",
      "pictures": [
          {
              "src": "http://picsum.photos/300/200?r=0.20245203361702524",
              "description": "Nagasaki central station"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.7295283316440977",
              "description": "Nagasaki zoo"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.2790253447967277",
              "description": "Nagasaki street market"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.4228737082446141",
              "description": "Nagasaki embankment"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.7813698924675867",
              "description": "Nagasaki parliament building"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.9884789412273312",
              "description": "Nagasaki central station"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.9054275961864671",
              "description": "Nagasaki zoo"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.5536216170482109",
              "description": "Nagasaki park"
          }
      ]
  },
  {
      "name": "Hiroshima",
      "description": "Hiroshima, is a beautiful city, in a middle of Europe, with a beautiful old town, full of of cozy canteens where you can try the best coffee in the Middle East.",
      "pictures": [
          {
              "src": "http://picsum.photos/300/200?r=0.8155804624039211",
              "description": "Hiroshima street market"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.9612806364665047",
              "description": "Hiroshima park"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.3096832314488973",
              "description": "Hiroshima embankment"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.6183055375488473",
              "description": "Hiroshima central station"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.07842086647677404",
              "description": "Hiroshima central station"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.5572187001861981",
              "description": "Hiroshima parliament building"
          }
      ]
  },
  {
      "name": "Berlin",
      "description": "Berlin, for those who value comfort and coziness, full of of cozy canteens where you can try the best coffee in the Middle East.",
      "pictures": [
          {
              "src": "http://picsum.photos/300/200?r=0.09706317117561802",
              "description": "Berlin central station"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.546490097002363",
              "description": "Berlin biggest supermarket"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.2782120506699972",
              "description": "Berlin biggest supermarket"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.7532835146586743",
              "description": "Berlin embankment"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.8575176746412057",
              "description": "Berlin biggest supermarket"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.2985520262023216",
              "description": "Berlin central station"
          }
      ]
  },
  {
      "name": "Munich",
      "description": "Munich, is a beautiful city, in a middle of Europe, with a beautiful old town, a perfect place to stay with a family.",
      "pictures": [
          {
              "src": "http://picsum.photos/300/200?r=0.9681641829176906",
              "description": "Munich city centre"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.48492378041285766",
              "description": "Munich biggest supermarket"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.14083656202855677",
              "description": "Munich embankment"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.17759215071565637",
              "description": "Munich embankment"
          }
      ]
  },
  {
      "name": "Frankfurt",
      "description": "Frankfurt, in a middle of Europe, a perfect place to stay with a family.",
      "pictures": [
          {
              "src": "http://picsum.photos/300/200?r=0.9536002114086877",
              "description": "Frankfurt street market"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.8390828815825278",
              "description": "Frankfurt embankment"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.7470007101881289",
              "description": "Frankfurt city centre"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.8432442463333056",
              "description": "Frankfurt embankment"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.5381602541475039",
              "description": "Frankfurt city centre"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.4811579086067168",
              "description": "Frankfurt central station"
          }
      ]
  },
  {
      "name": "Vien",
      "description": "Vien, is a beautiful city, with crowded streets, with a beautiful old town, with an embankment of a mighty river as a centre of attraction, a perfect place to stay with a family.",
      "pictures": [
          {
              "src": "http://picsum.photos/300/200?r=0.762876631495877",
              "description": "Vien embankment"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.46355760725210615",
              "description": "Vien embankment"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.7164422121825416",
              "description": "Vien city centre"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.631344466847229",
              "description": "Vien park"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.016751487854684832",
              "description": "Vien embankment"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.8134835768818991",
              "description": "Vien parliament building"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.3971854331113083",
              "description": "Vien street market"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.528928732093459",
              "description": "Vien parliament building"
          }
      ]
  },
  {
      "name": "Rome",
      "description": "Rome, with crowded streets, with a beautiful old town, for those who value comfort and coziness, with an embankment of a mighty river as a centre of attraction.",
      "pictures": [
          {
              "src": "http://picsum.photos/300/200?r=0.759310519123664",
              "description": "Rome parliament building"
          }
      ]
  },
  {
      "name": "Naples",
      "description": "Naples, middle-eastern paradise.",
      "pictures": [
          {
              "src": "http://picsum.photos/300/200?r=0.4853176907470178",
              "description": "Naples central station"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.46731616469212267",
              "description": "Naples central station"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.10938290356021407",
              "description": "Naples kindergarten"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.8555138556440909",
              "description": "Naples embankment"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.6504929879226669",
              "description": "Naples zoo"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.4390268869995988",
              "description": "Naples street market"
          }
      ]
  },
  {
      "name": "Venice",
      "description": "Venice, in a middle of Europe, middle-eastern paradise, for those who value comfort and coziness, with an embankment of a mighty river as a centre of attraction, a perfect place to stay with a family.",
      "pictures": [
          {
              "src": "http://picsum.photos/300/200?r=0.25172420289177877",
              "description": "Venice zoo"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.3380335212080452",
              "description": "Venice biggest supermarket"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.33777622059095136",
              "description": "Venice kindergarten"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.042104933755312546",
              "description": "Venice street market"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.9660419995580205",
              "description": "Venice zoo"
          }
      ]
  },
  {
      "name": "Milan",
      "description": "Milan, with a beautiful old town, with an embankment of a mighty river as a centre of attraction, a perfect place to stay with a family.",
      "pictures": [
          {
              "src": "http://picsum.photos/300/200?r=0.019808675220275518",
              "description": "Milan street market"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.6700542599079695",
              "description": "Milan street market"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.03519839098385269",
              "description": "Milan zoo"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.6534631211514415",
              "description": "Milan street market"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.030163577620971882",
              "description": "Milan central station"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.8441786838027223",
              "description": "Milan zoo"
          }
      ]
  },
  {
      "name": "Monaco",
      "description": "Monaco, middle-eastern paradise, for those who value comfort and coziness.",
      "pictures": [
          {
              "src": "http://picsum.photos/300/200?r=0.6562301091603597",
              "description": "Monaco kindergarten"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.565878558508198",
              "description": "Monaco park"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.25042639667352007",
              "description": "Monaco kindergarten"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.2401566398068229",
              "description": "Monaco zoo"
          }
      ]
  },
  {
      "name": "Paris",
      "description": "Paris, a true asian pearl, with crowded streets, full of of cozy canteens where you can try the best coffee in the Middle East.",
      "pictures": [
          {
              "src": "http://picsum.photos/300/200?r=0.397506645905757",
              "description": "Paris parliament building"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.19743803218025757",
              "description": "Paris city centre"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.6267304135414649",
              "description": "Paris parliament building"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.799071192860705",
              "description": "Paris park"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.7816522031138655",
              "description": "Paris zoo"
          }
      ]
  },
  {
      "name": "Barcelona",
      "description": "Barcelona, with crowded streets, in a middle of Europe, with an embankment of a mighty river as a centre of attraction, full of of cozy canteens where you can try the best coffee in the Middle East.",
      "pictures": [
          {
              "src": "http://picsum.photos/300/200?r=0.25053968714963837",
              "description": "Barcelona street market"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.4838797382568454",
              "description": "Barcelona zoo"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.7803921078052662",
              "description": "Barcelona embankment"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.603657815661875",
              "description": "Barcelona biggest supermarket"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.32493674648336146",
              "description": "Barcelona biggest supermarket"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.40352647601297353",
              "description": "Barcelona kindergarten"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.835467252843719",
              "description": "Barcelona central station"
          }
      ]
  },
  {
      "name": "Valencia",
      "description": "Valencia, is a beautiful city, a true asian pearl, with crowded streets, in a middle of Europe, for those who value comfort and coziness, with an embankment of a mighty river as a centre of attraction, full of of cozy canteens where you can try the best coffee in the Middle East.",
      "pictures": [
          {
              "src": "http://picsum.photos/300/200?r=0.834279948355011",
              "description": "Valencia city centre"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.4582865580954021",
              "description": "Valencia biggest supermarket"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.33251345391749854",
              "description": "Valencia park"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.677479182586971",
              "description": "Valencia park"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.09736260352532544",
              "description": "Valencia kindergarten"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.005110297316170298",
              "description": "Valencia central station"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.24956852404508267",
              "description": "Valencia kindergarten"
          }
      ]
  },
  {
      "name": "Madrid",
      "description": "Madrid, with crowded streets, full of of cozy canteens where you can try the best coffee in the Middle East.",
      "pictures": [
          {
              "src": "http://picsum.photos/300/200?r=0.49161915505608533",
              "description": "Madrid city centre"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.5288599729094661",
              "description": "Madrid kindergarten"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.5998725290388642",
              "description": "Madrid biggest supermarket"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.8433762166928531",
              "description": "Madrid central station"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.960453512822002",
              "description": "Madrid parliament building"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.3176039241884694",
              "description": "Madrid central station"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.5676029934345321",
              "description": "Madrid biggest supermarket"
          }
      ]
  }
];



export const parseToClient = (point) => {
  const clientPoint = {
    ...point,
    basePrice: point['base_price'],
    dateFrom: point['date_from'],
    dateTo: point['date_to'],
    isFavorite: point['is_favorite'],
  };

  delete clientPoint['is_favorite'];
  delete clientPoint['base_price'];
  delete clientPoint['date_from'];
  delete clientPoint['date_to'];

  return clientPoint
}


export const parseToServer = (point) => {
  const serverPoint = {
    ...point,
    'base_price': point.basePrice,
    'date_from': point.dateFrom,
    'date_to': point.dateTo,
    'is_favorite': point.isFavorite,
  };

  delete serverPoint.basePrice;
  delete serverPoint.dateFrom;
  delete serverPoint.dateTo;
  delete serverPoint.isFavorite;

  return serverPoint
}



export const POINTS = [
  {
      "id": "0",
      "type": "drive",
      "date_from": "2021-09-11T03:30:35.020Z",
      "date_to": "2021-09-11T20:07:36.199Z",
      "destination": {
          "name": "Valencia",
          "description": "Valencia, a true asian pearl, famous for its crowded street markets with the best street food in Asia.",
          "pictures": [
              {
                  "src": "http://picsum.photos/300/200?r=0.3354931089563189",
                  "description": "Valencia park"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.27639221873843467",
                  "description": "Valencia central station"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.42235785006826054",
                  "description": "Valencia zoo"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.90448771016556",
                  "description": "Valencia street market"
              }
          ]
      },
      "base_price": 700,
      "is_favorite": true,
      "offers": [
          {
              "title": "Choose comfort class",
              "price": 110
          }
      ]
  },
  {
      "id": "1",
      "type": "bus",
      "date_from": "2021-09-11T20:07:36.199Z",
      "date_to": "2021-09-12T10:02:39.789Z",
      "destination": {
          "name": "Geneva",
          "description": "Geneva, in a middle of Europe.",
          "pictures": [
              {
                  "src": "http://picsum.photos/300/200?r=0.26031488078468734",
                  "description": "Geneva central station"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.702356924757336",
                  "description": "Geneva biggest supermarket"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.7738047301249704",
                  "description": "Geneva kindergarten"
              }
          ]
      },
      "base_price": 900,
      "is_favorite": true,
      "offers": [
          {
              "title": "Infotainment system",
              "price": 50
          },
          {
              "title": "Order meal",
              "price": 100
          },
          {
              "title": "Choose seats",
              "price": 190
          }
      ]
  },
  {
      "id": "2",
      "type": "bus",
      "date_from": "2021-09-12T10:02:39.789Z",
      "date_to": "2021-09-13T08:08:10.905Z",
      "destination": {
          "name": "Nagasaki",
          "description": "Nagasaki, with crowded streets, for those who value comfort and coziness, with an embankment of a mighty river as a centre of attraction, famous for its crowded street markets with the best street food in Asia.",
          "pictures": [
              {
                  "src": "http://picsum.photos/300/200?r=0.600907098005395",
                  "description": "Nagasaki parliament building"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.1734021450710057",
                  "description": "Nagasaki street market"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.17237601409285808",
                  "description": "Nagasaki embankment"
              }
          ]
      },
      "base_price": 900,
      "is_favorite": false,
      "offers": [
          {
              "title": "Infotainment system",
              "price": 50
          },
          {
              "title": "Choose seats",
              "price": 190
          }
      ]
  }
];

// export const POINTS = [
//   {
//       "id": "0",
//       "type": "drive",
//       "date_from": "2021-09-11T03:30:35.020Z",
//       "date_to": "2021-09-11T20:07:36.199Z",
//       "destination": {
//           "name": "Valencia",
//           "description": "Valencia, a true asian pearl, famous for its crowded street markets with the best street food in Asia.",
//           "pictures": [
//               {
//                   "src": "http://picsum.photos/300/200?r=0.3354931089563189",
//                   "description": "Valencia park"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.27639221873843467",
//                   "description": "Valencia central station"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.42235785006826054",
//                   "description": "Valencia zoo"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.90448771016556",
//                   "description": "Valencia street market"
//               }
//           ]
//       },
//       "base_price": 700,
//       "is_favorite": true,
//       "offers": [
//           {
//               "title": "Choose comfort class",
//               "price": 110
//           }
//       ]
//   },
//   {
//       "id": "1",
//       "type": "bus",
//       "date_from": "2021-09-11T20:07:36.199Z",
//       "date_to": "2021-09-12T10:02:39.789Z",
//       "destination": {
//           "name": "Geneva",
//           "description": "Geneva, in a middle of Europe.",
//           "pictures": [
//               {
//                   "src": "http://picsum.photos/300/200?r=0.26031488078468734",
//                   "description": "Geneva central station"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.702356924757336",
//                   "description": "Geneva biggest supermarket"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.7738047301249704",
//                   "description": "Geneva kindergarten"
//               }
//           ]
//       },
//       "base_price": 900,
//       "is_favorite": true,
//       "offers": [
//           {
//               "title": "Infotainment system",
//               "price": 50
//           },
//           {
//               "title": "Order meal",
//               "price": 100
//           },
//           {
//               "title": "Choose seats",
//               "price": 190
//           }
//       ]
//   },
//   {
//       "id": "2",
//       "type": "bus",
//       "date_from": "2021-09-12T10:02:39.789Z",
//       "date_to": "2021-09-13T08:08:10.905Z",
//       "destination": {
//           "name": "Nagasaki",
//           "description": "Nagasaki, with crowded streets, for those who value comfort and coziness, with an embankment of a mighty river as a centre of attraction, famous for its crowded street markets with the best street food in Asia.",
//           "pictures": [
//               {
//                   "src": "http://picsum.photos/300/200?r=0.600907098005395",
//                   "description": "Nagasaki parliament building"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.1734021450710057",
//                   "description": "Nagasaki street market"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.17237601409285808",
//                   "description": "Nagasaki embankment"
//               }
//           ]
//       },
//       "base_price": 900,
//       "is_favorite": false,
//       "offers": [
//           {
//               "title": "Infotainment system",
//               "price": 50
//           },
//           {
//               "title": "Choose seats",
//               "price": 190
//           }
//       ]
//   },
//   {
//       "id": "3",
//       "type": "bus",
//       "date_from": "2021-09-13T08:08:10.905Z",
//       "date_to": "2021-09-14T01:29:25.528Z",
//       "destination": {
//           "name": "Tokio",
//           "description": "Tokio, with crowded streets, full of of cozy canteens where you can try the best coffee in the Middle East.",
//           "pictures": [
//               {
//                   "src": "http://picsum.photos/300/200?r=0.4103196403559721",
//                   "description": "Tokio biggest supermarket"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.7288776299614848",
//                   "description": "Tokio parliament building"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.40345629971001196",
//                   "description": "Tokio kindergarten"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.5091378589512867",
//                   "description": "Tokio city centre"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.7360711994838292",
//                   "description": "Tokio kindergarten"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.32938629382457196",
//                   "description": "Tokio central station"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.2743853679057875",
//                   "description": "Tokio embankment"
//               }
//           ]
//       },
//       "base_price": 1000,
//       "is_favorite": false,
//       "offers": [
//       ]
//   },
//   {
//       "id": "4",
//       "type": "sightseeing",
//       "date_from": "2021-09-14T01:29:25.528Z",
//       "date_to": "2021-09-14T19:24:15.985Z",
//       "destination": {
//           "name": "Oslo",
//           "description": "Oslo, middle-eastern paradise, with an embankment of a mighty river as a centre of attraction, famous for its crowded street markets with the best street food in Asia.",
//           "pictures": [
//               {
//                   "src": "http://picsum.photos/300/200?r=0.7306283245936374",
//                   "description": "Oslo parliament building"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.8231223453513674",
//                   "description": "Oslo zoo"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.2605997699121625",
//                   "description": "Oslo city centre"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.0010237327879811797",
//                   "description": "Oslo city centre"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.9443839687922677",
//                   "description": "Oslo park"
//               }
//           ]
//       },
//       "base_price": 1100,
//       "is_favorite": true,
//       "offers": []
//   },
//   {
//       "id": "5",
//       "type": "taxi",
//       "date_from": "2021-09-14T19:24:15.985Z",
//       "date_to": "2021-09-15T09:50:02.591Z",
//       "destination": {
//           "name": "Nagasaki",
//           "description": "Nagasaki, is a beautiful city, with crowded streets, with a beautiful old town, for those who value comfort and coziness.",
//           "pictures": [
//               {
//                   "src": "http://picsum.photos/300/200?r=0.08766227083521483",
//                   "description": "Nagasaki central station"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.738548756392633",
//                   "description": "Nagasaki parliament building"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.8919949448788431",
//                   "description": "Nagasaki embankment"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.9428111797476684",
//                   "description": "Nagasaki parliament building"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.7367956966502793",
//                   "description": "Nagasaki zoo"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.3150953067811513",
//                   "description": "Nagasaki embankment"
//               }
//           ]
//       },
//       "base_price": 1100,
//       "is_favorite": false,
//       "offers": [
//           {
//               "title": "Choose the radio station",
//               "price": 30
//           },
//           {
//               "title": "Choose temperature",
//               "price": 170
//           },
//           {
//               "title": "Drive quickly, I'm in a hurry",
//               "price": 100
//           },
//           {
//               "title": "Drive slowly",
//               "price": 110
//           }
//       ]
//   },
//   {
//       "id": "6",
//       "type": "flight",
//       "date_from": "2021-09-15T09:50:02.591Z",
//       "date_to": "2021-09-16T04:42:23.272Z",
//       "destination": {
//           "name": "Rotterdam",
//           "description": "Rotterdam, a true asian pearl, full of of cozy canteens where you can try the best coffee in the Middle East.",
//           "pictures": [
//               {
//                   "src": "http://picsum.photos/300/200?r=0.8440932011263917",
//                   "description": "Rotterdam embankment"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.26658243602566767",
//                   "description": "Rotterdam central station"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.6251776617394431",
//                   "description": "Rotterdam city centre"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.9527862613053975",
//                   "description": "Rotterdam park"
//               }
//           ]
//       },
//       "base_price": 400,
//       "is_favorite": false,
//       "offers": [
//           {
//               "title": "Choose meal",
//               "price": 120
//           },
//           {
//               "title": "Choose seats",
//               "price": 90
//           },
//           {
//               "title": "Add luggage",
//               "price": 170
//           },
//           {
//               "title": "Business lounge",
//               "price": 160
//           }
//       ]
//   },
//   {
//       "id": "7",
//       "type": "ship",
//       "date_from": "2021-09-16T04:42:23.272Z",
//       "date_to": "2021-09-16T12:37:46.944Z",
//       "destination": {
//           "name": "Nagasaki",
//           "description": "Nagasaki, is a beautiful city, a true asian pearl, with crowded streets.",
//           "pictures": [
//               {
//                   "src": "http://picsum.photos/300/200?r=0.8999698289303961",
//                   "description": "Nagasaki parliament building"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.01412226886225132",
//                   "description": "Nagasaki biggest supermarket"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.6438390361959689",
//                   "description": "Nagasaki parliament building"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.2416792477200782",
//                   "description": "Nagasaki embankment"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.07977462321048079",
//                   "description": "Nagasaki street market"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.8724533144162077",
//                   "description": "Nagasaki biggest supermarket"
//               }
//           ]
//       },
//       "base_price": 300,
//       "is_favorite": true,
//       "offers": [
//           {
//               "title": "Choose meal",
//               "price": 130
//           },
//           {
//               "title": "Upgrade to comfort class",
//               "price": 170
//           },
//           {
//               "title": "Business lounge",
//               "price": 40
//           }
//       ]
//   },
//   {
//       "id": "8",
//       "type": "train",
//       "date_from": "2021-09-16T12:37:46.944Z",
//       "date_to": "2021-09-17T07:30:22.454Z",
//       "destination": {
//           "name": "Venice",
//           "description": "Venice, is a beautiful city, in a middle of Europe, with a beautiful old town, middle-eastern paradise, with an embankment of a mighty river as a centre of attraction.",
//           "pictures": [
//               {
//                   "src": "http://picsum.photos/300/200?r=0.6781103627031695",
//                   "description": "Venice central station"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.6449167163026599",
//                   "description": "Venice park"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.35716289276186575",
//                   "description": "Venice park"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.6204269545525121",
//                   "description": "Venice park"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.549911580083217",
//                   "description": "Venice park"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.6774638010079987",
//                   "description": "Venice street market"
//               }
//           ]
//       },
//       "base_price": 600,
//       "is_favorite": false,
//       "offers": [
//           {
//               "title": "Book a taxi at the arrival point",
//               "price": 110
//           },
//           {
//               "title": "Order a breakfast",
//               "price": 80
//           },
//           {
//               "title": "Wake up at a certain time",
//               "price": 140
//           }
//       ]
//   },
//   {
//       "id": "9",
//       "type": "flight",
//       "date_from": "2021-09-17T07:30:22.454Z",
//       "date_to": "2021-09-18T06:24:30.835Z",
//       "destination": {
//           "name": "Nagasaki",
//           "description": "Nagasaki, middle-eastern paradise, for those who value comfort and coziness.",
//           "pictures": [
//               {
//                   "src": "http://picsum.photos/300/200?r=0.07523056857541244",
//                   "description": "Nagasaki embankment"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.06917951230460795",
//                   "description": "Nagasaki biggest supermarket"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.40480416836498634",
//                   "description": "Nagasaki city centre"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.8680048168314929",
//                   "description": "Nagasaki park"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.7427133409554949",
//                   "description": "Nagasaki biggest supermarket"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.18665265716827917",
//                   "description": "Nagasaki street market"
//               }
//           ]
//       },
//       "base_price": 500,
//       "is_favorite": false,
//       "offers": [
//           {
//               "title": "Choose seats",
//               "price": 90
//           },
//           {
//               "title": "Business lounge",
//               "price": 160
//           }
//       ]
//   },
//   {
//       "id": "10",
//       "type": "ship",
//       "date_from": "2021-09-18T06:24:30.835Z",
//       "date_to": "2021-09-18T22:16:12.521Z",
//       "destination": {
//           "name": "Valencia",
//           "description": "Valencia, is a beautiful city, middle-eastern paradise, full of of cozy canteens where you can try the best coffee in the Middle East.",
//           "pictures": [
//               {
//                   "src": "http://picsum.photos/300/200?r=0.7283241565042051",
//                   "description": "Valencia kindergarten"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.6224282029552421",
//                   "description": "Valencia embankment"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.9648112253053174",
//                   "description": "Valencia zoo"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.6521775789754667",
//                   "description": "Valencia kindergarten"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.42906100156279403",
//                   "description": "Valencia embankment"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.9505104981068067",
//                   "description": "Valencia city centre"
//               }
//           ]
//       },
//       "base_price": 900,
//       "is_favorite": false,
//       "offers": [
//           {
//               "title": "Choose meal",
//               "price": 130
//           },
//           {
//               "title": "Upgrade to comfort class",
//               "price": 170
//           },
//           {
//               "title": "Upgrade to business class",
//               "price": 150
//           },
//           {
//               "title": "Business lounge",
//               "price": 40
//           }
//       ]
//   },
//   {
//       "id": "11",
//       "type": "check-in",
//       "date_from": "2021-09-18T22:16:12.521Z",
//       "date_to": "2021-09-19T01:31:51.992Z",
//       "destination": {
//           "name": "Tokio",
//           "description": "Tokio, is a beautiful city, a true asian pearl, full of of cozy canteens where you can try the best coffee in the Middle East, a perfect place to stay with a family.",
//           "pictures": [
//               {
//                   "src": "http://picsum.photos/300/200?r=0.6269857078489289",
//                   "description": "Tokio central station"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.31559924612395984",
//                   "description": "Tokio zoo"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.7498511245051496",
//                   "description": "Tokio biggest supermarket"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.097277682740887",
//                   "description": "Tokio biggest supermarket"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.7616966705854207",
//                   "description": "Tokio street market"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.7147970660856728",
//                   "description": "Tokio central station"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.7392872432371422",
//                   "description": "Tokio city centre"
//               }
//           ]
//       },
//       "base_price": 1000,
//       "is_favorite": true,
//       "offers": [
//           {
//               "title": "Choose the time of check-in",
//               "price": 70
//           },
//           {
//               "title": "Choose the time of check-out",
//               "price": 190
//           },
//           {
//               "title": "Add breakfast",
//               "price": 110
//           },
//           {
//               "title": "Laundry",
//               "price": 140
//           }
//       ]
//   },
//   {
//       "id": "12",
//       "type": "bus",
//       "date_from": "2021-09-19T01:31:51.992Z",
//       "date_to": "2021-09-19T21:30:49.758Z",
//       "destination": {
//           "name": "Sochi",
//           "description": "Sochi, in a middle of Europe, with an embankment of a mighty river as a centre of attraction.",
//           "pictures": [
//               {
//                   "src": "http://picsum.photos/300/200?r=0.836808618069685",
//                   "description": "Sochi park"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.4466172755860731",
//                   "description": "Sochi biggest supermarket"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.01872342898297874",
//                   "description": "Sochi zoo"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.22272878273606223",
//                   "description": "Sochi biggest supermarket"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.7646207822218611",
//                   "description": "Sochi parliament building"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.6167969576085188",
//                   "description": "Sochi central station"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.5757998696816651",
//                   "description": "Sochi embankment"
//               }
//           ]
//       },
//       "base_price": 700,
//       "is_favorite": false,
//       "offers": [
//           {
//               "title": "Infotainment system",
//               "price": 50
//           },
//           {
//               "title": "Order meal",
//               "price": 100
//           },
//           {
//               "title": "Choose seats",
//               "price": 190
//           }
//       ]
//   },
//   {
//       "id": "13",
//       "type": "ship",
//       "date_from": "2021-09-19T21:30:49.758Z",
//       "date_to": "2021-09-20T00:32:40.888Z",
//       "destination": {
//           "name": "Monaco",
//           "description": "Monaco, a true asian pearl, with a beautiful old town, with an embankment of a mighty river as a centre of attraction, famous for its crowded street markets with the best street food in Asia.",
//           "pictures": [
//               {
//                   "src": "http://picsum.photos/300/200?r=0.7489015844778233",
//                   "description": "Monaco street market"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.5850327395642558",
//                   "description": "Monaco parliament building"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.7363300411843603",
//                   "description": "Monaco zoo"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.945935256144492",
//                   "description": "Monaco central station"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.5888891477289231",
//                   "description": "Monaco parliament building"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.6447420383914657",
//                   "description": "Monaco park"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.15130504754100915",
//                   "description": "Monaco zoo"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.5377721880167761",
//                   "description": "Monaco street market"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.10382896724205892",
//                   "description": "Monaco embankment"
//               }
//           ]
//       },
//       "base_price": 700,
//       "is_favorite": false,
//       "offers": [
//           {
//               "title": "Choose seats",
//               "price": 160
//           },
//           {
//               "title": "Add luggage",
//               "price": 100
//           },
//           {
//               "title": "Business lounge",
//               "price": 40
//           }
//       ]
//   },
//   {
//       "id": "14",
//       "type": "check-in",
//       "date_from": "2021-09-20T00:32:40.888Z",
//       "date_to": "2021-09-20T20:08:28.735Z",
//       "destination": {
//           "name": "Monaco",
//           "description": "Monaco, with crowded streets, in a middle of Europe, for those who value comfort and coziness.",
//           "pictures": [
//               {
//                   "src": "http://picsum.photos/300/200?r=0.6962462188674261",
//                   "description": "Monaco central station"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.7674231098070936",
//                   "description": "Monaco parliament building"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.8842043512606712",
//                   "description": "Monaco parliament building"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.8196533462114735",
//                   "description": "Monaco parliament building"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.6522480409312446",
//                   "description": "Monaco city centre"
//               }
//           ]
//       },
//       "base_price": 400,
//       "is_favorite": false,
//       "offers": [
//           {
//               "title": "Add breakfast",
//               "price": 110
//           },
//           {
//               "title": "Laundry",
//               "price": 140
//           }
//       ]
//   },
//   {
//       "id": "15",
//       "type": "sightseeing",
//       "date_from": "2021-09-20T20:08:28.735Z",
//       "date_to": "2021-09-21T03:33:23.718Z",
//       "destination": {
//           "name": "Hiroshima",
//           "description": "Hiroshima, a true asian pearl, middle-eastern paradise.",
//           "pictures": [
//               {
//                   "src": "http://picsum.photos/300/200?r=0.2826817617227171",
//                   "description": "Hiroshima street market"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.09083573078410057",
//                   "description": "Hiroshima parliament building"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.7743373515561673",
//                   "description": "Hiroshima kindergarten"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.8283504363100467",
//                   "description": "Hiroshima park"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.25740666701123693",
//                   "description": "Hiroshima zoo"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.04485935445904521",
//                   "description": "Hiroshima parliament building"
//               }
//           ]
//       },
//       "base_price": 700,
//       "is_favorite": false,
//       "offers": []
//   },
//   {
//       "id": "16",
//       "type": "flight",
//       "date_from": "2021-09-21T03:33:23.718Z",
//       "date_to": "2021-09-21T23:12:38.018Z",
//       "destination": {
//           "name": "Rotterdam",
//           "description": "Rotterdam, is a beautiful city, famous for its crowded street markets with the best street food in Asia.",
//           "pictures": [
//               {
//                   "src": "http://picsum.photos/300/200?r=0.9023104570241374",
//                   "description": "Rotterdam park"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.34901299354778303",
//                   "description": "Rotterdam park"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.4940164871757413",
//                   "description": "Rotterdam embankment"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.803813338743907",
//                   "description": "Rotterdam central station"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.9131198977176529",
//                   "description": "Rotterdam city centre"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.9481094300966846",
//                   "description": "Rotterdam biggest supermarket"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.23707440432387417",
//                   "description": "Rotterdam kindergarten"
//               }
//           ]
//       },
//       "base_price": 800,
//       "is_favorite": false,
//       "offers": []
//   },
//   {
//       "id": "17",
//       "type": "sightseeing",
//       "date_from": "2021-09-21T23:12:38.018Z",
//       "date_to": "2021-09-22T07:47:25.686Z",
//       "destination": {
//           "name": "Vien",
//           "description": "Vien, is a beautiful city, a true asian pearl, with crowded streets, with a beautiful old town.",
//           "pictures": [
//               {
//                   "src": "http://picsum.photos/300/200?r=0.003877016698925262",
//                   "description": "Vien park"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.8139881863603011",
//                   "description": "Vien zoo"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.21317520794331757",
//                   "description": "Vien biggest supermarket"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.8962153975013472",
//                   "description": "Vien biggest supermarket"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.12276692713707393",
//                   "description": "Vien biggest supermarket"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.7402517959300221",
//                   "description": "Vien zoo"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.43181318097784605",
//                   "description": "Vien parliament building"
//               }
//           ]
//       },
//       "base_price": 400,
//       "is_favorite": false,
//       "offers": []
//   },
//   {
//       "id": "18",
//       "type": "flight",
//       "date_from": "2021-09-22T07:47:25.686Z",
//       "date_to": "2021-09-23T01:23:50.078Z",
//       "destination": {
//           "name": "Milan",
//           "description": "Milan, is a beautiful city, with a beautiful old town, with an embankment of a mighty river as a centre of attraction, a perfect place to stay with a family, famous for its crowded street markets with the best street food in Asia.",
//           "pictures": [
//               {
//                   "src": "http://picsum.photos/300/200?r=0.3610825764711174",
//                   "description": "Milan street market"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.11734338783652198",
//                   "description": "Milan kindergarten"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.2865150509204024",
//                   "description": "Milan parliament building"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.7761803102059992",
//                   "description": "Milan street market"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.15948620098350252",
//                   "description": "Milan kindergarten"
//               }
//           ]
//       },
//       "base_price": 700,
//       "is_favorite": true,
//       "offers": [
//           {
//               "title": "Choose seats",
//               "price": 90
//           },
//           {
//               "title": "Add luggage",
//               "price": 170
//           },
//           {
//               "title": "Business lounge",
//               "price": 160
//           }
//       ]
//   },
//   {
//       "id": "19",
//       "type": "restaurant",
//       "date_from": "2021-09-23T01:23:50.078Z",
//       "date_to": "2021-09-23T21:08:19.132Z",
//       "destination": {
//           "name": "Venice",
//           "description": "Venice, is a beautiful city, in a middle of Europe, for those who value comfort and coziness, with an embankment of a mighty river as a centre of attraction, a perfect place to stay with a family.",
//           "pictures": [
//               {
//                   "src": "http://picsum.photos/300/200?r=0.6802880428653366",
//                   "description": "Venice embankment"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.7415152685632718",
//                   "description": "Venice parliament building"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.9426435802866502",
//                   "description": "Venice parliament building"
//               },
//               {
//                   "src": "http://picsum.photos/300/200?r=0.09171302560958972",
//                   "description": "Venice central station"
//               }
//           ]
//       },
//       "base_price": 400,
//       "is_favorite": false,
//       "offers": [
//           {
//               "title": "Choose live music",
//               "price": 150
//           },
//           {
//               "title": "Choose VIP area",
//               "price": 70
//           }
//       ]
//   }
// ];
