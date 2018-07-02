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

  // Система рангов магов
  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }
    if (wizard.colorFireball === fireballColor) {
      rank += 1;
    }

    return rank;
  };

  // Выбор магов в случае, если они равны по рангу
  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  // Фильтрация магов
  window.updateWizards = function () {
    window.render(window.wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
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
