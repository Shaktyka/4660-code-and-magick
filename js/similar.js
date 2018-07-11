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

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  window.wizard.onEyesChange = window.debounce(function (color) {
    window.eyesColor = color;
    window.updateWizards();
  });

  window.wizard.onCoatChange = window.debounce(function (color) {
    window.coatColor = color;
    window.updateWizards();
  });

  window.wizard.onFireballChange = window.debounce(function (color) {
    window.fireballColor = color;
    window.updateWizards();
  });

  // Фильтрация магов
  window.updateWizards = function () {
    window.render(window.wizards.slice().sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
        // window.wizards.indexOf(left) - window.wizards.indexOf(right);
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

  window.backend.load(successHandler, window.errorHandler);

})();
