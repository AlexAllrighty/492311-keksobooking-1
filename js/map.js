'use strict';

var map = document.querySelector('.map');
var mapPinMain = document.querySelector('.map__pin--main');
var template = document.querySelector('template').content;
var noticeForm = document.querySelector('.notice__form');
var noticeFormElements = noticeForm.querySelectorAll('.form__element');
var isMapPinClicked = false;
var fragment = document.createDocumentFragment();
var offerType = ['flat', 'house', 'bungalo'];
var titleList = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец',
  'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var checkTimeList = ['12:00', '13:00', '14:00'];
var adList = [];
var mapFilterContainer = document.querySelector('.map__filters-container');
var mapPinMainPositionX;
var mapPinMainPositionY;


var activateForm = function (flag) {
  for (var i = 0; i < noticeFormElements.length; i++) {
    noticeFormElements[i].disabled = !flag;
  }
};


var launchPage = function (flag) {
  map.classList.remove('map--faded');
  noticeForm.classList.remove('notice__form--disabled');
  activateForm(flag);
};

var renderMapPin = function (block, ad) {
  var mapPinElementCopied = block.cloneNode(true);
  var mapPinImage = mapPinElementCopied.querySelector('img');

  mapPinElementCopied.style.left = ad.location.x + 'px';
  mapPinElementCopied.style.top = ad.location.y + 'px';
  mapPinImage.src = ad.author.avatar;

  return mapPinElementCopied;
}

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
    var countIndex = i;
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


var createCard = function (element, ad) {
  var cardElement = element.cloneNode(true);
  var getOfferTypeTranslate = function () {
    if (ad.offer.type === 'bungalo') {
      cardElement.querySelector('h4').textContent = 'Бунгало';
    } else if (ad.offer.type === 'flat') {
      cardElement.querySelector('h4').textContent = 'Квартира';
    } else if (ad.offer.type === 'house') {
      cardElement.querySelector('h4').textContent = 'Дом';
    }
    return cardElement.querySelector('h4').textContent;
  };
  getOfferTypeTranslate();

  var renderFeaturesList = function () {
    for (var i = 0; i < ad.offer.features.length; i++) {
      var featureList = document.createElement('li');
      featureList.classList.add('feature', 'feature--' + ad.offer.features[i]);
      fragment.appendChild(featureList);
    }
    cardElement.querySelector('.popup__features').innerHTML = '';
    cardElement.querySelector('.popup__features').appendChild(fragment);
    cardElement.querySelector('.popup__features').nextSibling.textContent = ad.offer.description;
  };
  renderFeaturesList();

  cardElement.querySelector('h3').textContent = ad.offer.title;
  cardElement.querySelector('p').querySelector('small').textContent = ad.offer.adress;
  cardElement.querySelector('.popup__price').textContent = ad.offer.price + '\t\u20BD/ночь';

  cardElement.querySelector('h4').nextElementSibling.textContent = ad.offer.rooms +
    ' комнаты для ' + ad.offer.guests + ' гостей';
  cardElement.querySelector('h4').nextElementSibling.nextElementSibling.textContent = 'Заезд после ' + ad.offer.checkin + ' выезд до ' + ad.offer.checkout;

  var renderPictures = function () {
    for (var i = 0; i < ad.offer.photos.length; i++) {
      var picturesList = document.createElement('li');
      var picturesImgTag = document.createElement('img');
      picturesImgTag.width = '40';
      picturesImgTag.heigth = '40';
      picturesImgTag.src = ad.offer.photos[i];
      picturesList.appendChild(picturesImgTag);
      fragment.appendChild(picturesList);
    }
    cardElement.querySelector('.popup__pictures').innerHTML = '';
    cardElement.querySelector('.popup__pictures').appendChild(fragment);
  };
  renderPictures();

  var renderAvatar = function () {
    cardElement.querySelector('.popup__avatar').src = ad.author.avatar;
  };
  renderAvatar();
  return cardElement;
};


var renderCard = function (ad) {
  var cardTemplate = template.querySelector('.map__card');
  var cardTemplateCopied = cardTemplate.cloneNode(true);
  fragment.appendChild(createCard(cardTemplateCopied, ad));
  map.insertBefore(fragment, mapFilterContainer);
};

var onMapPinClick = function (element, ad) {
  element.addEventListener('click', function () {
    renderCard(ad);
  });
};

var renderMapPinBlock = function () {
  var mapPinsTemplate = template.querySelector('.map__pin');
  for (var i = 0; i < adList.length; i++) {
    var mapPinsTemplateCopied = mapPinsTemplate.cloneNode(true);
    var mapPinElement = renderMapPin(mapPinsTemplateCopied, adList[i]);
    onMapPinClick(mapPinElement, adList[i]);
    fragment.appendChild(mapPinElement);
  }
  map.querySelector('.map__pins').appendChild(fragment);
};

var fillAddressInput = function () {
  var inputAddress = document.querySelector('#address');
  var getElementPosition = function (posX, posY, obj) {
    posX = obj.offsetLeft + 30;
    posY = obj.offsetTop + 40;
    return posX + ', ' + posY;
  };
  inputAddress.value = getElementPosition(mapPinMainPositionX, mapPinMainPositionY, mapPinMain);
};

var onMapPinMainClick = function () {
  launchPage(true);
  renderMapPinBlock();
  fillAddressInput();
};

mapPinMain.addEventListener('mouseup', onMapPinMainClick);

activateForm(isMapPinClicked);



/*
var map = document.querySelector('.map');
var mapPin = document.querySelector('template').content.querySelector('.map__pin');
var mapPinImage = document.querySelector('template').content.querySelector('.map__pin').querySelector('img');
var fragment = document.createDocumentFragment();
var featureFragment = document.createDocumentFragment();
var pictureFragment = document.createDocumentFragment();
var mapPinsBlock = document.querySelector('.map__pins');
var mapFilterContainer = document.querySelector('.map__filters-container');
var mapCard = document.querySelector('template').content.querySelector('.map__card');
var offerType = ['flat', 'house', 'bungalo'];
var titleList = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец',
  'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var checkTimeList = ['12:00', '13:00', '14:00'];
var countIndex;
var adList = [];
var cardCopy = mapCard.cloneNode(true);


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
      picturesImgTag.width = '40';
      picturesImgTag.heigth = '40';
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
  map.insertBefore(cardCopy, mapFilterContainer);
};

var mapPinMain = document.querySelector('.map__pin--main');
var mapPinMainPositionX;
var mapPinMainPositionY;


mapPinMain.addEventListener('mouseup', function () {
  var map = document.querySelector('.map');
  map.classList.remove('map--faded');
  var inputAddress = document.querySelector('#address');

  var getElementPosition = function (posX, posY, obj) {
    posX = obj.offsetLeft + 30;
    posY = obj.offsetTop + 40;
    return posX + ', ' + posY;
  };

  inputAddress.value = getElementPosition(mapPinMainPositionX, mapPinMainPositionY, mapPinMain);

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
});

*/
