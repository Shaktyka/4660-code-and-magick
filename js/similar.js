'use strict';

(function () {
  window.coatColor = '';
  window.eyesColor = '';

  // Дефолтный маг
  var defaultWizardParameters = {
    coatColor: 'rgb(101, 137, 164)',
    eyesColor: 'black',
    fireballColor: '#ee4830'
  };

  window.wizards = [];

  // Система рангов магов
  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === window.coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === window.eyesColor) {
      rank += 1;
    }
    return rank;
  };

  window.wizard.onEyesChange = window.debounce(function (color) {
    window.eyesColor = color;
    window.updateWizards();
  });

  window.wizard.onCoatChange = window.debounce(function (color) {
    window.coatColor = color;
    window.updateWizards();
  });

  // Фильтрация магов
  window.updateWizards = function () {
    window.render(window.wizards.slice().sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      return rankDiff;
    }));
  };

  // При успешной загрузке списка магов
  var successHandler = function (data) {
    window.wizards = data;

    window.coatColor = defaultWizardParameters.coatColor;
    window.eyesColor = defaultWizardParameters.eyesColor;

    window.updateWizards();
  };

  // Вывод сообщения с ошибкой при загрузке
  window.errorHandler = function (errorMessage) {
    window.node = document.createElement('div');
    window.node.classList.add('modal');
    window.node.classList.add('modal--error');
    window.node.tabIndex = 0;

    window.node.textContent = errorMessage;
    document.body.insertBefore(window.node, document.body.firstChild);

    window.closeError = function () {
      window.node.classList.add('hidden');
    };

    window.node.addEventListener('click', function () {
      window.closeError();
    });

    window.node.addEventListener('keydown', function (e) {
      window.util.isEnterEvent(e, window.closeError);
    });
  };

  window.backend.load(successHandler, window.errorHandler);
})();
