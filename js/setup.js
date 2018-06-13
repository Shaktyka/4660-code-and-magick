'use strict';

var userDialog = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = userDialog.querySelector('.setup-close');

// Массивы значений для элементов мага

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

var WIZARD_FORNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

// Функция, которая выбирает рандомный элемент из любого переданного ей массива.
var getRandomElement = function (array) {
  var randomElement = Math.floor(Math.random() * array.length);
  return array[randomElement];
};

// Функция, которая формирует имя мага из имени и фамилии, причём есть возможность поменять местами имя и фамилию.
var getWizardName = function (wizardName, wizardForname, isDirect) {
  var wizardFullName;
  var nameOfWizard = getRandomElement(wizardName);
  var fornameOfWizard = getRandomElement(wizardForname);
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
    coatColor: getRandomElement(COAT_COLORS),
    eyesColor: getRandomElement(EYES_COLORS)
  };
  return wizardObject;
};

// Функция, возвращающая массив из х объектов магов.

var getWizardsArray = function (number) {
  var wizardsArray = [];
  for (var i = 0; i < number; i++) {
    wizardsArray.push(getWizardObject());
  }
  return wizardsArray;
};

// Генерация списка волшебников
// Находим блок, куда будем вставлять сгенерированный список.
var similarListElement = userDialog.querySelector('.setup-similar-list');

// Находим шаблон, который будем использовать для генерации волшебника.
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

// Клонируем шаблон мага, назначаем элементам соответствующие значения из объекта мага.
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  return wizardElement;
};

// Берём массив магов, формируем карточку и добавляем её в целевой блок.
var fragment = document.createDocumentFragment();
var wizards = getWizardsArray(4);
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

// Убираем класс hidden у блока для похожих магов
userDialog.querySelector('.setup-similar').classList.remove('hidden');

// Реализация открытия-закрытия окна настройки персонажа

setupOpen.addEventListener('click', function() {
  userDialog.classList.remove('hidden');
});

setupClose.addEventListener('click', function() {
  userDialog.classList.add('hidden');
});