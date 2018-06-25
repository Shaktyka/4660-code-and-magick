'use strict';

(function () {
  // Функция, которая выбирает рандомный элемент из любого переданного ей массива.
  window.getRandomElement = function (array) {
    var randomElement = Math.floor(Math.random() * array.length);
    return array[randomElement];
  };
})();
