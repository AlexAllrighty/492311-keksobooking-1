'use strict';

(function () {
  var offerType = ['flat', 'house', 'bungalo'];
  var titleList = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец',
    'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var checkTimeList = ['12:00', '13:00', '14:00'];
  var fragment = document.createDocumentFragment();
  window.adList = [];
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
          'price': window.getRandomInteger(1000, 1000000),
          'type': window.getRandomArrElement(offerType),
          'rooms': window.getRandomInteger(1, 5),
          'guests': window.getRandomInteger(1, 5),
          'checkin': window.getRandomArrElement(checkTimeList),
          'checkout': window.getRandomArrElement(checkTimeList),
          'features': window.getRandomArray(featuresList),
          'description': '',
          'photos': ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
        },

        'location': {
          'x': window.getRandomInteger(300, 900),
          'y': window.getRandomInteger(150, 500)
        }
      };
      window.adList.push(randomAd);
    }
    return window.adList;
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
  window.renderCard = function (ad) {
    var cardTemplate = window.template.querySelector('.map__card');
    var cardTemplateCopied = cardTemplate.cloneNode(true);
    var mapFilterContainer = document.querySelector('.map__filters-container');
    fragment.appendChild(createCard(cardTemplateCopied, ad));
    window.map.insertBefore(fragment, mapFilterContainer);
  };
})();
