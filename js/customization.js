'use strict';

// НАСТРОЙКА ВНЕШНЕГО ВИДА МАГА

(function () {

  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  // Находим в разметке нужные элементы: настраиваемые элементы мага и скрытые поля

  var setupPlayer = window.userDialog.querySelector('.setup-player');

  var wizardCoat = setupPlayer.querySelector('.wizard-coat');

  var coatColorInput = document.getElementById('coat-color');

  var wizardEyes = setupPlayer.querySelector('.wizard-eyes');

  var eyesColorInput = document.getElementById('eyes-color');

  var setupFireball = setupPlayer.querySelector('.setup-fireball-wrap');

  var fireballColorInput = document.getElementById('fireball-color');

  // Функция для изменения цвета мантии при нажатии

  var wizardCoatClickHandler = function () {
    var coatColor = window.getRandomElement(window.COAT_COLORS);
    wizardCoat.style.fill = coatColor;
    coatColorInput.value = coatColor;
  };

  wizardCoat.addEventListener('click', wizardCoatClickHandler);

  // Функция для изменения цвета глаз при нажатии

  var wizardEyesClickHandler = function () {
    var eyesColor = window.getRandomElement(window.EYES_COLORS);
    wizardEyes.style.fill = eyesColor;
    eyesColorInput.value = eyesColor;
  };

  wizardEyes.addEventListener('click', wizardEyesClickHandler);

  // Функция для изменения цвета файербола при нажатии

  var wizardFireballClickHandler = function () {
    var fireballColor = window.getRandomElement(FIREBALL_COLORS);
    setupFireball.style.backgroundColor = fireballColor;
    fireballColorInput.value = fireballColor;
  };

  setupFireball.addEventListener('click', wizardFireballClickHandler);
})();
