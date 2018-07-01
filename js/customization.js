'use strict';

// НАСТРОЙКА ВНЕШНЕГО ВИДА МАГА

(function () {

  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  // Находим в разметке нужные элементы: настраиваемые элементы мага и скрытые поля

  var setupPlayer = window.userDialog.querySelector('.setup-player');

  var wizardCoatElement = setupPlayer.querySelector('.wizard-coat');
  var coatColorInput = document.getElementById('coat-color');

  var wizardEyesElement = setupPlayer.querySelector('.wizard-eyes');
  var eyesColorInput = document.getElementById('eyes-color');

  var setupFireballElement = setupPlayer.querySelector('.setup-fireball-wrap');
  var fireballColorInput = document.getElementById('fireball-color');

  // Функция для изменения цвета мантии при нажатии

  var wizardCoatClickHandler = function () {
    var coatColor = window.util.getRandomElement(COAT_COLORS);
    wizardCoatElement.style.fill = coatColor;
    coatColorInput.value = coatColor;
  };

  wizardCoatElement.addEventListener('click', wizardCoatClickHandler);

  // Функция для изменения цвета глаз при нажатии

  var wizardEyesClickHandler = function () {
    var eyesColor = window.util.getRandomElement(EYES_COLORS);
    wizardEyesElement.style.fill = eyesColor;
    eyesColorInput.value = eyesColor;
  };

  wizardEyesElement.addEventListener('click', wizardEyesClickHandler);

  // Функция для изменения цвета файербола при нажатии

  var wizardFireballClickHandler = function () {
    var fireballColor = window.util.getRandomElement(FIREBALL_COLORS);
    setupFireballElement.style.backgroundColor = fireballColor;
    fireballColorInput.value = fireballColor;
  };

  setupFireballElement.addEventListener('click', wizardFireballClickHandler);
})();
