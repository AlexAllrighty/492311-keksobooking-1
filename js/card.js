'use strict';

(function () {
  var fragment = document.createDocumentFragment();
  var template = document.querySelector('template').content;
  var mapFilterContainer = document.querySelector('.map__filters-container');
  var TYPE_OF_OFFER = {
    bungalo: 'Бунгало',
    flat: 'Квартира',
    house: 'Дом'
  };
  var renderFeaturesList = function (block, obj) {
    for (var i = 0; i < obj.offer.features.length; i++) {
      var featureList = document.createElement('li');
      featureList.classList.add('feature', 'feature--' + obj.offer.features[i]);
      fragment.appendChild(featureList);
    }
    block.querySelector('.popup__features').innerHTML = '';
    block.querySelector('.popup__features').appendChild(fragment);
  };
  var renderPictures = function (block, sheet) {
    for (var i = 0; i < sheet.offer.photos.length; i++) {
      var picturesList = document.createElement('li');
      var picturesImgTag = document.createElement('img');
      picturesImgTag.width = '40';
      picturesImgTag.heigth = '40';
      picturesImgTag.src = sheet.offer.photos[i];
      picturesList.appendChild(picturesImgTag);
      fragment.appendChild(picturesList);
    }
    block.querySelector('.popup__pictures').innerHTML = '';
    block.querySelector('.popup__pictures').appendChild(fragment);
  };
  var renderAvatar = function (block, sheet) {
    block.querySelector('.popup__avatar').src = sheet.author.avatar;
  };

  var createCard = function (element, ad) {
    var cardElement = element.cloneNode(true);
    renderFeaturesList(cardElement, ad);
    renderPictures(cardElement, ad);
    renderAvatar(cardElement, ad);
    cardElement.querySelector('h4').textContent = TYPE_OF_OFFER[ad.offer.type];
    var cardDescription = cardElement.querySelector('.popup__features').nextElementSibling;
    cardDescription.textContent = ad.offer.description;
    cardElement.querySelector('h3').textContent = ad.offer.title;
    cardElement.querySelector('p').querySelector('small').textContent = ad.offer.adress;
    cardElement.querySelector('.popup__price').textContent = ad.offer.price + ' ₽ ночь';
    cardElement.querySelector('h4').nextElementSibling.textContent = ad.offer.rooms +
      ' комнаты для ' + ad.offer.guests + ' гостей';
    cardElement.querySelector('h4').nextElementSibling.nextElementSibling.textContent = 'Заезд после ' + ad.offer.checkin + ' выезд до ' + ad.offer.checkout;
    return cardElement;
  };
  var renderCard = function (ad) {
    var cardTemplate = template.querySelector('.map__card');
    var cardTemplateCopied = cardTemplate.cloneNode(true);
    fragment.appendChild(createCard(cardTemplateCopied, ad));
    window.util.map.insertBefore(fragment, mapFilterContainer);
  };

  var removeCard = function () {
    var card = document.querySelector('.map__card');
    if (window.util.map.contains(card)) {
      window.util.map.removeChild(card);
    }
  };

  window.card = {
    renderCard: renderCard,
    removeCard: removeCard
  };
})();
