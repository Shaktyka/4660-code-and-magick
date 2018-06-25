'use strict';

// ВСТАВКА МАГОВ В ЦЕЛЕВОЙ БЛОК

(function () {
  var userDialog = document.querySelector('.setup');

  // Находим блок, куда будем вставлять сгенерированный список.
  var similarListElement = userDialog.querySelector('.setup-similar-list');

  // Берём массив магов, формируем карточку и добавляем её в целевой блок.
  var fragment = document.createDocumentFragment();
  var wizards = window.getWizardsArray(4);
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(window.renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);

  // Убираем класс hidden у блока для похожих магов
  userDialog.querySelector('.setup-similar').classList.remove('hidden');
})();
