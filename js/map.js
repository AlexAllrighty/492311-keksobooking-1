'use strict';

(function () {
  window.map = document.querySelector('.map');
  window.mapPinMain = document.querySelector('.map__pin--main');
  var isMapPinClicked = false;
  var launchPage = function (flag) {
    window.map.classList.remove('map--faded');
    window.noticeForm.classList.remove('notice__form--disabled');
    window.activateForm(flag);
  };
  window.mapPinMain.addEventListener('mousedown', function (evt) {
    if (!window.map.classList.contains('map--faded')) {
      window.activatePinMovement(evt);
    }
  });
  var onMapPinMainClick = function () {
    launchPage(true);
    window.fillAddressInput();
    window.collectListeners();
    window.load('https://js.dump.academy/keksobooking/data', window.successHandler, window.errorHandler);
  };

  window.mapPinMain.addEventListener('mouseup', onMapPinMainClick);
  window.activateForm(isMapPinClicked);
})();

