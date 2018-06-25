'use strict';

(function () {
  // Функция, которая выбирает рандомный элемент из любого переданного ей массива.
  var getRandomElement = function (array) {
    var randomElement = Math.floor(Math.random() * array.length);
    return array[randomElement];
  };
})();
