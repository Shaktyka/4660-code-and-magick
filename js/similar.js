'use strict';

(function () {
  window.wizards = [];

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
