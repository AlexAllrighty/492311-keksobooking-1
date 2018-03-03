'use strict';

window.pin = (function () {
  var mapPins = document.querySelector('.map__pins');
  window.removePins = function () {
    var childs = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < childs.length; i++) {
      mapPins.removeChild(childs[i]);
    }
  };


  var renderMapPin = function (ad) {
    var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
    var mapPin = mapPinTemplate.cloneNode(true);
    var mapPinImg = mapPin.querySelector('img');
    var KEY_CODE = {
      ESC: 27,
      ENTER: 13
    };
    var PIN = {
      WIDTH: 50,
      HEIGHT: 70
    };
    var openPupup = function () {
      var mapPinActive = document.querySelector('.map__pin--active');
      if (mapPinActive) {
        mapPinActive.classList.remove('map__pin--active');
      }
      mapPin.classList.add('map__pin--active');
      window.renderCard(ad);
     /* window.card.mapCard.classList.remove('hidden');*/
    };

    mapPin.addEventListener('click', function () {
      window.removeCard();
      openPupup();

      var buttonPopupClose = document.querySelector('.popup__close');
      buttonPopupClose.addEventListener('click', window.card1.remove);
    });

    mapPin.addEventListener('keydown', function (evt) {
      if (evt.keyCode === KEY_CODE.ENTER) {
        openPupup();
      }
    });

    mapPin.addEventListener('keydown', function (evt) {
      if (evt.keyCode === KEY_CODE.ESC) {
        window.removeCard();
      }
    });

    mapPin.style.left = (ad.location.x - PIN.WIDTH / 2) + 'px';
    mapPin.style.top = (ad.location.y - PIN.HEIGHT / 2) + 'px';
    mapPinImg.src = ad.author.avatar;
    mapPin.tabIndex = '0';
    return mapPin;
  };


  return {
    createMapPins: function (arr) {
      if (typeof (arr) === 'undefined') {
        arr = window.incomingData;
      } else {
        window.incomingData = arr.slice();
      }
      var MAX_LIMIT_PINS = 5;
      arr = window.filters(arr);
      var activPin = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
      activPin.forEach(function (currentPin) {
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
    }

  };



/*
  var onMapPinClick = function (element) {
    element.addEventListener('click', function () {
      window.removeCard();
    });
  };*/


/*
  var renderMapPins = function (arr) {
    if (typeof (arr) === 'undefined') {
      arr = incommingData;
    } else {
      window.incommingData = arr.slice();
    }
    var MAX_LIMIT_PINS = 5;
    arr = window.filters(arr);
    var mapPins = document.querySelector('.map__pins');
    var activPin = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
    activPin.forEach(function (currentPin) {
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
  };/


  /*
  var fragment = document.createDocumentFragment();
  var mapPinsTemplate = template.querySelector('.map__pin');
  window.successHandler = function (ad) {
    for (var i = 0; i < ADS_QUANTITY; i++) {
      var mapPinElement = renderMapPin(mapPinsTemplate, ad[i]);
      onMapPinClick(mapPinElement, ad[i]);
      fragment.appendChild(mapPinElement);
    }
    mapPins.appendChild(fragment);
  };
*/
  /*
  window.errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };*/



})();


/*
  var typeOfHousing = document.getElementById('housing-type');
  var typeOfPrice = document.getElementById('housing-price');
  var numberOfRooms = document.getElementById('housing-rooms');
  var numberOfGuests = document.getElementById('housing-guests');
  var mapPins = document.querySelector('.map__pins');
  var features = document.getElementById('housing-features');
  var arrFeatures = features.getElementsByTagName('input');
  var filterWifi = document.getElementById('filter-wifi');
  var dishwasher = document.getElementById('filter-dishwasher');
  var parking = document.getElementById('filter-parking');
  var washer = document.getElementById('filter-washer');
  var elevator = document.getElementById('filter-elevator');
  var conditioner = document.getElementById('filter-conditioner');

  function addPins() {
    mapPins.appendChild(createPins(filterPinsData(window.map.pinsData).splice(0, 5)));
  }

  function filterUpdateHandler() {
    document.querySelectorAll('.map_pin_avatar').forEach(function (pin) {
      pin.remove();
    });
    if (window.map.isCardShown) {
      document.querySelector('.map__card ').remove();
    }
    window.map.isCardShown = false;
    window.debounce(addPins);
  }



  typeOfHousing.addEventListener('change', filterUpdateHandler);
  typeOfPrice.addEventListener('change', filterUpdateHandler);
  numberOfRooms.addEventListener('change', filterUpdateHandler);
  numberOfGuests.addEventListener('change', filterUpdateHandler);
  filterWifi.addEventListener('change', filterUpdateHandler);
  dishwasher.addEventListener('change', filterUpdateHandler);
  parking.addEventListener('change', filterUpdateHandler);
  washer.addEventListener('change', filterUpdateHandler);
  elevator.addEventListener('change', filterUpdateHandler);
  conditioner.addEventListener('change', filterUpdateHandler);

  function filterTypeOfHousing(ad) {
    if (typeOfHousing.value !== 'any') {
      return ad.offer.type === typeOfHousing.value;
    } else {
      return true;
    }
  }
  function filterTypeOfPrice(offerData) {
    if (typeOfPrice.value !== 'any') {
      if (typeOfPrice.value === 'middle') {
        return offerData.offer.price < 50000 && offerData.offer.price > 10000;
      } else if (typeOfPrice.value === 'low') {
        return offerData.offer.price <= 10000;
      } else if (typeOfPrice.value === 'high') {
        return offerData.offer.price >= 50000;
      }
    }
    return true;
  }

  function filterNumberOfRooms(offerData) {
    if (numberOfRooms.value !== 'any') {
      return offerData.offer.rooms === numberOfRooms.value;
    } else {
      return true;
    }
  }
  function filterNumberOfGuests(offerData) {
    if (numberOfGuests.value !== 'any') {
      return offerData.offer.guests === numberOfGuests.value;
    } else {
      return true;
    }
  }

  function filterFeatures(offerData) {
    for (var i = 0; i < arrFeatures.length; i++) {
      if (arrFeatures[i].checked && !offerData.offer.features.includes(arrFeatures[i].value)) {
        return false;
      }
    }
    return true;
  }

  function filterPinsData(arrPinsData) {
    return arrPinsData.filter(filterTypeOfHousing).filter(filterTypeOfPrice).filter(filterNumberOfRooms).filter(filterNumberOfGuests).filter(filterFeatures);
  }

  function createPins(arrPinsData) {
    var fragmentPin = document.createDocumentFragment();
    var commonTemplate = document.querySelector('template');
    var pinAvatar = commonTemplate.content.querySelector('.map_pin_avatar');

    for (var i = 0; i < arrPinsData.length; i++) {
      var pin = pinAvatar.cloneNode(true);
      pin.dataset.index = i;
      pin.style.left = arrPinsData[i].location.x + 20 + 'px';
      pin.style.top = arrPinsData[i].location.y + 44 + 'px';
      pin.children[0].src = arrPinsData[i].author.avatar;
      fragmentPin.appendChild(pin);
    }
    return fragmentPin;
  }

  window.pin = {
    createPins: createPins,
    filterPinsData: filterPinsData
  };



*/
