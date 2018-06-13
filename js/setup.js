'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var userDialog = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = userDialog.querySelector('.setup-close');
var userNameInput = userDialog.querySelector('.setup-user-name');

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

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
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


// Находим блок, в котором лежат настраиваемые элементы мага и скрытые поля

var setupPlayer = userDialog.querySelector('.setup-player');

var wizardCoat = setupPlayer.querySelector('.wizard-coat');

var coatColorInput = setupPlayer.getElementsByName('coat-color');

var wizardEyes = setupPlayer.querySelector('.wizard-eyes');

var eyesColorInput = setupPlayer.getElementsByName('eyes-color');

var setupFireball = setupPlayer.querySelector('.setup-fireball');

var fireballColorInput = setupPlayer.getElementsByName('fireball-color');

// Изменение цвета мантии мага при нажатии
// массив COAT_COLORS
// Нажатие на элемент wizardCoat приводит к рандомной смене цвета мантии
// Также нужно записать соотв-щее значение в скрытое поле. 

// Описание функции по записи цвета 
// 1) в мантию,
// 2) в скрытое поле.

var wizardCoatClickHandler = function () {
  var coatColor = getRandomElement(COAT_COLORS);
  wizardCoat.style.fill = coatColor;
};

wizardCoat.addEventListener('click', wizardCoatClickHandler);

// Изменение цвета глаз мага при нажатии
// массив EYES_COLORS

// Изменение цвета файербола мага при нажатии
// массив FIREBALL_COLORS

// Назначение соотвествующих текстов сообщений пользователю при невалидном вводе
userNameInput.addEventListener('invalid', function (evt) {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2 символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25 символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});
