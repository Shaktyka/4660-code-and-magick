'use strict';

var userDialog = document.querySelector('.setup');

userDialog.classList.remove('hidden');

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

var WIZARD_FORNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

// Функция, которая выбирает рандомный элемент из любого переданного ей массива
var getRandomElement = function (arrayName) {
  var randomElement = Math.floor(Math.random() * arrayName.length);
  return arrayName[randomElement];
};

// Функция, которая формирует имя мага из имени и фамилии, причём есть возможность поменять местами имя и фамилию

var getWizardName = function (wizardName, wizardForname, isDirect) {
  var wizardFullName;
  var NameOfWizard = getRandomElement(wizardName);
  var FornameOfWizard = getRandomElement(wizardForname);
  if (isDirect) {
    wizardFullName = NameOfWizard + ' ' + FornameOfWizard;
  } else {
    wizardFullName = FornameOfWizard + ' ' + NameOfWizard;
  }
  return wizardFullName;
};

// Функция, возвращающая объект собранного рандомно мага
var getWizardObject = function () {
  var wizardObject = {
    name: getWizardName(WIZARD_NAMES, WIZARD_FORNAMES, true),
    coatColor: getRandomElement(coatColors),
    eyesColor: getRandomElement(eyesColors)
  };
  return wizardObject;
};

// Функция, возвращающая массив из х объектов магов

var getWizardsArray = function (number) {
  var wizardsArray = [];
  for (var i = 0; i < number; i++) {
    wizardsArray.push(getWizardObject());
  }
  return wizardsArray;
};

// Генерация списка волшебников
// Находим блок, куда будем вставлять сгенерированный список
var similarListElement = userDialog.querySelector('.setup-similar-list');

// Находим шаблон, который будем использовать для генерации волшебника
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  return wizardElement;
};

var fragment = document.createDocumentFragment();
var wizards = getWizardsArray(4);
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

// Убираем класс hidden у блока для похожих магов
userDialog.querySelector('.setup-similar').classList.remove('hidden');
