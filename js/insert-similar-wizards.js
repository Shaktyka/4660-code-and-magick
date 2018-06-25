'use strict';

(function () {
  var userDialog = document.querySelector('.setup');

  // Берём массив магов, формируем карточку и добавляем её в целевой блок.
  var fragment = document.createDocumentFragment();
  var wizards = getWizardsArray(4);
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);

  // Убираем класс hidden у блока для похожих магов
  userDialog.querySelector('.setup-similar').classList.remove('hidden');
})();
