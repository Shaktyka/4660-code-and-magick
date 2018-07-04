'use strict';

(function () {
  window.coatColor = '';
  window.eyesColor = '';
  window.fireballColor = '';

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
    if (wizard.colorFireball === window.fireballColor) {
      rank += 1;
    }
    return rank;
  };

  // Фильтрация магов
  window.updateWizards = function () {
    window.render(window.wizards.slice().sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = window.wizards.indexOf(left) - window.wizards.indexOf(right);
      }
      return rankDiff;
    }));
  };

  var successHandler = function (data) {
    window.wizards = data;
    window.updateWizards();
  };

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

  window.load(successHandler, window.errorHandler);

})();
