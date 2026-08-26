
const pixelcat = document.getElementById('pixelcat');

let catX = window.innerWidth - 120;
let catY = window.innerHeight - 150;
let mouseX = catX;
let mouseY = catY;

pixelcat.style.left = catX + 'px';
pixelcat.style.top = catY + 'px';

document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

setInterval(() => {
    catX += (mouseX - catX - 45) * 0.12;
    catY += (mouseY - catY - 45) * 0.12;
    pixelcat.style.left = catX + 'px';
    pixelcat.style.top = catY + 'px';
}, 16);

function setCatMood(mood) {
    const moods = {
        sleep: 'assets/imgs/catsleep.gif',
        excited: 'assets/imgs/catexcited.gif',
        blink: 'assets/imgs/catblink.gif',
    };
    pixelcat.src = moods[mood] ?? moods.blink;
}


const landingPage = document.getElementById('landingPage');
const roomPage = document.getElementById('roomPage');