'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var userDialog = document.querySelector('.setup');

// ГЕНЕРАЦИЯ ОДНОГО МАГА

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

// ГЕНЕРАЦИЯ СПИСКА ВОЛШЕБНИКОВ

// Функция, возвращающая массив из х объектов магов.

var getWizardsArray = function (number) {
  var wizardsArray = [];
  for (var i = 0; i < number; i++) {
    wizardsArray.push(getWizardObject());
  }
  return wizardsArray;
};

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

// ОТКРЫТИЕ-ЗАКРЫТИЕ ОКНА НАСТРОЕК

// Окно-попап с настройками персонажа

// var userDialog = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');

// Кнопка для закрытия окна настроек персонажа

var setupClose = userDialog.querySelector('.setup-close');

// Стартовые координаты окна
var startCoords = {
  x: userDialog.style.top,
  y: userDialog.style.left
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  userDialog.style.top = startCoords.y;
  userDialog.style.left = startCoords.x;
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

// НАСТРОЙКА ВНЕШНЕГО ВИДА МАГА

// Находим в разметке нужные элементы: настраиваемые элементы мага и скрытые поля

var setupPlayer = userDialog.querySelector('.setup-player');

var wizardCoat = setupPlayer.querySelector('.wizard-coat');

var coatColorInput = document.getElementById('coat-color');

var wizardEyes = setupPlayer.querySelector('.wizard-eyes');

var eyesColorInput = document.getElementById('eyes-color');

var setupFireball = setupPlayer.querySelector('.setup-fireball-wrap');

var fireballColorInput = document.getElementById('fireball-color');

// Функция для изменения цвета мантии при нажатии

var wizardCoatClickHandler = function () {
  var coatColor = getRandomElement(COAT_COLORS);
  wizardCoat.style.fill = coatColor;
  coatColorInput.value = coatColor;
};

wizardCoat.addEventListener('click', wizardCoatClickHandler);

// Функция для изменения цвета глаз при нажатии

var wizardEyesClickHandler = function () {
  var eyesColor = getRandomElement(EYES_COLORS);
  wizardEyes.style.fill = eyesColor;
  eyesColorInput.value = eyesColor;
};

wizardEyes.addEventListener('click', wizardEyesClickHandler);

// Функция для изменения цвета файербола при нажатии

var wizardFireballClickHandler = function () {
  var fireballColor = getRandomElement(FIREBALL_COLORS);
  setupFireball.style.backgroundColor = fireballColor;
  fireballColorInput.value = fireballColor;
};

setupFireball.addEventListener('click', wizardFireballClickHandler);
