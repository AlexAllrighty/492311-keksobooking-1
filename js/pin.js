'use strict';

(function () {
  var ADS_QUANTITY = 10;
  var template = document.querySelector('template').content;

  var renderMapPin = function (block, ad) {
    var mapPinElementCopied = block.cloneNode(true);
    var mapPinImage = mapPinElementCopied.querySelector('img');

    mapPinElementCopied.style.left = ad.location.x + 'px';
    mapPinElementCopied.style.top = ad.location.y + 'px';
    mapPinImage.src = ad.author.avatar;

    return mapPinElementCopied;
  };

  var onMapPinClick = function (element, ad) {
    element.addEventListener('click', function () {
      window.removeCard();
      window.renderCard(ad);
    });
  };
  var fragment = document.createDocumentFragment();
  var mapPinsTemplate = template.querySelector('.map__pin');
  window.successHandler = function (ad) {
    for (var i = 0; i < ADS_QUANTITY; i++) {
      var mapPinElement = renderMapPin(mapPinsTemplate, ad[i]);
      onMapPinClick(mapPinElement, ad[i]);
      fragment.appendChild(mapPinElement);
    }
    window.map.querySelector('.map__pins').appendChild(fragment);
  };

  window.errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.removePins = function () {
    var childs = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < childs.length; i++) {
      document.querySelector('.map__pins').removeChild(childs[i]);
    }
  };
})();
