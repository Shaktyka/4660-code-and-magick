'use strict';

var setup = document.querySelector('.setup');

// Находим то, что будем перетаскивать
var dialogHandler = setup.querySelector('.setup-user-pic');

// Добавляем обработчик 1 фазы события - mousdown
dialogHandler.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  // Записываем стартовые координаты
  var startCoordinates = {
    x: evt.clientX,
    y: evt.clientY
  };
  var dragged = false;
  // При каждом движении мыши обновляем смещение относительно первоначальной точки
  var mouseMoveHandler = function (moveEvt) {
    moveEvt.preventDefault();
    dragged = true;
    var shift = {
      x: startCoordinates.x - moveEvt.clientX,
      y: startCoordinates.y - moveEvt.clientY
    };
    startCoordinates = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };
    setup.style.top = (setup.offsetTop - shift.y) + 'px';
    setup.style.left = (setup.offsetLeft - shift.x) + 'px';
  };
  // При отжатии кнопки мыши перестаём слушать перемещение курсора
  var mouseUpHandler = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
  };
  if (dragged) {
    var onClickPreventDefault = function (preEvt) {
      preEvt.preventDefault();
      dialogHandler.removeEventListener('click', onClickPreventDefault);
    };
    dialogHandler.addEventListener('click', onClickPreventDefault);
  }
  // Добавляем обработчики событий на движение мыши и на отжатие кнопки мыши
  document.addEventListener('mousemove', mouseMoveHandler);
  document.addEventListener('mouseup', mouseUpHandler);
});
