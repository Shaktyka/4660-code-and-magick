'use strict';

var setup = document.querySelector('div.setup');

setup.classList.remove('hidden');

var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

var fornames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

var coatColor = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

var eyesColor = ['black', 'red', 'blue', 'yellow', 'green'];

var getRandElem = function (massiveName) {
  var randElem = Math.floor(Math.random() * massiveName.length);
  return massiveName[randElem];
};

// Объект Волшебник
// {
//    name: 'составное имя',
//    coatColor: '',
//    eyesColor: ''
// }
