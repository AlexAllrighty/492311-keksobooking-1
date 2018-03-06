'use strict';

(function () {
  var allFilters = document.querySelectorAll('.map__filter');
  var PRICE_LIMITS = {
    low: 10000,
    high: 50000
  };

  var PriceParameters = {
    'low': function (price) {
      return price < PRICE_LIMITS.low;
    },
    'middle': function (price) {
      return price >= PRICE_LIMITS.low && price < PRICE_LIMITS.high;
    },
    'high': function (price) {
      return price >= PRICE_LIMITS.high;
    }
  };

  var filterValue = function (array, value, type) {
    return array.filter(function (it) {
      return it.offer[type].toString() === value;
    });
  };

  var filterFeatures = function (array, feature) {
    return array.filter(function (it) {
      return it.offer.features.indexOf(feature) !== -1;
    });
  };

  var filterPrice = function (array, value) {
    return array.filter(function (it) {
      return PriceParameters[value](it.offer.price);
    });
  };

  window.filtrate = function (initialArray) {
    var selectedFeatures = document.querySelectorAll('.map__filter-set input[type="checkbox"]:checked');
    var checkedFilters = Array.from(allFilters).filter(function (filter) {
      return filter.value !== 'any';
    });
    var emptyArrays = initialArray.slice();
    checkedFilters.forEach(function (item) {
      var type = item.name.split('-')[1];
      emptyArrays = (type === 'price') ? filterPrice(emptyArrays, item.value) : filterValue(emptyArrays, item.value, type);
    });

    selectedFeatures.forEach(function (item) {
      emptyArrays = filterFeatures(emptyArrays, item.value);
    });
    return emptyArrays;
  };
})();
