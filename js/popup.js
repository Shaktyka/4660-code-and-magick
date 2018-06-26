'use strict';

// ОТКРЫТИЕ-ЗАКРЫТИЕ ОКНА НАСТРОЕК

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var setupOpen = document.querySelector('.setup-open');

  // Кнопка для закрытия окна настроек персонажа

  var setupClose = window.userDialog.querySelector('.setup-close');

  // Стартовые координаты окна
  var startCoords = {
    x: window.userDialog.style.top,
    y: window.userDialog.style.left
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  var openPopup = function () {
    window.userDialog.style.top = startCoords.y;
    window.userDialog.style.left = startCoords.x;
    window.userDialog.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    window.userDialog.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup();
    }
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  });
})();
