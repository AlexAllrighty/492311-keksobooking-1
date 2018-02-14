'use strict';

var map = document.querySelector('.map');
map.classList.remove('map--faded');
var mapPinsBlock = document.querySelector('.map__pins');
var mapCard = document.querySelector('template').content.querySelector('.map__card');
var mapPin = document.querySelector('template').content.querySelector('.map__pin');
var mapPinImage = document.querySelector('template').content.querySelector('.map__pin').querySelector('img');
var fragment = document.createDocumentFragment();
var featureFragment = document.createDocumentFragment();
var pictureFragment = document.createDocumentFragment();
var cardCopy = mapCard.cloneNode(true);
var offerType = ['flat', 'house', 'bungalo'];
var titleList = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец',
  'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var checkTimeList = ['12:00', '13:00', '14:00'];
var countIndex;
var adList = [];

var getRandomInteger = function (min, max) {
  var randomInteger = min + Math.random() * (max + 1 - min);
  randomInteger = Math.floor(randomInteger);
  return randomInteger;
};

var getRandomArray = function (arr) {
  var obj = {};
  for (var i = 0; i <= getRandomInteger(1, arr.length); i++) {
    var randomElement = getRandomArrElement(arr);
    obj[randomElement] = true;
  }
  return Object.keys(obj);
};

var getRandomArrElement = function (arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

var getRandomAd = function () {
  for (var i = 1; i <= 8; i++) {
    countIndex = i;
    var randomAd = {
      'author': {
        'avatar': 'img/avatars/user0' + countIndex + '.png'
      },

      'offer': {
        'title': titleList[countIndex - 1],
        'address': 'x' + ',' + ' y',
        'price': getRandomInteger(1000, 1000000),
        'type': getRandomArrElement(offerType),
        'rooms': getRandomInteger(1, 5),
        'guests': getRandomInteger(1, 5),
        'checkin': getRandomArrElement(checkTimeList),
        'checkout': getRandomArrElement(checkTimeList),
        'features': getRandomArray(featuresList),
        'description': '',
        'photos': ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
      },

      'location': {
        'x': getRandomInteger(300, 900),
        'y': getRandomInteger(150, 500)
      }
    };
    adList.push(randomAd);
  }
  return adList;
};
getRandomAd();

var renderPin = function () {
  for (var i = 0; i < adList.length; i++) {
    var cloneMapPin = mapPin.cloneNode();
    var cloneImageMapPin = mapPinImage.cloneNode();
    cloneMapPin.style.left = adList[i].location.x - 35 + 'px';
    cloneMapPin.style.top = adList[i].location.y - 75 + 'px';
    cloneImageMapPin.src = adList[i].author.avatar;
    cloneImageMapPin.src = adList[i].author.avatar;
    cloneImageMapPin.style.width = '40px';
    cloneImageMapPin.style.height = '40px';
    cloneImageMapPin.setAttribute('draggable', false);
    cloneMapPin.appendChild(cloneImageMapPin);
    fragment.appendChild(cloneMapPin);
  }
  mapPinsBlock.appendChild(fragment);
};
renderPin();

var renderCard = function () {
  var getOfferTypeTranslate = function () {
    if (adList[0].offer.type === 'bungalo') {
      cardCopy.querySelector('h4').textContent = 'Бунгало';
    } else if (adList[0].offer.type === 'flat') {
      cardCopy.querySelector('h4').textContent = 'Квартира';
    } else if (adList[0].offer.type === 'house') {
      cardCopy.querySelector('h4').textContent = 'Дом';
    }
    return cardCopy.querySelector('h4').textContent;
  };
  getOfferTypeTranslate();

  var renderFeaturesList = function () {
    for (var i = 0; i < adList[0].offer.features.length; i++) {
      var featureList = document.createElement('li');
      featureList.classList.add('feature', 'feature--' + adList[0].offer.features[i]);
      featureFragment.appendChild(featureList);
    }
    cardCopy.querySelector('.popup__features').innerHTML = '';
    cardCopy.querySelector('.popup__features').appendChild(featureFragment);
    cardCopy.querySelector('.popup__features').nextSibling.textContent = adList[0].offer.description;
  };
  renderFeaturesList();

  cardCopy.querySelector('h3').textContent = adList[0].offer.title;
  cardCopy.querySelector('p').querySelector('small').textContent = adList[0].offer.adress;
  cardCopy.querySelector('.popup__price').textContent = adList[0].offer.price + '&#x20bd;/ночь';

  cardCopy.querySelector('h4').nextElementSibling.textContent = adList[0].offer.rooms +
    ' комнаты для ' + adList[0].offer.guests + ' гостей';
  cardCopy.querySelector('h4').nextElementSibling.nextElementSibling.textContent = 'Заезд после ' + adList[0].offer.checkin + ' выезд до ' + adList[0].offer.checkout;

  var renderPictures = function () {
    for (var i = 0; i < adList[0].offer.photos.length; i++) {
      var picturesList = document.createElement('li');
      var picturesImgTag = document.createElement('img');
      picturesImgTag.src = adList[0].offer.photos[i];
      picturesList.appendChild(picturesImgTag);
      pictureFragment.appendChild(picturesList);
    }
    cardCopy.querySelector('.popup__pictures').innerHTML = '';
    cardCopy.querySelector('.popup__pictures').appendChild(pictureFragment);
  };
  renderPictures();

  var renderAvatar = function () {
    cardCopy.querySelector('.popup__avatar').src = adList[0].author.avatar;
  };
  renderAvatar();
};
renderCard();
