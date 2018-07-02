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
  var coatColor;

  var wizardEyesElement = setupPlayer.querySelector('.wizard-eyes');
  var eyesColorInput = document.getElementById('eyes-color');
  var eyesColor;

  var setupFireballElement = setupPlayer.querySelector('.setup-fireball-wrap');
  var fireballColorInput = document.getElementById('fireball-color');
  var fireballColor;

  // Фильтрация магов
  window.updateWizards = function () {

    var sameCoatAndEyesAndFireballWizards = window.wizards.filter(function (it) {
      return it.colorCoat === coatColor &&
        it.colorEyes === eyesColor && it.colorFireball === fireballColor;
    });

    var sameCoatWizards = window.wizards.filter(function (it) {
      return it.colorCoat === coatColor;
    });
    var sameEyesWizards = window.wizards.filter(function (it) {
      return it.colorEyes === eyesColor;
    });
    var sameFireballWizards = window.wizards.filter(function (it) {
      return it.colorFireball === fireballColor;
    });

    var filteredWizards = sameCoatAndEyesAndFireballWizards;
    filteredWizards = filteredWizards.concat(sameCoatWizards);
    filteredWizards = filteredWizards.concat(sameEyesWizards);
    filteredWizards = filteredWizards.concat(sameFireballWizards);
    filteredWizards = filteredWizards.concat(window.wizards);

    var uniqueWizards =
    filteredWizards.filter(function (it, i) {
      return filteredWizards.indexOf(it) === i;
    });

    window.render(uniqueWizards);
  };

  // Функция для изменения цвета мантии при нажатии

  var coatClickHandler = function () {
    var newColor = window.util.getRandomElement(COAT_COLORS);
    wizardCoatElement.style.fill = coatColor;
    coatColorInput.value = newColor;
    coatColor = newColor;
    window.updateWizards();
  };

  wizardCoatElement.addEventListener('click', coatClickHandler);

  // Функция для изменения цвета глаз при нажатии

  var eyesClickHandler = function () {
    var newColor = window.util.getRandomElement(EYES_COLORS);
    wizardEyesElement.style.fill = eyesColor;
    eyesColorInput.value = newColor;
    eyesColor = newColor;
    window.updateWizards();
  };

  wizardEyesElement.addEventListener('click', eyesClickHandler);

  // Функция для изменения цвета файербола при нажатии

  var fireballClickHandler = function () {
    var newColor = window.util.getRandomElement(FIREBALL_COLORS);
    setupFireballElement.style.backgroundColor = fireballColor;
    fireballColorInput.value = newColor;
    fireballColor = newColor;
    window.updateWizards();
  };

  setupFireballElement.addEventListener('click', fireballClickHandler);
})();
