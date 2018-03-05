'use strict';

(function () {
  var noticeForm = document.querySelector('.notice__form');
  var errorMessage = 'Ошибка соединения';
  var errorMessageStyle = 'error-message';
  var isMapPinClicked = false;
  var launchPage = function (flag) {
    window.util.map.classList.remove('map--faded');
    noticeForm.classList.remove('notice__form--disabled');
    window.form.enableForm(flag);
    window.util.disableFilters(false);
  };
  var onLoad = function (data) {
    window.util.ads = data;
    window.pin.createMapPins(window.util.ads);
  };
  var onError = function () {
    window.util.showResponseMessage(errorMessage, errorMessageStyle);
  };

  var activatePage = function () {
    if (window.mapPinMainClickCounter < 1) {
      launchPage(true);
      window.backend.load(onLoad, onError);
      var filters = window.util.map.querySelector('.map__filters');
      filters.addEventListener('change', function () {
        window.debounce(window.backend.load(onLoad, onError));
        window.card.removeCard();
      });
    }
    window.mapPinMainClickCounter++;
  };

  window.util.mapPinMain.addEventListener('mousedown', function (evt) {
    window.activatePinMovement(evt);
    activatePage();
  });
  window.form.enableForm(isMapPinClicked);
})();

