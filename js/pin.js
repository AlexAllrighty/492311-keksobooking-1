'use strict';

(function () {
  var KEY_CODE = {
    ESC: 27,
    ENTER: 13
  };
  var PIN = {
    WIDTH: 50,
    HEIGHT: 70
  };
  var mapPinActive = document.querySelector('.map__pin--active');
  var mapPins = document.querySelector('.map__pins');
  var renderMapPin = function (ad) {
    var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
    var mapPin = mapPinTemplate.cloneNode(true);
    var mapPinImg = mapPin.querySelector('img');
    var openPupup = function () {
      window.card.removeCard();
      if (mapPinActive) {
        mapPinActive.classList.remove('map__pin--active');
      }
      mapPin.classList.add('map__pin--active');
      window.card.renderCard(ad);
    };

    mapPin.addEventListener('click', function () {
      openPupup();
      var buttonPopupClose = document.querySelector('.popup__close');
      buttonPopupClose.addEventListener('click', function () {
        window.card.removeCard();
      });
    });

    mapPin.addEventListener('keydown', function (evt) {
      if (evt.keyCode === KEY_CODE.ENTER) {
        openPupup();
      }
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === KEY_CODE.ESC) {
        window.card.removeCard();
      }
    });
    mapPin.style.left = (ad.location.x - PIN.WIDTH / 2) + 'px';
    mapPin.style.top = (ad.location.y - PIN.HEIGHT / 2) + 'px';
    mapPinImg.src = ad.author.avatar;
    mapPin.tabIndex = '0';
    return mapPin;
  };

  var createMapPins = function (arr) {
    if (typeof (arr) === 'undefined') {
      arr = window.incomingData;
    } else {
      window.incomingData = arr.slice();
    }
    var MAX_LIMIT_PINS = 5;
    arr = window.filtrate(arr);
    var activePin = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    activePin.forEach(function (currentPin) {
      mapPins.removeChild(currentPin);
    });
    var fragment = document.createDocumentFragment();
    if (arr.length > MAX_LIMIT_PINS) {
      arr = arr.slice(MAX_LIMIT_PINS);
    }
    for (var i = 0; i < arr.length; i++) {
      fragment.appendChild(renderMapPin(arr[i]));
    }
    mapPins.appendChild(fragment);
  };

  var removePins = function () {
    var childs = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < childs.length; i++) {
      mapPins.removeChild(childs[i]);
    }
  };

  window.pin = {
    createMapPins: createMapPins,
    removePins: removePins
  };
})();


