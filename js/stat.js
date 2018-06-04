'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
// var FONT_GAP = 16;
var FONT_WIDTH = 40;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var MAX_HIST_HEIGHT = 150;
var CLOUD_BOT = CLOUD_Y + CLOUD_HEIGHT;

var renderCloud = function (ctx, x, y, color) {
  var coeff = 10;

  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.moveTo(x, y);
  ctx.lineTo(x + CLOUD_WIDTH / 2, y + coeff);
  ctx.lineTo(x + CLOUD_WIDTH, y);
  ctx.lineTo(x + CLOUD_WIDTH - coeff, y + CLOUD_HEIGHT / 2);
  ctx.lineTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT);
  ctx.lineTo(x + CLOUD_WIDTH - CLOUD_WIDTH / 2, y + CLOUD_HEIGHT - coeff);
  ctx.lineTo(x, y + CLOUD_HEIGHT);
  ctx.lineTo(x + coeff, y + CLOUD_HEIGHT / 2);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
};

var getMaxElement = function (array) {
  var maxElement = array[0];
  for (var i = 0; i < array.length; i++) {
    if (array[0] > maxElement) {
      maxElement = array[i];    
    }
  }
  return Math.ceil(maxElement);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

  // Отрисока текста в облаке
  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.textAlign = 'center';
  ctx.fillText('Ура, вы победили!', 310, 30);
  ctx.fillText('Список результатов:', 310, 50);
  
  // Гистограмма
  ctx.fillStyle = '#000000';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'baseline';
  ctx.font = '16px PT Mono';
  
  var maxTime = getMaxElement(times);
  
  // Цикл для отрисовки имён и столбиков
  for (var i = 0; i < names.length; i++) {
    ctx.fillText(
    names[i], 
    CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, 
    CLOUD_BOT - GAP * 3);
  ctx.fillRect(
    CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, 
    (CLOUD_BOT) - (GAP * 3 + GAP) - (times[i] * MAX_HIST_HEIGHT) / maxTime, 
    BAR_WIDTH, 
    (times[i] * MAX_HIST_HEIGHT) / maxTime);  
  };
};
