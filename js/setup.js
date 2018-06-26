'use strict';

// ГЕНЕРАЦИЯ ОДНОГО МАГА

(function () {
  // Массивы значений для элементов мага

  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

  var WIZARD_FORNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

  window.COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

  window.EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

  window.userDialog = document.querySelector('.setup');

  // Функция, которая формирует имя мага из имени и фамилии, причём есть возможность поменять местами имя и фамилию.
  var getWizardName = function (wizardName, wizardForname, isDirect) {
    var wizardFullName;
    var nameOfWizard = window.getRandomElement(wizardName);
    var fornameOfWizard = window.getRandomElement(wizardForname);
    if (isDirect) {
      wizardFullName = nameOfWizard + ' ' + fornameOfWizard;
    } else {
      wizardFullName = fornameOfWizard + ' ' + nameOfWizard;
    }
    return wizardFullName;
  };

  // Функция, возвращающая объект собранного рандомно мага.
  var getWizardObject = function () {
    var wizardObject = {
      name: getWizardName(WIZARD_NAMES, WIZARD_FORNAMES, true),
      coatColor: window.getRandomElement(window.COAT_COLORS),
      eyesColor: window.getRandomElement(window.EYES_COLORS)
    };
    return wizardObject;
  };

  // Функция, возвращающая массив из х объектов магов.
  window.getWizardsArray = function (number) {
    var wizardsArray = [];
    for (var i = 0; i < number; i++) {
      wizardsArray.push(getWizardObject());
    }
    return wizardsArray;
  };

  // Клонируем шаблон мага, назначаем элементам соответствующие значения из объекта мага.
  window.renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    return wizardElement;
  };

  // Находим шаблон, который будем использовать для генерации волшебника.
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  // Находим блок, куда будем вставлять сгенерированный список.
  var similarListElement = window.userDialog.querySelector('.setup-similar-list');

  // Берём массив магов, формируем карточку и добавляем её в целевой блок.
  var fragment = document.createDocumentFragment();
  var wizards = window.getWizardsArray(4);
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(window.renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);

  // Убираем класс hidden у блока для похожих магов
  window.userDialog.querySelector('.setup-similar').classList.remove('hidden');
})();
