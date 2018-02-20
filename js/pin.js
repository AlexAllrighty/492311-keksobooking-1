'use strict';

(function () {
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
      window.renderCard(ad);
    });
  };

  window.renderMapPinBlock = function () {
    window.template = document.querySelector('template').content;
    var mapPinsTemplate = template.querySelector('.map__pin');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.adList.length; i++) {
      var mapPinsTemplateCopied = mapPinsTemplate.cloneNode(true);
      var mapPinElement = renderMapPin(mapPinsTemplateCopied, window.adList[i]);
      onMapPinClick(mapPinElement, window.adList[i]);
      fragment.appendChild(mapPinElement);
    }
    window.map.querySelector('.map__pins').appendChild(fragment);
  };
})();
