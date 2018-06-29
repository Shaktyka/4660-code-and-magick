'use strict';

// ОТКРЫТИЕ-ЗАКРЫТИЕ ОКНА НАСТРОЕК

(function () {

  // Кнопки открытия и закрытия окна настроек персонажа

  var setupOpen = document.querySelector('.setup-open');

  var setupClose = window.userDialog.querySelector('.setup-close');

  // Стартовые координаты окна
  var startCoords = {
    x: window.userDialog.style.top,
    y: window.userDialog.style.left
  };

  // Функция обработки клавиатурного события
  var escKeydownHandler = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };

  var openPopup = function () {
    window.userDialog.style.top = startCoords.y;
    window.userDialog.style.left = startCoords.x;
    window.userDialog.classList.remove('hidden');
    document.addEventListener('keydown', escKeydownHandler);
  };

  var closePopup = function () {
    window.userDialog.classList.add('hidden');
    window.closeError();
    document.removeEventListener('keydown', escKeydownHandler);
  };

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });
})();
