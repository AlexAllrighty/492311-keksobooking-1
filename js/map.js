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

  var onMapPinMainClick = function () {
    launchPage(true);
    window.renderMapPinBlock();
    window.fillAddressInput();
    window.collectListeners();
  };

  window.mapPinMain.addEventListener('mouseup', onMapPinMainClick);
  window.activateForm(isMapPinClicked);
})();
