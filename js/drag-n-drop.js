'use strict';
(function () {
  var MAIN_PIN_OFFSET_X = 40;
  var MAIN_PIN_OFFSET_Y = 40;
  var MAIN_PIN_MIN_Y = 150;
  var MAIN_PIN_MAX_Y = 500;
  var minX = MAIN_PIN_OFFSET_X;
  var maxX = window.util.map.offsetWidth - MAIN_PIN_OFFSET_X;
  var minY = MAIN_PIN_MIN_Y - MAIN_PIN_OFFSET_Y;
  var maxY = MAIN_PIN_MAX_Y - MAIN_PIN_OFFSET_Y;
  var setCoords = function (coords) {
    if (coords.x < minX) {
      coords.x = minX;
    } else if (coords.x > maxX) {
      coords.x = maxX;
    }
    if (coords.y < minY) {
      coords.y = minY;
    } else if (coords.y > maxY) {
      coords.y = maxY;
    }
    return coords;
  };
  window.activatePinMovement = function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      var newCoords = {
        x: window.util.mapPinMain.offsetLeft - shift.x,
        y: window.util.mapPinMain.offsetTop - shift.y
      };
      window.form.fillAddressInput(newCoords.x, newCoords.y, window.util.mapPinMain);
      newCoords = setCoords(newCoords);
      window.util.mapPinMain.style.top = (newCoords.y) + 'px';
      window.util.mapPinMain.style.left = (newCoords.x) + 'px';
    }
    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };
})();
