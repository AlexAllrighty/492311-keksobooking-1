'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var noticeForm = document.querySelector('.notice__form');
  var mapFiltersSelects = document.querySelectorAll('.map__filters select');
  var disableFilters = function (flag) {
    mapFiltersSelects.forEach(function (elem) {
      elem.disabled = flag;
    });
  };
  disableFilters(true);
  window.mapPinMainClickCounter = 0;

  var showResponseMessage = function (message, messageStyle) {
    var body = document.querySelector('body');
    var responseMessage = document.createElement('div');
    responseMessage.classList.add(messageStyle);
    responseMessage.textContent = message;
    body.appendChild(responseMessage);
    setTimeout(function () {
      body.removeChild(responseMessage);
    }, 3000);
  };

  var resetPage = function () {
    noticeForm.reset();
    noticeForm.classList.add('notice__form--disabled');
    mapPinMain.style.left = '50%';
    mapPinMain.style.top = '375px';
    window.form.fillAddressInput();
    window.form.enableForm(false);
    window.pin.removePins();
    window.card.removeCard();
    window.mapPinMainClickCounter = 0;
    map.classList.add('map--faded');
    disableFilters(true);
  };

  window.util = {
    ads: [],
    map: map,
    mapPinMain: mapPinMain,
    noticeForm: noticeForm,
    mapFiltersSelects: mapFiltersSelects,
    showResponseMessage: showResponseMessage,
    resetPage: resetPage,
    disableFilters: disableFilters
  };
})();
