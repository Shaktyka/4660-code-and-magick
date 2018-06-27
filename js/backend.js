'use strict';

(function () {

  // функция для отправки данных игрока на сервер
  window.save = function (data, onLoad, onError) {
    var SAVE_URL = 'https://js.dump.academy/code-and-magick';

    var xhr = new XMLHttpRequest();
    xhr.response.type = 'json';

    xhr.addEventListener('load', function () {
      onLoad(xhr.response);
    });

    xhr.open('POST', SAVE_URL);
    xhr.send(data);
  };

  // Функция для получения данных о волшебниках с сервера
  window.load = function (onLoad, onError) {
    var LOAD_URL = 'https://js.dump.academy/code-and-magick/data';

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open('GET', LOAD_URL);
    xhr.send();
  };

})();
