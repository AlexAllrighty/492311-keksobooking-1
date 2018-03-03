'use strict';

(function () {
  var fragment = document.createDocumentFragment();

  window.removeCard = function () {
    if (window.map.contains(window.map.querySelector('.map__card'))) {
      window.map.removeChild(window.map.querySelector('.map__card'));
    }
  };

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
    };
    renderFeaturesList();

    var cardDescription = cardElement.querySelector('.popup__features').nextElementSibling;
    cardDescription.textContent = ad.offer.description;
    cardElement.querySelector('h3').textContent = ad.offer.title;
    cardElement.querySelector('p').querySelector('small').textContent = ad.offer.adress;
    cardElement.querySelector('.popup__price').textContent = ad.offer.price + ' ₽ ночь';

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
  var template = document.querySelector('template').content;
  window.renderCard = function (ad) {
    var cardTemplate = template.querySelector('.map__card');
    var cardTemplateCopied = cardTemplate.cloneNode(true);
    var mapFilterContainer = document.querySelector('.map__filters-container');
    fragment.appendChild(createCard(cardTemplateCopied, ad));
    window.map.insertBefore(fragment, mapFilterContainer);
  };


})();
