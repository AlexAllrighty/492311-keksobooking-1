'use strict';

(function () {
  var noticeFormElements = window.util.noticeForm.querySelectorAll('.form__element');
  var noticePrice = window.util.noticeForm.querySelector('#price');
  var noticeType = window.util.noticeForm.querySelector('#type');
  var noticeCheckIn = window.util.noticeForm.querySelector('#timein');
  var noticeCheckOut = window.util.noticeForm.querySelector('#timeout');
  var noticeGuests = window.util.noticeForm.querySelector('#capacity');
  var noticeRooms = window.util.noticeForm.querySelector('#room_number');
  var noticeReset = window.util.noticeForm.querySelector('.form__reset');
  var noticeAddress = window.util.noticeForm.querySelector('#address');
  var mapPinMainPositionX;
  var mapPinMainPositionY;
  var inputError = [];
  var successMessage = 'Ваше объявление отправлено';
  var errorMessage = 'Ошибка при отправке формы';
  var errorMessageStyle = 'error-message';
  var successMessageStyle = 'success-message';
  var MinPriceTypes = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };
  var RoomsGuestsDependencies = {
    1: ['1'],
    2: ['1', '2'],
    3: ['1', '2', '3'],
    100: ['0']
  };
  var enableForm = function (flag) {
    for (var i = 0; i < noticeFormElements.length; i++) {
      noticeFormElements[i].disabled = !flag;
    }
  };

  var fillAddressInput = function () {
    var getElementPosition = function (posX, posY, obj) {
      posX = obj.offsetLeft + 30;
      posY = obj.offsetTop + 40;
      return posX + ', ' + posY;
    };
    noticeAddress.value = getElementPosition(mapPinMainPositionX, mapPinMainPositionY, window.util.mapPinMain);
  };
  fillAddressInput();

  var priceValueHandler = function () {
    noticePrice.min = MinPriceTypes[noticeType.value];
  };

  priceValueHandler();
  noticeType.addEventListener('change', priceValueHandler);

  var syncInputs = function (firstElement, secondElement) {
    secondElement.value = firstElement.value;
  };
  var roomsValueHandler = function () {
    var select = RoomsGuestsDependencies[noticeRooms.value];
    noticeGuests.value = (noticeRooms.value === '100') ? '0' : noticeRooms.value;
    [].slice.call(noticeGuests.options).forEach(function (option) {
      option.disabled = !select.includes(option.value);
    });
  };
  roomsValueHandler();

  noticeType.addEventListener('change', priceValueHandler);

  noticeCheckIn.addEventListener('change', function () {
    syncInputs(noticeCheckIn, noticeCheckOut);
  });

  noticeCheckOut.addEventListener('change', function () {
    syncInputs(noticeCheckOut, noticeCheckIn);
  });

  noticeRooms.addEventListener('change', roomsValueHandler);
  var onError = function () {
    window.util.showResponseMessage(errorMessage, errorMessageStyle);
  };

  var onLoad = function () {
    window.util.showResponseMessage(successMessage, successMessageStyle);
    window.util.resetPage();
  };

  window.util.noticeForm.addEventListener('submit', function (evt) {
    inputError.forEach(function (input) {
      input.style.borderColor = '';
      input.setCustomValidity('');
    });
    window.backend.save(new FormData(window.util.noticeForm), onLoad, onError);
    evt.preventDefault();
  });

  window.util.noticeForm.addEventListener('invalid', function (evt) {
    evt.target.style.borderColor = 'red';
    inputError.push(evt.target);
  }, true);
  noticeReset.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.util.resetPage();
  });
  window.form = {
    enableForm: enableForm,
    fillAddressInput: fillAddressInput
  };
})();
