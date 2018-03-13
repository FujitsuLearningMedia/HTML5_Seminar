var canvas; // canvas要素
var Pen = {
  context: {},
  canvasHeight: 0,
  canvasWidth: 0,
  penMode: 'draw',
  init: function (canvas) {
    this.context = canvas.getContext('2d');
    this.canvasHeight = canvas.height;
    this.canvasWidth = canvas.width;
    this.context.beginPath();
  },
  draw: function (x, y) {
    //キャンバスに描画する
    this.context.lineTo(x, y);
    this.context.stroke();
  },
  erase: function (x, y) {
    this.context.clearRect(x, y, 5, 5);
  },
  eraseAll: function () {
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.context.beginPath();
  },
  changeColor: function (color) {
    this.context.strokeStyle = color;
    this.context.beginPath();
  }
}

// イベント登録のヘルパ関数
function initCanvas() {
  // canvasと2D Contextオブジェクトの設定（付録参照）とイベントの関連付け
  canvas = document.getElementById('testCanvas');
  Pen.init(canvas);
  // イべントの登録
  canvas.addEventListener('mousedown', mouseDownOnCanvas, false);
  canvas.addEventListener('mouseup', clearEvent, false)
  canvas.addEventListener('mouseout', clearEvent, false)
  document.getElementById('clearBtn').addEventListener('click', eraseAll, false);
  document.getElementById('colorBtn').addEventListener('change', changeColor, false);
  document.getElementById('eraserBtn').addEventListener('click', setMode, false);
  document.getElementById('drawBtn').addEventListener('click', setMode, false);
}
function mouseDownOnCanvas(e) {
  clearEvent();
  // 左クリックだった場合、mousemoveイベントにpenModeに応じたイベントを関連付ける
  if (e.button == 0 && Pen.penMode === 'draw') {
    canvas.addEventListener('mousemove', drawSigniture, false);
  } else if (e.button == 0 && Pen.penMode === 'erase') {
    canvas.addEventListener('mousemove', eraseSigniture, false);
  }
}
function clearEvent() {
  // mousemoveイベントから描画処理の関連を解除する
  canvas.removeEventListener('mousemove', drawSigniture, false);
  canvas.removeEventListener('mousemove', eraseSigniture, false);
  Pen.context.beginPath();
}
function eraseAll() {
  Pen.eraseAll();
}
// イベント登録のヘルパ関数終了

// Penオブジェクトを操作するコア関数
function setMode(e) {
  if (e.target.id === 'drawBtn') Pen.penMode = 'draw';
  if (e.target.id === 'eraserBtn') Pen.penMode = 'erase';
}
function drawSigniture(e) {
  var coordinate = getEeventOccurredCoordinate(e);
  Pen.draw(coordinate.x, coordinate.y);
}
function changeColor(e) {
  Pen.changeColor(e.target.value);
}
function eraseSigniture(e) {
  var coordinate = getEeventOccurredCoordinate(e);
  Pen.erase(coordinate.x, coordinate.y);
}
//Penオブジェクトを操作するコア関数終了

// イベントの位置情報取得用のヘルパ関数
function getEeventOccurredCoordinate(eveObj) {
  var rect = eveObj.target.getBoundingClientRect();
  var x = eveObj.clientX - rect.left;
  var y = eveObj.clientY - rect.top;
  return {
    x: x,
    y: y
  };
}
// loadイベント発生時のコールバック
window.addEventListener('load', initCanvas, false);