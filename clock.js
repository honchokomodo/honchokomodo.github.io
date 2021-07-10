var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var top = 0;
var lose = false;
var width = myCanvas.width;
var height = myCanvas.height;
var centerX = width/2;
var centerY = height/2;
var radius = Math.min(width, height) / 3;
var rot = 0
var two_pi = 2 * Math.PI;
var goal = Math.random() * two_pi;
var press = false;
var alrpress = false;
var score = 0;

function drawArc(x, y, r1, r2, radius, width, color) {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.arc(x, y, radius, r1, r2);
  ctx.stroke();
}

function drawLine(x1, y1, x2, y2, width, color) {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function ui_mouseup(MyEvent) {if (MyEvent.which == 1) {press = false;}}
function ui_mousedown(MyEvent) {if (MyEvent.which == 1) {press = true;}}

function drawFrame() {
  if (lose) {
    if (press && !alrpress) {
      score = 0;
      lose = false;
    }
    alrpress = press;
    return;
  }
  
  rot = (rot + 0.01 * Math.pow(1.05, score) * (score%2*2-1)) % two_pi;
  vecX = Math.cos(rot);
  vecY = Math.sin(rot);
  
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
  drawArc(centerX, centerY, 0, two_pi, radius, 2, "#FFF");
  drawArc(centerX, centerY, goal-0.1, goal+0.1, radius*1.15, 2, "#0F0");
  drawLine(centerX+radius*1.05*vecX, centerY+radius*1.05*vecY, centerX+radius*1.25*vecX, centerY+radius*1.25*vecY, 2, "#FFF");
  ctx.fillStyle = "#FFF";
  ctx.fillText("score: "+score, 10, 20);
  ctx.fillText("top: "+top, 10, 30);
  
  if (press && !alrpress) {
    goalX = Math.cos(goal);
    goalY = Math.sin(goal);
    if (Math.pow(vecX-goalX, 2)+Math.pow(vecY-goalY, 2) > 0.0169) {
      lose = true;
      alrpress = true;
      return;
    }
    score++;
    goal = Math.random() * two_pi;
    if (top < score) {
      top = score;
    }
  }
  alrpress = press;
}

setInterval(drawFrame, 1000/60);
myCanvas.addEventListener("mouseup", ui_mouseup);
myCanvas.addEventListener("mousedown", ui_mousedown);
