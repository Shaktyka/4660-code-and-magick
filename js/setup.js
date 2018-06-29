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

  window.load(successHandler, errorHandler);

  // Формирование объекта FormData и закрытие окна после успешной отправки
  var form = window.userDialog.querySelector('.setup-wizard-form');
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var formData = new FormData(form);

    var saveHandler = function () {
      window.userDialog.classList.add('hidden');
    };

    window.save(formData, saveHandler, errorHandler);

  });

})();
