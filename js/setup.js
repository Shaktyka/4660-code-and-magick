'use strict';

// ГЕНЕРАЦИЯ ОДНОГО МАГА

(function () {
  // Массивы значений для элементов мага

  window.COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

  window.EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

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

  window.load(function (wizards) {
    var fragment = document.createDocumentFragment();
    // var wizards = window.getWizardsArray(4);
    for (var i = 0; i < 4; i++) {
      fragment.appendChild(window.renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);

    window.userDialog.querySelector('.setup-similar').classList.remove('hidden');
  });

  // Формирование объекта FormData и закрытие окна после успешной отправки
  var form = window.userDialog.querySelector('.setup-wizard-form');
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.save(new FormData(form), function (response) {
      window.userDialog.classList.add('hidden');
    });
  });
})();
