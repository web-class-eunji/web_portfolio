let fade = document.querySelectorAll(".fade-slides");
let currentFade = 0;
let fadeInterval = setInterval(nextFade, 2000);

function nextFade() {
    fade[currentFade].className = " fade";
    currentFade = (currentFade + 1) % fade.length;
    console.log(fade.length);
    console.log(currentFade)
    fade[currentFade].className = " slide showing";
}