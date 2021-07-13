var guess = 2;
var tries = 1;
var delta = 1;
var growing = true;

function update() {
    document.getElementById("guess").innerHTML = "i think the number is "+guess.toString();
    div.insertBefore(document.createTextNode("guess "+tries+": "+guess), parent.lastChild);
    div.appendChild(document.createElement("br"));
}

bigger.addEventListener("click", function() {
    tries++;
    delta = Math.max(delta * (growing * 1.5 + 0.5), 1);
    guess = guess + delta;
    update(guess);
});

smaller.addEventListener("click", function() {
    tries++
    growing = false;
    delta = Math.max(delta * (growing * 1.5 + 0.5), 1);
    guess = guess - delta;
    update(guess);
});

update();