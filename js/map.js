'use strict';

(function () {
  var noticeForm = document.querySelector('.notice__form');
  window.map = document.querySelector('.map');
  window.mapPinMain = document.querySelector('.map__pin--main');
  window.mapPinMainClickCounter = 0;
  var isMapPinClicked = false;
  var launchPage = function (flag) {
    window.map.classList.remove('map--faded');
    noticeForm.classList.remove('notice__form--disabled');
    window.activateForm(flag);
    for (i = 0; i < window.mapFiltersSelects.length; i++) {
      window.mapFiltersSelects[i].disabled = false;
    }
  };
  var activatePage = function () {
    if (window.mapPinMainClickCounter < 1) {
      launchPage(true);
      window.fillAddressInput();
      window.collectListeners();
      window.load('https://js.dump.academy/keksobooking/data', window.pin.createMapPins, window.errorHandler);
      var filters = window.map.querySelector('.map__filters');
      filters.addEventListener('change', function () {
        window.debounce(window.load('https://js.dump.academy/keksobooking/data', window.pin.createMapPins));
        window.removeCard();
      });
    }
    window.mapPinMainClickCounter++;
  };

  window.mapPinMain.addEventListener('mousedown', function (evt) {
    window.activatePinMovement(evt);
    activatePage();
  });
  window.activateForm(isMapPinClicked);

  window.mapFiltersSelects = document.querySelectorAll('.map__filters select');
  for (var i = 0; i < window.mapFiltersSelects.length; i++) {
    window.mapFiltersSelects[i].disabled = true;
  }
})();

