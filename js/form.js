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

  var enableForm = function (flag) {
    for (var i = 0; i < noticeFormElements.length; i++) {
      noticeFormElements[i].disabled = !flag;
    }
  };
  // Активация формы
  window.activateForm = function (flag) {
    enableForm(flag);
  };

  // Заполнение поля с адресом
  window.fillAddressInput = function () {
    var getElementPosition = function (posX, posY, obj) {
      posX = obj.offsetLeft + 30;
      posY = obj.offsetTop + 40;
      return posX + ', ' + posY;
    };
    noticeAddress.value = getElementPosition(mapPinMainPositionX, mapPinMainPositionY, window.mapPinMain);
  };

  // Заголовок
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

  // Селект с ценами
  var minPriceTypes = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };
  // задаём минимальное значение цены в зависимости от инпута с типом жилья
  var priceValueHandler = function () {
    noticePrice.min = minPriceTypes[noticeType.value];
  };
  // Минимальная цена в зависимости от типа жилья
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


  // Синхронизация инпутов
  var syncInputs = function (firstElement, secondElement) {
    secondElement.value = firstElement.value;
  };

  // Зависимость количества комнат от количества гостей
  var roomsGuestsDependencies = {
    1: ['1'],
    2: ['1', '2'],
    3: ['1', '2', '3'],
    100: ['0']
  };

  // Селект с комнатами
  var roomsValueHandler = function () {
    var select = roomsGuestsDependencies[noticeRooms.value];
    noticeGuests.value = (noticeRooms.value === '100') ? '0' : noticeRooms.value;

    [].slice.call(noticeGuests.options).forEach(function (option) {
      option.disabled = !select.includes(option.value);
    });
  };
  roomsValueHandler();

  // Обработчики событий
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

    });

    window.noticeForm.addEventListener('submit', function (evt) {
      var body = document.querySelector('body');
      inputError.forEach(function (input) {
        input.style.borderColor = '';
        input.setCustomValidity('');
      });
      window.save(new FormData(window.noticeForm), function () {
        window.noticeForm.reset();
        window.removePins();
        window.removeCard();
        enableForm();
        window.noticeForm.classList.add('notice__form--disabled');
        window.map.classList.add('map--faded');
        window.mapPinMain.style.left = '50%';
        window.mapPinMain.style.top = '375px';
        window.fillAddressInput();

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
    window.mapPinMain.style.left = '50%';
    window.mapPinMain.style.top = '375px';
    window.fillAddressInput();
  });
})();
