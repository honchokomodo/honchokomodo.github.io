var ctx = document.getElementById("clockCanvas").getContext("2d");
let lose = false;
let rot = 0
let tau = 2 * Math.PI;
let goal = Math.random()*tau;
let score = 0;
let tops = 0;
let pflag = false;

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

setInterval(() => {
  clockCanvas.width = window.innerWidth;
  clockCanvas.height = window.innerHeight;
  let width = clockCanvas.width;
  let height = clockCanvas.height;
  let cenX = width/2;
  let cenY = height/2;
  let radius = Math.min(width, height)/3;
  let vecX = Math.cos(rot);
  let vecY = Math.sin(rot);
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, width, height);
  drawArc(cenX, cenY, 0, tau, radius, 4, "#FFF");
  drawArc(cenX, cenY, goal-0.1, goal+0.1, radius*1.15, 4, "#0F0");
  drawLine(cenX+radius*1.05*vecX, cenY+radius*1.05*vecY, cenX+radius*1.25*vecX, cenY+radius*1.25*vecY, 4, "#FFF");
  ctx.fillStyle = "#FFF";
  ctx.font = "32px consolas"
  ctx.fillText("score: "+score, 10, 32);
  ctx.fillText("high score: "+tops, 10, 64);

  if (pflag) {
    pflag = false;
    if (lose) {
      score = 0;
      lose = false;
      return;
    }
    let handX = Math.cos(rot);
    let handY = Math.sin(rot);
    let goalX = Math.cos(goal);
    let goalY = Math.sin(goal);
    if (Math.pow(handX-goalX, 2)+Math.pow(handY-goalY, 2) > 0.0169) {
      lose = true;
      alert("you lost score: "+score);
      return;
    }
    score++;
    goal = Math.random() * tau;
    tops = Math.max(tops, score);
  }

  rot = (rot+0.01*Math.pow(1.05, score) * (score%2*2-1) * !lose) % tau;
}, 1000/60);

clockCanvas.addEventListener("pointerdown", () => {pflag = true});
clockCanvas.addEventListener("keydown", () => {pflag = true});
