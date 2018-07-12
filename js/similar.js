'use strict';

(function () {
  var node = null;

  window.wizards = [];

  window.coatColor = '';
  window.eyesColor = '';

  // Дефолтный маг
  var defaultWizardParameters = {
    coatColor: 'rgb(101, 137, 164)',
    eyesColor: 'black',
    fireballColor: '#ee4830'
  };

  var wizard = {
    onEyesChange: function () {},
    onCoatChange: function () {}
  };

  // Система рангов магов
  var getRank = function (currentWizard) {
    var rank = 0;

    if (currentWizard.colorCoat === window.coatColor) {
      rank += 2;
    }
    if (currentWizard.colorEyes === window.eyesColor) {
      rank += 1;
    }
    return rank;
  };

  wizard.onEyesChange = window.debounce(function (color) {
    window.eyesColor = color;
    window.updateWizards();
  });

  wizard.onCoatChange = window.debounce(function (color) {
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
    node = document.createElement('div');
    node.classList.add('modal');
    node.classList.add('modal--error');
    node.tabIndex = 0;

    node.textContent = errorMessage;
    document.body.insertBefore(node, document.body.firstChild);

    window.closeError = function () {
      node.classList.add('hidden');
    };

    node.addEventListener('click', function () {
      window.closeError();
    });

    node.addEventListener('keydown', function (evt) {
      window.util.isEnterEvent(evt, window.closeError);
    });
  };

  window.backend.load(successHandler, window.errorHandler);

  window.similar = {
    node: node
  };
})();
