'use strict';

// ГЕНЕРАЦИЯ ПОХОЖИХ МАГОВ

(function () {
  // Массивы значений для элементов мага

  window.userDialog = document.querySelector('.setup');

  // Клонируем шаблон мага, назначаем элементам соответствующие значения из объекта мага.
  window.renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    return wizardElement;
  };

  // Находим шаблон, который будем использовать для генерации волшебника.
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  // Находим блок, куда будем вставлять сгенерированный список.
  var similarListElement = window.userDialog.querySelector('.setup-similar-list');

  // Добавляем магов в целевой блок.

  var successHandler = function (wizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < 4; i++) {
      fragment.appendChild(window.renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);

    window.userDialog.querySelector('.setup-similar').classList.remove('hidden');
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.load(successHandler, errorHandler);

  // Формирование объекта FormData и закрытие окна после успешной отправки
  var form = window.userDialog.querySelector('.setup-wizard-form');
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.save(new FormData(form), function () {
      window.userDialog.classList.add('hidden');
    });
  });
})();
