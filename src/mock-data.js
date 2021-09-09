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
      "description": "Chamonix, is a beautiful city, a true asian pearl, in a middle of Europe, middle-eastern paradise, a perfect place to stay with a family.",
      "pictures": [
          {
              "src": "http://picsum.photos/300/200?r=0.09346020979784919",
              "description": "Chamonix kindergarten"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.6108394550462539",
              "description": "Chamonix biggest supermarket"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.9916426431866623",
              "description": "Chamonix zoo"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.3998586664938306",
              "description": "Chamonix city centre"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.4237407755545355",
              "description": "Chamonix city centre"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.9467658765893245",
              "description": "Chamonix kindergarten"
          }
      ]
  },
  {
      "name": "Geneva",
      "description": "Geneva, a true asian pearl, with crowded streets, with a beautiful old town, middle-eastern paradise, with an embankment of a mighty river as a centre of attraction, full of of cozy canteens where you can try the best coffee in the Middle East, famous for its crowded street markets with the best street food in Asia.",
      "pictures": [
          {
              "src": "http://picsum.photos/300/200?r=0.12289340548062566",
              "description": "Geneva embankment"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.757367587553452",
              "description": "Geneva city centre"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.7496761552198985",
              "description": "Geneva street market"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.5644417603800997",
              "description": "Geneva kindergarten"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.849945560340007",
              "description": "Geneva park"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.3581811503166432",
              "description": "Geneva city centre"
          }
      ]
  },
  {
      "name": "Amsterdam",
      "description": "Amsterdam, in a middle of Europe, middle-eastern paradise, for those who value comfort and coziness, a perfect place to stay with a family.",
      "pictures": [
          {
              "src": "http://picsum.photos/300/200?r=0.5781336252464777",
              "description": "Amsterdam biggest supermarket"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.037442292053833315",
              "description": "Amsterdam park"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.01640123390287007",
              "description": "Amsterdam kindergarten"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.6887556377482627",
              "description": "Amsterdam embankment"
          }
      ]
  },
  {
      "name": "Helsinki",
      "description": "Helsinki, is a beautiful city, a true asian pearl, with crowded streets, with a beautiful old town, middle-eastern paradise, a perfect place to stay with a family.",
      "pictures": [
          {
              "src": "http://picsum.photos/300/200?r=0.30622128651558067",
              "description": "Helsinki park"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.520112601398959",
              "description": "Helsinki street market"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.06640737421833975",
              "description": "Helsinki park"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.9020919138971113",
              "description": "Helsinki city centre"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.41315398105564305",
              "description": "Helsinki embankment"
          }
      ]
  },
  {
      "name": "Oslo",
      "description": "Oslo, for those who value comfort and coziness.",
      "pictures": [
          {
              "src": "http://picsum.photos/300/200?r=0.2659692056037364",
              "description": "Oslo park"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.49278745883421604",
              "description": "Oslo central station"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.7455670066471423",
              "description": "Oslo street market"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.6190206058434207",
              "description": "Oslo central station"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.6919559588645292",
              "description": "Oslo parliament building"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.5350722436166904",
              "description": "Oslo parliament building"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.5203736535365795",
              "description": "Oslo kindergarten"
          }
      ]
  },
  {
      "name": "Kopenhagen",
      "description": "Kopenhagen, is a beautiful city, a true asian pearl, with crowded streets, in a middle of Europe, with a beautiful old town, middle-eastern paradise.",
      "pictures": [
          {
              "src": "http://picsum.photos/300/200?r=0.9327971804660999",
              "description": "Kopenhagen street market"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.47161833016886323",
              "description": "Kopenhagen city centre"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.7876507976111422",
              "description": "Kopenhagen zoo"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.5037740983944632",
              "description": "Kopenhagen street market"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.6624101412674415",
              "description": "Kopenhagen city centre"
          }
      ]
  },
  {
      "name": "Den Haag",
      "description": "Den Haag, a true asian pearl, in a middle of Europe.",
      "pictures": [
          {
              "src": "http://picsum.photos/300/200?r=0.5501757633588138",
              "description": "Den Haag parliament building"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.9420914815991601",
              "description": "Den Haag embankment"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.19680921399484275",
              "description": "Den Haag kindergarten"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.2105772795284444",
              "description": "Den Haag zoo"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.963873569942884",
              "description": "Den Haag kindergarten"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.5938181833221658",
              "description": "Den Haag city centre"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.1133045765168732",
              "description": "Den Haag zoo"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.20274277877940583",
              "description": "Den Haag central station"
          }
      ]
  },
  {
      "name": "Rotterdam",
      "description": "Rotterdam, is a beautiful city, a true asian pearl, for those who value comfort and coziness, full of of cozy canteens where you can try the best coffee in the Middle East.",
      "pictures": [
          {
              "src": "http://picsum.photos/300/200?r=0.8560358523246347",
              "description": "Rotterdam city centre"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.8546397186295804",
              "description": "Rotterdam embankment"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.5022796863336003",
              "description": "Rotterdam park"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.29728409835470115",
              "description": "Rotterdam park"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.1392351316927496",
              "description": "Rotterdam biggest supermarket"
          }
      ]
  },
  {
      "name": "Saint Petersburg",
      "description": "Saint Petersburg, with a beautiful old town, a perfect place to stay with a family.",
      "pictures": [
          {
              "src": "http://picsum.photos/300/200?r=0.20091404440597183",
              "description": "Saint Petersburg street market"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.627480472566688",
              "description": "Saint Petersburg parliament building"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.6764016028022384",
              "description": "Saint Petersburg biggest supermarket"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.6211810459300682",
              "description": "Saint Petersburg city centre"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.5662088541075831",
              "description": "Saint Petersburg kindergarten"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.8831900323216137",
              "description": "Saint Petersburg embankment"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.67751566523842",
              "description": "Saint Petersburg kindergarten"
          }
      ]
  },
  {
      "name": "Moscow",
      "description": "Moscow, a true asian pearl, with a beautiful old town, for those who value comfort and coziness, with an embankment of a mighty river as a centre of attraction, famous for its crowded street markets with the best street food in Asia.",
      "pictures": [
          {
              "src": "http://picsum.photos/300/200?r=0.8346726897135683",
              "description": "Moscow biggest supermarket"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.3213555548162601",
              "description": "Moscow zoo"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.3743601889057071",
              "description": "Moscow central station"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.830174989023666",
              "description": "Moscow zoo"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.39718729726890967",
              "description": "Moscow park"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.06781053118290137",
              "description": "Moscow street market"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.5937801018683186",
              "description": "Moscow biggest supermarket"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.611428898169232",
              "description": "Moscow parliament building"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.36572820898724334",
              "description": "Moscow zoo"
          }
      ]
  },
  {
      "name": "Sochi",
      "description": "Sochi, with a beautiful old town, middle-eastern paradise, with an embankment of a mighty river as a centre of attraction.",
      "pictures": [
          {
              "src": "http://picsum.photos/300/200?r=0.7799015104705422",
              "description": "Sochi park"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.9012023107727181",
              "description": "Sochi street market"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.005028573576145501",
              "description": "Sochi biggest supermarket"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.4640753862374485",
              "description": "Sochi city centre"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.5802773196376592",
              "description": "Sochi zoo"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.8469020440105743",
              "description": "Sochi kindergarten"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.5517933035827001",
              "description": "Sochi city centre"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.33769858931435404",
              "description": "Sochi park"
          }
      ]
  },
  {
      "name": "Tokio",
      "description": "Tokio, is a beautiful city, with crowded streets.",
      "pictures": [
          {
              "src": "http://picsum.photos/300/200?r=0.4925695997796158",
              "description": "Tokio park"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.049647206964800183",
              "description": "Tokio park"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.12514415347426766",
              "description": "Tokio zoo"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.7718276304885832",
              "description": "Tokio central station"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.07507109642739751",
              "description": "Tokio kindergarten"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.13383917292607417",
              "description": "Tokio zoo"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.8377024173504077",
              "description": "Tokio zoo"
          }
      ]
  },
  {
      "name": "Kioto",
      "description": "Kioto, is a beautiful city, with crowded streets.",
      "pictures": [
          {
              "src": "http://picsum.photos/300/200?r=0.11569340607219347",
              "description": "Kioto city centre"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.6850150509287296",
              "description": "Kioto parliament building"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.9293249447421756",
              "description": "Kioto zoo"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.8643582305798627",
              "description": "Kioto kindergarten"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.4376849880752094",
              "description": "Kioto parliament building"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.6445466658134289",
              "description": "Kioto parliament building"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.10732356080234173",
              "description": "Kioto kindergarten"
          }
      ]
  },
  {
      "name": "Nagasaki",
      "description": "Nagasaki, is a beautiful city, with crowded streets, in a middle of Europe, middle-eastern paradise.",
      "pictures": [
          {
              "src": "http://picsum.photos/300/200?r=0.42769008475842885",
              "description": "Nagasaki parliament building"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.6968573586704887",
              "description": "Nagasaki biggest supermarket"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.9122317857975111",
              "description": "Nagasaki street market"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.3519104683129173",
              "description": "Nagasaki parliament building"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.9938771747153732",
              "description": "Nagasaki embankment"
          }
      ]
  },
  {
      "name": "Hiroshima",
      "description": "Hiroshima, a true asian pearl, full of of cozy canteens where you can try the best coffee in the Middle East.",
      "pictures": [
          {
              "src": "http://picsum.photos/300/200?r=0.5776213632638623",
              "description": "Hiroshima biggest supermarket"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.1646306431820619",
              "description": "Hiroshima embankment"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.9566554665821736",
              "description": "Hiroshima park"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.5818808181532382",
              "description": "Hiroshima central station"
          }
      ]
  },
  {
      "name": "Berlin",
      "description": "Berlin, for those who value comfort and coziness, full of of cozy canteens where you can try the best coffee in the Middle East, famous for its crowded street markets with the best street food in Asia.",
      "pictures": [
          {
              "src": "http://picsum.photos/300/200?r=0.5108024406123848",
              "description": "Berlin zoo"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.032122339351251084",
              "description": "Berlin street market"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.4575166996536846",
              "description": "Berlin city centre"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.7389214775214366",
              "description": "Berlin street market"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.43792547397780046",
              "description": "Berlin kindergarten"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.32105453955109886",
              "description": "Berlin park"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.30012025944731446",
              "description": "Berlin parliament building"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.07206714109552181",
              "description": "Berlin street market"
          }
      ]
  },
  {
      "name": "Munich",
      "description": "Munich, with a beautiful old town.",
      "pictures": [
          {
              "src": "http://picsum.photos/300/200?r=0.04490378324191835",
              "description": "Munich parliament building"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.7941740678237574",
              "description": "Munich park"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.17505642168519953",
              "description": "Munich central station"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.025393319726638053",
              "description": "Munich embankment"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.41885564405079667",
              "description": "Munich city centre"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.8357874594768613",
              "description": "Munich kindergarten"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.658360470571393",
              "description": "Munich central station"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.18675541544698038",
              "description": "Munich parliament building"
          }
      ]
  },
  {
      "name": "Frankfurt",
      "description": "Frankfurt, a perfect place to stay with a family.",
      "pictures": [
          {
              "src": "http://picsum.photos/300/200?r=0.11171302540962569",
              "description": "Frankfurt central station"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.42701525250671546",
              "description": "Frankfurt zoo"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.3471676068543257",
              "description": "Frankfurt embankment"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.8683453838988477",
              "description": "Frankfurt parliament building"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.46767828672770473",
              "description": "Frankfurt kindergarten"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.6277472700987243",
              "description": "Frankfurt biggest supermarket"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.8257597087957542",
              "description": "Frankfurt street market"
          }
      ]
  },
  {
      "name": "Vien",
      "description": "Vien, with a beautiful old town, famous for its crowded street markets with the best street food in Asia.",
      "pictures": [
          {
              "src": "http://picsum.photos/300/200?r=0.8599649092670878",
              "description": "Vien embankment"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.8821773899266772",
              "description": "Vien street market"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.21718537188234155",
              "description": "Vien city centre"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.46181370627413076",
              "description": "Vien central station"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.554287565373597",
              "description": "Vien street market"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.7792817016876881",
              "description": "Vien central station"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.14638099313151876",
              "description": "Vien embankment"
          }
      ]
  },
  {
      "name": "Rome",
      "description": "Rome, a true asian pearl, with a beautiful old town, with an embankment of a mighty river as a centre of attraction.",
      "pictures": [
          {
              "src": "http://picsum.photos/300/200?r=0.2358968745363157",
              "description": "Rome parliament building"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.24393452580228403",
              "description": "Rome street market"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.9800471883117599",
              "description": "Rome park"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.24715068506183702",
              "description": "Rome zoo"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.2861046584325362",
              "description": "Rome parliament building"
          }
      ]
  },
  {
      "name": "Naples",
      "description": "Naples, middle-eastern paradise, for those who value comfort and coziness.",
      "pictures": [
          {
              "src": "http://picsum.photos/300/200?r=0.6288098788708398",
              "description": "Naples biggest supermarket"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.9778957829399344",
              "description": "Naples parliament building"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.19427481509646993",
              "description": "Naples embankment"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.8682403263027147",
              "description": "Naples parliament building"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.3915323820166863",
              "description": "Naples kindergarten"
          }
      ]
  },
  {
      "name": "Venice",
      "description": "Venice, is a beautiful city, with a beautiful old town, full of of cozy canteens where you can try the best coffee in the Middle East.",
      "pictures": [
          {
              "src": "http://picsum.photos/300/200?r=0.8909207896548383",
              "description": "Venice park"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.7145360480654204",
              "description": "Venice embankment"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.5607569147789966",
              "description": "Venice street market"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.814005999516872",
              "description": "Venice street market"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.18024669860286457",
              "description": "Venice kindergarten"
          }
      ]
  },
  {
      "name": "Milan",
      "description": "Milan, full of of cozy canteens where you can try the best coffee in the Middle East.",
      "pictures": [
          {
              "src": "http://picsum.photos/300/200?r=0.1414170388060647",
              "description": "Milan zoo"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.46950122378294146",
              "description": "Milan biggest supermarket"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.4857808388761715",
              "description": "Milan kindergarten"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.8435798597399575",
              "description": "Milan street market"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.2614866544805947",
              "description": "Milan park"
          }
      ]
  },
  {
      "name": "Monaco",
      "description": "Monaco, a true asian pearl, in a middle of Europe, for those who value comfort and coziness, famous for its crowded street markets with the best street food in Asia.",
      "pictures": [
          {
              "src": "http://picsum.photos/300/200?r=0.9667508629588055",
              "description": "Monaco embankment"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.7784977529559698",
              "description": "Monaco biggest supermarket"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.18187437356915548",
              "description": "Monaco kindergarten"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.848557764483902",
              "description": "Monaco city centre"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.8054503825625099",
              "description": "Monaco zoo"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.5002961582567729",
              "description": "Monaco kindergarten"
          }
      ]
  },
  {
      "name": "Paris",
      "description": "Paris, is a beautiful city, with crowded streets, famous for its crowded street markets with the best street food in Asia.",
      "pictures": [
          {
              "src": "http://picsum.photos/300/200?r=0.8438015932777967",
              "description": "Paris embankment"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.2320617567837313",
              "description": "Paris street market"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.9280685109298912",
              "description": "Paris embankment"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.638814475928934",
              "description": "Paris zoo"
          }
      ]
  },
  {
      "name": "Barcelona",
      "description": "Barcelona, a true asian pearl, with crowded streets.",
      "pictures": [
          {
              "src": "http://picsum.photos/300/200?r=0.29417822089118206",
              "description": "Barcelona park"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.786145164373719",
              "description": "Barcelona park"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.8471083489835043",
              "description": "Barcelona central station"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.8403268899936334",
              "description": "Barcelona city centre"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.607630295630426",
              "description": "Barcelona city centre"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.6676873840669972",
              "description": "Barcelona kindergarten"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.06542684521818054",
              "description": "Barcelona street market"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.734685475128076",
              "description": "Barcelona central station"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.6951796304829907",
              "description": "Barcelona kindergarten"
          }
      ]
  },
  {
      "name": "Valencia",
      "description": "Valencia, with a beautiful old town, middle-eastern paradise, for those who value comfort and coziness, with an embankment of a mighty river as a centre of attraction, a perfect place to stay with a family.",
      "pictures": [
          {
              "src": "http://picsum.photos/300/200?r=0.4817525250832124",
              "description": "Valencia central station"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.6916928435507268",
              "description": "Valencia park"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.36385100998883124",
              "description": "Valencia park"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.18939053044717236",
              "description": "Valencia biggest supermarket"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.6197597020456276",
              "description": "Valencia park"
          }
      ]
  },
  {
      "name": "Madrid",
      "description": "Madrid, middle-eastern paradise, for those who value comfort and coziness, full of of cozy canteens where you can try the best coffee in the Middle East, famous for its crowded street markets with the best street food in Asia.",
      "pictures": [
          {
              "src": "http://picsum.photos/300/200?r=0.06726449995085604",
              "description": "Madrid park"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.9902325294305128",
              "description": "Madrid street market"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.0883612500525266",
              "description": "Madrid street market"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.809201507124667",
              "description": "Madrid central station"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.04997587655955682",
              "description": "Madrid central station"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.6348118750753782",
              "description": "Madrid street market"
          },
          {
              "src": "http://picsum.photos/300/200?r=0.1329758882602472",
              "description": "Madrid zoo"
          }
      ]
  }
];

































export const POINTS = [
  {
      "base_price": 2222,
      "date_from": "2021-09-06T09:00:00.000Z",
      "date_to": "2021-09-08T09:00:00.000Z",
      "destination": {
          "name": "Venice",
          "description": "Venice, is a beautiful city, with a beautiful old town, full of of cozy canteens where you can try the best coffee in the Middle East.",
          "pictures": [
              {
                  "src": "http://picsum.photos/300/200?r=0.8909207896548383",
                  "description": "Venice park"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.7145360480654204",
                  "description": "Venice embankment"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.5607569147789966",
                  "description": "Venice street market"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.814005999516872",
                  "description": "Venice street market"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.18024669860286457",
                  "description": "Venice kindergarten"
              }
          ]
      },
      "is_favorite": true,
      "offers": [
          {
              "title": "Choose business class",
              "price": 180
          }
      ],
      "type": "check-in",
      "id": "24"
  },
  {
      "type": "taxi",
      "destination": {
          "name": "Geneva",
          "description": "Geneva, a true asian pearl, with crowded streets, with a beautiful old town, middle-eastern paradise, with an embankment of a mighty river as a centre of attraction, full of of cozy canteens where you can try the best coffee in the Middle East, famous for its crowded street markets with the best street food in Asia.",
          "pictures": [
              {
                  "src": "http://picsum.photos/300/200?r=0.12289340548062566",
                  "description": "Geneva embankment"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.757367587553452",
                  "description": "Geneva city centre"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.7496761552198985",
                  "description": "Geneva street market"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.5644417603800997",
                  "description": "Geneva kindergarten"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.849945560340007",
                  "description": "Geneva park"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.3581811503166432",
                  "description": "Geneva city centre"
              }
          ]
      },
      "offers": [
          {
              "title": "Drive quickly, I'm in a hurry",
              "price": 100
          }
      ],
      "base_price": 160,
      "date_from": "2021-09-10T08:56:00.000Z",
      "date_to": "2021-09-19T09:00:00.000Z",
      "is_favorite": true,
      "id": "26"
  },
  {
      "type": "ship",
      "base_price": 10,
      "date_from": "2021-09-09T12:02:11.013Z",
      "date_to": "2021-09-09T13:02:11.000Z",
      "is_favorite": false,
      "offers": [
          {
              "title": "Choose meal",
              "price": 130
          }
      ],
      "destination": {
          "name": "Vien",
          "description": "Vien, with a beautiful old town, famous for its crowded street markets with the best street food in Asia.",
          "pictures": [
              {
                  "src": "http://picsum.photos/300/200?r=0.8599649092670878",
                  "description": "Vien embankment"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.8821773899266772",
                  "description": "Vien street market"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.21718537188234155",
                  "description": "Vien city centre"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.46181370627413076",
                  "description": "Vien central station"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.554287565373597",
                  "description": "Vien street market"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.7792817016876881",
                  "description": "Vien central station"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.14638099313151876",
                  "description": "Vien embankment"
              }
          ]
      },
      "id": "27"
  },
  {
      "type": "train",
      "id": "28",
      "base_price": 333,
      "date_from": "2021-09-08T09:00:00.000Z",
      "date_to": "2021-09-22T09:00:00.000Z",
      "is_favorite": true,
      "offers": [],
      "destination": {
          "description": "Kopenhagen, is a beautiful city, a true asian pearl, with crowded streets, in a middle of Europe, with a beautiful old town, middle-eastern paradise.",
          "name": "Kopenhagen",
          "pictures": [
              {
                  "src": "http://picsum.photos/300/200?r=0.9327971804660999",
                  "description": "Kopenhagen street market"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.47161833016886323",
                  "description": "Kopenhagen city centre"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.7876507976111422",
                  "description": "Kopenhagen zoo"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.5037740983944632",
                  "description": "Kopenhagen street market"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.6624101412674415",
                  "description": "Kopenhagen city centre"
              }
          ]
      }
  },
  {
      "type": "bus",
      "id": "29",
      "base_price": 333,
      "date_from": "2021-10-04T09:00:00.000Z",
      "date_to": "2021-10-08T09:00:00.000Z",
      "is_favorite": true,
      "offers": [],
      "destination": {
          "description": "Geneva, a true asian pearl, with crowded streets, with a beautiful old town, middle-eastern paradise, with an embankment of a mighty river as a centre of attraction, full of of cozy canteens where you can try the best coffee in the Middle East, famous for its crowded street markets with the best street food in Asia.",
          "name": "Geneva",
          "pictures": [
              {
                  "src": "http://picsum.photos/300/200?r=0.12289340548062566",
                  "description": "Geneva embankment"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.757367587553452",
                  "description": "Geneva city centre"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.7496761552198985",
                  "description": "Geneva street market"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.5644417603800997",
                  "description": "Geneva kindergarten"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.849945560340007",
                  "description": "Geneva park"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.3581811503166432",
                  "description": "Geneva city centre"
              }
          ]
      }
  },
  {
      "base_price": 234,
      "date_from": "2021-09-10T09:00:00.000Z",
      "date_to": "2021-09-01T09:00:00.000Z",
      "destination": {
          "description": "Geneva, a true asian pearl, with crowded streets, with a beautiful old town, middle-eastern paradise, with an embankment of a mighty river as a centre of attraction, full of of cozy canteens where you can try the best coffee in the Middle East, famous for its crowded street markets with the best street food in Asia.",
          "name": "Geneva",
          "pictures": [
              {
                  "src": "http://picsum.photos/300/200?r=0.12289340548062566",
                  "description": "Geneva embankment"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.757367587553452",
                  "description": "Geneva city centre"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.7496761552198985",
                  "description": "Geneva street market"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.5644417603800997",
                  "description": "Geneva kindergarten"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.849945560340007",
                  "description": "Geneva park"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.3581811503166432",
                  "description": "Geneva city centre"
              }
          ]
      },
      "is_favorite": false,
      "offers": [],
      "type": "bus",
      "id": "30"
  },
  {
      "base_price": 123,
      "date_from": "2021-09-09T09:00:00.000Z",
      "date_to": "2021-09-01T09:00:00.000Z",
      "destination": {
          "description": "Oslo, for those who value comfort and coziness.",
          "name": "Oslo",
          "pictures": [
              {
                  "src": "http://picsum.photos/300/200?r=0.2659692056037364",
                  "description": "Oslo park"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.49278745883421604",
                  "description": "Oslo central station"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.7455670066471423",
                  "description": "Oslo street market"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.6190206058434207",
                  "description": "Oslo central station"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.6919559588645292",
                  "description": "Oslo parliament building"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.5350722436166904",
                  "description": "Oslo parliament building"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.5203736535365795",
                  "description": "Oslo kindergarten"
              }
          ]
      },
      "is_favorite": false,
      "offers": [],
      "type": "bus",
      "id": "31"
  },
  {
      "base_price": 12332,
      "date_from": "2021-09-22T09:00:00.000Z",
      "date_to": "2021-09-24T08:00:00.000Z",
      "destination": {
          "description": "Tokio, is a beautiful city, with crowded streets.",
          "name": "Tokio",
          "pictures": [
              {
                  "src": "http://picsum.photos/300/200?r=0.4925695997796158",
                  "description": "Tokio park"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.049647206964800183",
                  "description": "Tokio park"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.12514415347426766",
                  "description": "Tokio zoo"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.7718276304885832",
                  "description": "Tokio central station"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.07507109642739751",
                  "description": "Tokio kindergarten"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.13383917292607417",
                  "description": "Tokio zoo"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.8377024173504077",
                  "description": "Tokio zoo"
              }
          ]
      },
      "is_favorite": true,
      "offers": [
          {
              "title": "Upgrade to comfort class",
              "price": 120
          }
      ],
      "type": "flight",
      "id": "32"
  },
  {
      "base_price": 0,
      "date_from": "2021-09-01T09:00:00.000Z",
      "date_to": "2021-09-09T09:00:00.000Z",
      "destination": {
          "description": "Geneva, a true asian pearl, with crowded streets, with a beautiful old town, middle-eastern paradise, with an embankment of a mighty river as a centre of attraction, full of of cozy canteens where you can try the best coffee in the Middle East, famous for its crowded street markets with the best street food in Asia.",
          "name": "Geneva",
          "pictures": [
              {
                  "src": "http://picsum.photos/300/200?r=0.12289340548062566",
                  "description": "Geneva embankment"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.757367587553452",
                  "description": "Geneva city centre"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.7496761552198985",
                  "description": "Geneva street market"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.5644417603800997",
                  "description": "Geneva kindergarten"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.849945560340007",
                  "description": "Geneva park"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.3581811503166432",
                  "description": "Geneva city centre"
              }
          ]
      },
      "is_favorite": true,
      "offers": [],
      "type": "bus",
      "id": "33"
  },
  {
      "base_price": 0,
      "date_from": "2021-09-01T09:00:00.000Z",
      "date_to": "2021-09-09T09:00:00.000Z",
      "destination": {
          "description": "Geneva, a true asian pearl, with crowded streets, with a beautiful old town, middle-eastern paradise, with an embankment of a mighty river as a centre of attraction, full of of cozy canteens where you can try the best coffee in the Middle East, famous for its crowded street markets with the best street food in Asia.",
          "name": "Geneva",
          "pictures": [
              {
                  "src": "http://picsum.photos/300/200?r=0.12289340548062566",
                  "description": "Geneva embankment"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.757367587553452",
                  "description": "Geneva city centre"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.7496761552198985",
                  "description": "Geneva street market"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.5644417603800997",
                  "description": "Geneva kindergarten"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.849945560340007",
                  "description": "Geneva park"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.3581811503166432",
                  "description": "Geneva city centre"
              }
          ]
      },
      "is_favorite": true,
      "offers": [],
      "type": "bus",
      "id": "34"
  },
  {
      "base_price": 321,
      "date_from": "2021-09-09T09:00:00.000Z",
      "date_to": "2021-09-01T09:00:00.000Z",
      "destination": {
          "description": "Geneva, a true asian pearl, with crowded streets, with a beautiful old town, middle-eastern paradise, with an embankment of a mighty river as a centre of attraction, full of of cozy canteens where you can try the best coffee in the Middle East, famous for its crowded street markets with the best street food in Asia.",
          "name": "Geneva",
          "pictures": [
              {
                  "src": "http://picsum.photos/300/200?r=0.12289340548062566",
                  "description": "Geneva embankment"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.757367587553452",
                  "description": "Geneva city centre"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.7496761552198985",
                  "description": "Geneva street market"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.5644417603800997",
                  "description": "Geneva kindergarten"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.849945560340007",
                  "description": "Geneva park"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.3581811503166432",
                  "description": "Geneva city centre"
              }
          ]
      },
      "is_favorite": false,
      "offers": [],
      "type": "flight",
      "id": "35"
  },
  {
      "base_price": 5,
      "date_from": "2021-09-07T09:00:00.000Z",
      "date_to": "2021-09-09T09:00:00.000Z",
      "destination": {
          "description": "Paris, is a beautiful city, with crowded streets, famous for its crowded street markets with the best street food in Asia.",
          "name": "Paris",
          "pictures": [
              {
                  "src": "http://picsum.photos/300/200?r=0.8438015932777967",
                  "description": "Paris embankment"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.2320617567837313",
                  "description": "Paris street market"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.9280685109298912",
                  "description": "Paris embankment"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.638814475928934",
                  "description": "Paris zoo"
              }
          ]
      },
      "is_favorite": false,
      "offers": [
          {
              "title": "Choose live music",
              "price": 150
          }
      ],
      "type": "restaurant",
      "id": "36"
  },
  {
      "base_price": 123,
      "date_from": "2021-09-03T09:00:00.000Z",
      "date_to": "2021-09-07T09:00:00.000Z",
      "destination": {
          "description": "Helsinki, is a beautiful city, a true asian pearl, with crowded streets, with a beautiful old town, middle-eastern paradise, a perfect place to stay with a family.",
          "name": "Helsinki",
          "pictures": [
              {
                  "src": "http://picsum.photos/300/200?r=0.30622128651558067",
                  "description": "Helsinki park"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.520112601398959",
                  "description": "Helsinki street market"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.06640737421833975",
                  "description": "Helsinki park"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.9020919138971113",
                  "description": "Helsinki city centre"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.41315398105564305",
                  "description": "Helsinki embankment"
              }
          ]
      },
      "is_favorite": false,
      "offers": [
          {
              "title": "Upgrade to business class",
              "price": 120
          }
      ],
      "type": "flight",
      "id": "38"
  },
  {
      "base_price": 123,
      "date_from": "2021-09-07T09:00:00.000Z",
      "date_to": "2021-08-30T09:00:00.000Z",
      "destination": {
          "description": "Helsinki, is a beautiful city, a true asian pearl, with crowded streets, with a beautiful old town, middle-eastern paradise, a perfect place to stay with a family.",
          "name": "Helsinki",
          "pictures": [
              {
                  "src": "http://picsum.photos/300/200?r=0.30622128651558067",
                  "description": "Helsinki park"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.520112601398959",
                  "description": "Helsinki street market"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.06640737421833975",
                  "description": "Helsinki park"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.9020919138971113",
                  "description": "Helsinki city centre"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.41315398105564305",
                  "description": "Helsinki embankment"
              }
          ]
      },
      "is_favorite": false,
      "offers": [],
      "type": "ship",
      "id": "39"
  },
  {
      "base_price": 123,
      "date_from": "2021-09-09T09:00:00.000Z",
      "date_to": "2021-09-07T09:00:00.000Z",
      "destination": {
          "description": "Geneva, a true asian pearl, with crowded streets, with a beautiful old town, middle-eastern paradise, with an embankment of a mighty river as a centre of attraction, full of of cozy canteens where you can try the best coffee in the Middle East, famous for its crowded street markets with the best street food in Asia.",
          "name": "Geneva",
          "pictures": [
              {
                  "src": "http://picsum.photos/300/200?r=0.12289340548062566",
                  "description": "Geneva embankment"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.757367587553452",
                  "description": "Geneva city centre"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.7496761552198985",
                  "description": "Geneva street market"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.5644417603800997",
                  "description": "Geneva kindergarten"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.849945560340007",
                  "description": "Geneva park"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.3581811503166432",
                  "description": "Geneva city centre"
              }
          ]
      },
      "is_favorite": false,
      "offers": [],
      "type": "restaurant",
      "id": "40"
  },
  {
      "base_price": 123,
      "date_from": "2021-09-09T09:00:00.000Z",
      "date_to": "2021-09-09T09:00:00.000Z",
      "destination": {
          "description": "Amsterdam, in a middle of Europe, middle-eastern paradise, for those who value comfort and coziness, a perfect place to stay with a family.",
          "name": "Amsterdam",
          "pictures": [
              {
                  "src": "http://picsum.photos/300/200?r=0.5781336252464777",
                  "description": "Amsterdam biggest supermarket"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.037442292053833315",
                  "description": "Amsterdam park"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.01640123390287007",
                  "description": "Amsterdam kindergarten"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.6887556377482627",
                  "description": "Amsterdam embankment"
              }
          ]
      },
      "is_favorite": false,
      "offers": [],
      "type": "taxi",
      "id": "41"
  },
  {
      "base_price": 123,
      "date_from": "2021-09-09T09:00:00.000Z",
      "date_to": "2021-09-09T09:00:00.000Z",
      "destination": {
          "description": "Chamonix, is a beautiful city, a true asian pearl, in a middle of Europe, middle-eastern paradise, a perfect place to stay with a family.",
          "name": "Chamonix",
          "pictures": [
              {
                  "src": "http://picsum.photos/300/200?r=0.09346020979784919",
                  "description": "Chamonix kindergarten"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.6108394550462539",
                  "description": "Chamonix biggest supermarket"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.9916426431866623",
                  "description": "Chamonix zoo"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.3998586664938306",
                  "description": "Chamonix city centre"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.4237407755545355",
                  "description": "Chamonix city centre"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.9467658765893245",
                  "description": "Chamonix kindergarten"
              }
          ]
      },
      "is_favorite": false,
      "offers": [],
      "type": "taxi",
      "id": "42"
  },
  {
      "base_price": 123,
      "date_from": "2021-09-02T09:00:00.000Z",
      "date_to": "2021-09-07T09:00:00.000Z",
      "destination": {
          "description": "Geneva, a true asian pearl, with crowded streets, with a beautiful old town, middle-eastern paradise, with an embankment of a mighty river as a centre of attraction, full of of cozy canteens where you can try the best coffee in the Middle East, famous for its crowded street markets with the best street food in Asia.",
          "name": "Geneva",
          "pictures": [
              {
                  "src": "http://picsum.photos/300/200?r=0.12289340548062566",
                  "description": "Geneva embankment"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.757367587553452",
                  "description": "Geneva city centre"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.7496761552198985",
                  "description": "Geneva street market"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.5644417603800997",
                  "description": "Geneva kindergarten"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.849945560340007",
                  "description": "Geneva park"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.3581811503166432",
                  "description": "Geneva city centre"
              }
          ]
      },
      "is_favorite": false,
      "offers": [],
      "type": "bus",
      "id": "43"
  },
  {
      "base_price": 123,
      "date_from": "2021-09-09T09:00:00.000Z",
      "date_to": "2021-08-31T09:00:00.000Z",
      "destination": {
          "description": "Geneva, a true asian pearl, with crowded streets, with a beautiful old town, middle-eastern paradise, with an embankment of a mighty river as a centre of attraction, full of of cozy canteens where you can try the best coffee in the Middle East, famous for its crowded street markets with the best street food in Asia.",
          "name": "Geneva",
          "pictures": [
              {
                  "src": "http://picsum.photos/300/200?r=0.12289340548062566",
                  "description": "Geneva embankment"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.757367587553452",
                  "description": "Geneva city centre"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.7496761552198985",
                  "description": "Geneva street market"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.5644417603800997",
                  "description": "Geneva kindergarten"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.849945560340007",
                  "description": "Geneva park"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.3581811503166432",
                  "description": "Geneva city centre"
              }
          ]
      },
      "is_favorite": false,
      "offers": [
          {
              "title": "Upgrade to a business class",
              "price": 190
          },
          {
              "title": "Choose the radio station",
              "price": 30
          }
      ],
      "type": "taxi",
      "id": "44"
  },
  {
      "base_price": 123,
      "date_from": "2021-09-11T09:00:00.000Z",
      "date_to": "2021-09-08T09:00:00.000Z",
      "destination": {
          "description": "Amsterdam, in a middle of Europe, middle-eastern paradise, for those who value comfort and coziness, a perfect place to stay with a family.",
          "name": "Amsterdam",
          "pictures": [
              {
                  "src": "http://picsum.photos/300/200?r=0.5781336252464777",
                  "description": "Amsterdam biggest supermarket"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.037442292053833315",
                  "description": "Amsterdam park"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.01640123390287007",
                  "description": "Amsterdam kindergarten"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.6887556377482627",
                  "description": "Amsterdam embankment"
              }
          ]
      },
      "is_favorite": false,
      "offers": [],
      "type": "flight",
      "id": "45"
  },
  {
      "base_price": 0,
      "date_from": "2021-09-09T09:00:00.000Z",
      "date_to": "2021-09-07T09:00:00.000Z",
      "destination": {
          "description": "Chamonix, is a beautiful city, a true asian pearl, in a middle of Europe, middle-eastern paradise, a perfect place to stay with a family.",
          "name": "Chamonix",
          "pictures": [
              {
                  "src": "http://picsum.photos/300/200?r=0.09346020979784919",
                  "description": "Chamonix kindergarten"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.6108394550462539",
                  "description": "Chamonix biggest supermarket"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.9916426431866623",
                  "description": "Chamonix zoo"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.3998586664938306",
                  "description": "Chamonix city centre"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.4237407755545355",
                  "description": "Chamonix city centre"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.9467658765893245",
                  "description": "Chamonix kindergarten"
              }
          ]
      },
      "is_favorite": false,
      "offers": [],
      "type": "ship",
      "id": "47"
  },
  {
      "base_price": 123,
      "date_from": "2021-09-09T09:00:00.000Z",
      "date_to": "2021-09-07T09:00:00.000Z",
      "destination": {
          "description": "Amsterdam, in a middle of Europe, middle-eastern paradise, for those who value comfort and coziness, a perfect place to stay with a family.",
          "name": "Amsterdam",
          "pictures": [
              {
                  "src": "http://picsum.photos/300/200?r=0.5781336252464777",
                  "description": "Amsterdam biggest supermarket"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.037442292053833315",
                  "description": "Amsterdam park"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.01640123390287007",
                  "description": "Amsterdam kindergarten"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.6887556377482627",
                  "description": "Amsterdam embankment"
              }
          ]
      },
      "is_favorite": false,
      "offers": [],
      "type": "bus",
      "id": "48"
  },
  {
      "base_price": 123,
      "date_from": "2021-09-06T09:00:00.000Z",
      "date_to": "2021-09-07T09:00:00.000Z",
      "destination": {
          "description": "Geneva, a true asian pearl, with crowded streets, with a beautiful old town, middle-eastern paradise, with an embankment of a mighty river as a centre of attraction, full of of cozy canteens where you can try the best coffee in the Middle East, famous for its crowded street markets with the best street food in Asia.",
          "name": "Geneva",
          "pictures": [
              {
                  "src": "http://picsum.photos/300/200?r=0.12289340548062566",
                  "description": "Geneva embankment"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.757367587553452",
                  "description": "Geneva city centre"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.7496761552198985",
                  "description": "Geneva street market"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.5644417603800997",
                  "description": "Geneva kindergarten"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.849945560340007",
                  "description": "Geneva park"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.3581811503166432",
                  "description": "Geneva city centre"
              }
          ]
      },
      "is_favorite": false,
      "offers": [],
      "type": "bus",
      "id": "49"
  },
  {
      "base_price": 655,
      "date_from": "2021-08-30T09:00:00.000Z",
      "date_to": "2021-09-09T09:00:00.000Z",
      "destination": {
          "name": "Rotterdam",
          "description": "Rotterdam, is a beautiful city, a true asian pearl, for those who value comfort and coziness, full of of cozy canteens where you can try the best coffee in the Middle East.",
          "pictures": [
              {
                  "src": "http://picsum.photos/300/200?r=0.8560358523246347",
                  "description": "Rotterdam city centre"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.8546397186295804",
                  "description": "Rotterdam embankment"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.5022796863336003",
                  "description": "Rotterdam park"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.29728409835470115",
                  "description": "Rotterdam park"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.1392351316927496",
                  "description": "Rotterdam biggest supermarket"
              }
          ]
      },
      "is_favorite": true,
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
              "title": "Drive slowly",
              "price": 110
          }
      ],
      "type": "taxi",
      "id": "50"
  },
  {
      "base_price": 432,
      "date_from": "2021-09-15T09:00:00.000Z",
      "date_to": "2021-09-14T09:00:00.000Z",
      "destination": {
          "description": "Amsterdam, in a middle of Europe, middle-eastern paradise, for those who value comfort and coziness, a perfect place to stay with a family.",
          "name": "Amsterdam",
          "pictures": [
              {
                  "src": "http://picsum.photos/300/200?r=0.5781336252464777",
                  "description": "Amsterdam biggest supermarket"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.037442292053833315",
                  "description": "Amsterdam park"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.01640123390287007",
                  "description": "Amsterdam kindergarten"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.6887556377482627",
                  "description": "Amsterdam embankment"
              }
          ]
      },
      "is_favorite": false,
      "offers": [],
      "type": "bus",
      "id": "51"
  },
  {
      "base_price": 123,
      "date_from": "2021-08-30T09:00:00.000Z",
      "date_to": "2021-09-01T09:00:00.000Z",
      "destination": {
          "description": "Geneva, a true asian pearl, with crowded streets, with a beautiful old town, middle-eastern paradise, with an embankment of a mighty river as a centre of attraction, full of of cozy canteens where you can try the best coffee in the Middle East, famous for its crowded street markets with the best street food in Asia.",
          "name": "Geneva",
          "pictures": [
              {
                  "src": "http://picsum.photos/300/200?r=0.12289340548062566",
                  "description": "Geneva embankment"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.757367587553452",
                  "description": "Geneva city centre"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.7496761552198985",
                  "description": "Geneva street market"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.5644417603800997",
                  "description": "Geneva kindergarten"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.849945560340007",
                  "description": "Geneva park"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.3581811503166432",
                  "description": "Geneva city centre"
              }
          ]
      },
      "is_favorite": false,
      "offers": [],
      "type": "bus",
      "id": "52"
  },
  {
      "base_price": 321,
      "date_from": "2021-09-01T09:00:00.000Z",
      "date_to": "2021-09-01T09:00:00.000Z",
      "destination": {
          "description": "Geneva, a true asian pearl, with crowded streets, with a beautiful old town, middle-eastern paradise, with an embankment of a mighty river as a centre of attraction, full of of cozy canteens where you can try the best coffee in the Middle East, famous for its crowded street markets with the best street food in Asia.",
          "name": "Geneva",
          "pictures": [
              {
                  "src": "http://picsum.photos/300/200?r=0.12289340548062566",
                  "description": "Geneva embankment"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.757367587553452",
                  "description": "Geneva city centre"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.7496761552198985",
                  "description": "Geneva street market"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.5644417603800997",
                  "description": "Geneva kindergarten"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.849945560340007",
                  "description": "Geneva park"
              },
              {
                  "src": "http://picsum.photos/300/200?r=0.3581811503166432",
                  "description": "Geneva city centre"
              }
          ]
      },
      "is_favorite": false,
      "offers": [
          {
              "title": "Choose seats",
              "price": 190
          }
      ],
      "type": "bus",
      "id": "53"
  }
]
