"use strict";

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;

var renderCloud = function(ctx, x, y, color) {
  var coeff = 20;

  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.moveTo(x, y);
  ctx.lineTo(x+CLOUD_WIDTH/2, y+coeff);
  ctx.lineTo(x+CLOUD_WIDTH, y);
  ctx.lineTo(x+CLOUD_WIDTH - coeff, y+CLOUD_HEIGHT/2);
  ctx.lineTo(x+CLOUD_WIDTH, y+CLOUD_HEIGHT);
  ctx.lineTo(x+CLOUD_WIDTH-CLOUD_WIDTH/2, y+CLOUD_HEIGHT-coeff);
  ctx.lineTo(x, y+CLOUD_HEIGHT);
  ctx.lineTo(x+coeff, y+CLOUD_HEIGHT/2);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
};

window.renderStatistics = function(ctx, names, times) {
  renderCloud(ctx, 110, 20, "rgba(0, 0, 0, 0.7)");
  renderCloud(ctx, 100, 10, "#ffffff");

  ctx.fillStyle = "#000000";
  ctx.font = "16px PT Mono";
  ctx.textBaseline = "hanging";
  ctx.textAlign = "center";
  ctx.fillText("Ура, вы победили!", 310, 40);
  ctx.fillText("Список результатов:", 310, 60);
};

