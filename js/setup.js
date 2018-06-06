'use strict';

var userDialog = document.querySelector('.setup');

userDialog.classList.remove('hidden');

var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

var fornames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

var coatColor = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

var eyesColor = ['black', 'red', 'blue', 'yellow', 'green'];

// Функция, которая выбирает рандомный элемент из любого переданного ей массива
var getRandElem = function (massiveName) {
  var randElem = Math.floor(Math.random() * massiveName.length);
  return massiveName[randElem];
};

// Функция, которая формирует имя мага из имени и фамилии, причём есть возможность поменять местами имя и фамилию

var getWizardName = function (wizNames, wizFornames, isDirect) {
  var wizardName;
  var wizName = getRandElem(wizNames);
  var wizForname = getRandElem(wizFornames);
  if (isDirect) {
    wizardName = wizName + ' ' + wizForname;
  } else {
    wizardName = wizForname + ' ' + wizName;
  }
  return wizardName;
};

// Функция, возвращающая объект собранного рандомно мага
var getWizObject = function () {
  var wizObj = {
    name: getWizardName(names, fornames, true),
    coatColor: getRandElem(coatColor),
    eyesColor: getRandElem(eyesColor)
  };
  console.log(wizObj);
  return wizObj;
};

// Функция, возвращающая массив из х объектов магов

var getWizardsArray = function (num) {
  var wizardsArray = [];
  for (var i = 0; i < num; i++) {
    wizardsArray[i] = getWizObject();
    wizardsArray.push(wizardsArray[i]);
  }
  console.log(wizardsArray);
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
for (var i = 0; i < wizards.length - 1; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

// Убираем класс hidden у блока для похожих магов
userDialog.querySelector('.setup-similar').classList.remove('hidden');
