'use strict';

(function () {
  window.noticeForm = document.querySelector('.notice__form');
  var noticeFormElements = window.noticeForm.querySelectorAll('.form__element');
  var noticeTitle = window.noticeForm.querySelector('#title');
  var noticePrice = window.noticeForm.querySelector('#price');
  var noticeType = window.noticeForm.querySelector('#type');
  var noticeCheckIn = window.noticeForm.querySelector('#timein');
  var noticeCheckOut = window.noticeForm.querySelector('#timeout');
  var noticeGuests = window.noticeForm.querySelector('#capacity');
  var noticeRooms = window.noticeForm.querySelector('#room_number');
  var noticeSubmit = window.noticeForm.querySelector('.form__submit');
  var noticeReset = window.noticeForm.querySelector('.form__reset');
  var noticeAddress = document.querySelector('#address');
  var mapPinMainPositionX;
  var mapPinMainPositionY;
  var inputError = [];

  window.activateForm = function (flag) {
    for (var i = 0; i < noticeFormElements.length; i++) {
      noticeFormElements[i].disabled = !flag;
    }
  };

  window.fillAddressInput = function () {
    var getElementPosition = function (posX, posY, obj) {
      posX = obj.offsetLeft + 30;
      posY = obj.offsetTop + 40;
      return posX + ', ' + posY;
    };
    noticeAddress.value = getElementPosition(mapPinMainPositionX, mapPinMainPositionY, window.mapPinMain);
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
    } else if (noticePrice.validity.tooLong) {
      noticePrice.setCustomValidity('Заголовок не должен содержать более 100 сиволов');
    } else if (noticePrice.validity.valueMissing) {
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

  window.collectListeners = function () {
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

    window.noticeForm.addEventListener('invalid', function (evt) {
      checkPrice();
      checkTitle();
      evt.target.style.borderColor = 'red';
      inputError.push(evt.target);
    }, true);
  };

  noticeReset.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.noticeForm.reset();
    checkForm();
  });
})();
