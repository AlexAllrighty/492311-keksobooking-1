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
var inputAddress = document.querySelector('#address');
var noticeTitle = noticeForm.querySelector('#title');
var noticePrice = noticeForm.querySelector('#price');
var noticeType = noticeForm.querySelector('#type');
var noticeCheckIn = noticeForm.querySelector('#timein');
var noticeCheckOut = noticeForm.querySelector('#timeout');
var noticeGuests = noticeForm.querySelector('#capacity');
var noticeRooms = noticeForm.querySelector('#room_number');
var noticeSubmit = noticeForm.querySelector('.form__submit');
var noticeReset = noticeForm.querySelector('.form__reset');
var inputError = [];


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
};

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
  var getElementPosition = function (posX, posY, obj) {
    posX = obj.offsetLeft + 30;
    posY = obj.offsetTop + 40;
    return posX + ', ' + posY;
  };
  inputAddress.value = getElementPosition(mapPinMainPositionX, mapPinMainPositionY, mapPinMain);

};

var minPriceTypes = {
  'bungalo': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000
};


var priceValueHandler = function () {
  noticePrice.min = minPriceTypes[noticeType.value];
};

var checkPrice = function () {
  if (noticePrice.validity.rangeUnderflow) {
    noticePrice.setCustomValidity('Цена не может быть меньше' + noticePrice.min + ' рублей');
  } else if (noticePrice.validity.rangeOverflow) {
    noticePrice.setCustomValidity('Цена не может быть больше 1 000 000 рублей');
  } else if (noticePrice.validity.valueMissing) {
    noticePrice.setCustomValidity('Вы не указали цену');
  } else {
    noticePrice.setCustomValidity('');
  }
};


var checkTitle = function () {
  if (noticeTitle.validity.tooShort) {
    noticePrice.setCustomValidity('Заголовок должен содержать не менее 30 символов');
  } else if (noticeTitle.validity.tooLong) {
    noticePrice.setCustomValidity('Заголовок не должен содержать более 100 сиволов');
  } else if (noticeTitle.validity.valueMissing) {
    noticePrice.setCustomValidity('Вы не указали заголовок объявления');
  } else {
    noticePrice.setCustomValidity('');
  }
};



noticeType.addEventListener('change', priceValueHandler);

var syncInputs = function (firstElement, secondElement) {
  secondElement.value = firstElement.value;
};

var roomsGuestsDependencies = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0']
};

var roomsValueHandler = function () {
  var select = roomsGuestsDependencies[noticeRooms.value];
  noticeGuests.value = (noticeRooms.value === '100') ? '0' : noticeRooms.value;

  [].slice.call(noticeGuests.options).forEach(function (option) {
    option.disabled = !select.includes(option.value);
  });
};

var checkForm = function () {
  priceValueHandler();
  roomsValueHandler();
  inputError.forEach(function (input) {
    input.style.borderColor = '';
  });
};

var collectListeners = function () {
  noticeType.addEventListener('change', priceValueHandler);

  noticeCheckIn.addEventListener('change', function () {
    syncInputs(noticeCheckIn, noticeCheckOut);
  });

  noticeCheckOut.addEventListener('change', function () {
    syncInputs(noticeCheckOut, noticeCheckIn);
  });

  noticeRooms.addEventListener('change', roomsValueHandler);

  noticeSubmit.addEventListener('click', function () {
    inputError.forEach(function (input) {
      input.style.borderColor = '';
      input.setCustomValidity('');
    });
  });

  noticeForm.addEventListener('invalid', function (evt) {
    checkPrice();
    checkTitle();
    evt.target.style.borderColor = 'red';
    inputError.push(evt.target);
  }, true);
};

var onMapPinMainClick = function () {
  launchPage(true);
  renderMapPinBlock();
  fillAddressInput();
  collectListeners();
};

mapPinMain.addEventListener('mouseup', onMapPinMainClick);
activateForm(isMapPinClicked);

noticeReset.addEventListener('click', function (evt) {
  evt.preventDefault();
  noticeForm.reset();
  checkForm();
});
