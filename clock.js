var ctx = document.getElementById("myCanvas").getContext("2d");
var lose = false;
var rot = 0
var two_pi = 2 * Math.PI;
var goal = Math.random() * two_pi;
var score = 0;
var tops = 0;

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

function ui_mousedown(MyEvent) {
  if (MyEvent.which == 1) {
    if (lose) {
      score = 0;
      lose = false;
      return;
    }
    
    var handX = Math.cos(rot);
    var handY = Math.sin(rot);
    var goalX = Math.cos(goal);
    var goalY = Math.sin(goal);
    if (Math.pow(handX-goalX, 2)+Math.pow(handY-goalY, 2) > 0.0169) {
      lose = true;
      return;
    }
    score++;
    goal = Math.random() * two_pi;
    tops = Math.max(tops, score);
  }
}

function drawFrame() {
  if (lose) {
    return;
  }
  
  var width = myCanvas.width;
  var height = myCanvas.height;
  var centerX = width/2;
  var centerY = height/2;
  var radius = Math.min(width, height) / 3;
  var vecX = Math.cos(rot);
  var vecY = Math.sin(rot);
  rot = (rot + 0.01 * Math.pow(1.05, score) * (score%2*2-1)) % two_pi;
  
  ctx.clearRect(0, 0, width, height);
  drawArc(centerX, centerY, 0, two_pi, radius, 2, "#FFF");
  drawArc(centerX, centerY, goal-0.1, goal+0.1, radius*1.15, 2, "#0F0");
  drawLine(centerX+radius*1.05*vecX, centerY+radius*1.05*vecY, centerX+radius*1.25*vecX, centerY+radius*1.25*vecY, 2, "#FFF");
  ctx.fillStyle = "#FFF";
  ctx.font = "18px consolas"
  ctx.fillText("score: "+score, 10, 20);
  ctx.fillText("session high score: "+tops, 10, 38);
}

setInterval(drawFrame, 1000/60);
myCanvas.addEventListener("pointerdown", ui_mousedown);