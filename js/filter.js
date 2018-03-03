'use strict';

(function () {
  var priceLimits = {
    low: 10000,
    high: 50000
  };

  var allFilters = document.querySelectorAll('.map__filter');

  var priceParameters = {
    'low': function (price) {
      return price < priceLimits.low;
    },
    'middle': function (price) {
      return price >= priceLimits.low && price < priceLimits.high;
    },
    'high': function (price) {
      return price >= priceLimits.high;
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
      return priceParameters[value](it.offer.price);
    });
  };

  window.filters = function (initialArray) {
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
