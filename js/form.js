'use strict';

(function () {
  var noticeForm = document.querySelector('.notice__form');
  var noticeFormElements = noticeForm.querySelectorAll('.form__element');
  var noticeTitle = noticeForm.querySelector('#title');
  var noticePrice = noticeForm.querySelector('#price');
  var noticeType = noticeForm.querySelector('#type');
  var noticeCheckIn = noticeForm.querySelector('#timein');
  var noticeCheckOut = noticeForm.querySelector('#timeout');
  var noticeGuests = noticeForm.querySelector('#capacity');
  var noticeRooms = noticeForm.querySelector('#room_number');
  var noticeReset = noticeForm.querySelector('.form__reset');
  var noticeAddress = document.querySelector('#address');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPinMainPositionX;
  var mapPinMainPositionY;
  var inputError = [];

  var enableForm = function (flag) {
    for (var i = 0; i < noticeFormElements.length; i++) {
      noticeFormElements[i].disabled = !flag;
    }
  };
  window.activateForm = function (flag) {
    enableForm(flag);
  };
  window.fillAddressInput = function () {
    var getElementPosition = function (posX, posY, obj) {
      posX = obj.offsetLeft + 30;
      posY = obj.offsetTop + 40;
      return posX + ', ' + posY;
    };
    noticeAddress.value = getElementPosition(mapPinMainPositionX, mapPinMainPositionY, mapPinMain);
  };
  var checkTitle = function () {
    if (noticeTitle.validity.tooShort) {
      noticeTitle.setCustomValidity('Заголовок должен содержать не менее 30 символов');
    } else if (noticeTitle.validity.tooLong) {
      noticeTitle.setCustomValidity('Заголовок не должен содержать более 100 сиволов');
    } else if (noticeTitle.validity.valueMissing) {
      noticeTitle.setCustomValidity('Вы не указали заголовок объявления');
    } else {
      noticeTitle.setCustomValidity('');
    }
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
  noticeType.addEventListener('change', priceValueHandler);

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
  roomsValueHandler();
  window.collectListeners = function () {
    noticeType.addEventListener('change', priceValueHandler);

    noticeCheckIn.addEventListener('change', function () {
      syncInputs(noticeCheckIn, noticeCheckOut);
    });

    noticeCheckOut.addEventListener('change', function () {
      syncInputs(noticeCheckOut, noticeCheckIn);
    });

    noticeRooms.addEventListener('change', roomsValueHandler);

    noticeForm.addEventListener('submit', function (evt) {
      var body = document.querySelector('body');
      inputError.forEach(function (input) {
        input.style.borderColor = '';
        input.setCustomValidity('');
      });
      window.save(new FormData(noticeForm), function () {
        resetPage();
        var responseMessage = document.createElement('div');
        responseMessage.classList.add('success-message');
        responseMessage.textContent = 'Объявление отправлено';
        body.appendChild(responseMessage);
        setTimeout(function () {
          body.removeChild(responseMessage);
        }, 3000);
      }, function (response) {
        var responseMessage = document.createElement('div');
        responseMessage.classList.add('error-message');
        responseMessage.textContent = 'Объявление не отправлено(' + response + ')';
        body.appendChild(responseMessage);
        setTimeout(function () {
          body.removeChild(responseMessage);
        }, 3000);
      });
      evt.preventDefault();
    });

    noticeForm.addEventListener('invalid', function (evt) {
      checkPrice();
      checkTitle();
      evt.target.style.borderColor = 'red';
      inputError.push(evt.target);
    }, true);
  };

  var resetPage = function () {
    noticeForm.reset();
    mapPinMain.style.left = '50%';
    mapPinMain.style.top = '375px';
    window.fillAddressInput();
    enableForm(false); // сделать функцию
    noticeForm.classList.add('notice__form--disabled');
    window.removePins();
    window.removeCard();
    window.map.classList.add('map--faded');
    window.mapPinMainClickCounter = 0;
    for (var i = 0; i < window.mapFiltersSelects.length; i++) {
      window.mapFiltersSelects[i].disabled = true;
    }
  };
  noticeReset.addEventListener('click', function (evt) {
    evt.preventDefault();
    resetPage();
  });
})();
