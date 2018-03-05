'use strict';

var MAIN_PIN_OFFSET_X = 50;
var MAIN_PIN_OFFSET_Y = 50;
var MAIN_PIN_MIN_Y = 150;
var MAIN_PIN_MAX_Y = 500;

var setCoords = function (coords) {
  var minX = MAIN_PIN_OFFSET_X;
  var maxX = document.querySelector('.map').offsetWidth - MAIN_PIN_OFFSET_X;
  var minY = MAIN_PIN_MIN_Y - MAIN_PIN_OFFSET_Y;
  var maxY = MAIN_PIN_MAX_Y - MAIN_PIN_OFFSET_Y;

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

    window.newCoords = {
      x: window.mapPinMain.offsetLeft - shift.x,
      y: window.mapPinMain.offsetTop - shift.y
    };
    window.fillAddressInput(window.newCoords.x, window.newCoords.y, window.mapPinMain);
    window.newCoords = setCoords(window.newCoords);
    window.mapPinMain.style.top = (window.newCoords.y) + 'px';
    window.mapPinMain.style.left = (window.newCoords.x) + 'px';
  }
  function onMouseUp(upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};
