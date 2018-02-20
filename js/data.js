'use strict';

(function () {
  window.getRandomInteger = function (min, max) {
    var randomInteger = min + Math.random() * (max + 1 - min);
    randomInteger = Math.floor(randomInteger);
    return randomInteger;
  };

  window.getRandomArrElement = function (arr) {
    var rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
  };

  window.getRandomArray = function (arr) {
    var obj = {};
    for (var i = 0; i <= window.getRandomInteger(1, arr.length); i++) {
      var randomElement = window.getRandomArrElement(arr);
      obj[randomElement] = true;
    }
    return Object.keys(obj);
  };
})();
