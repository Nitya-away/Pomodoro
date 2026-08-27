
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


const toastEl = document.getElementById('toast');
let toastTimer = null;

function showToast(message) {
    toastEl.textContent = message;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 3000);
}

const landingPage = document.getElementById('landingPage');
const roomPage = document.getElementById('roomPage');

function enterRoom(section) {
    landingPage.classList.add('hidden');
    roomPage.classList.remove('hidden');
    if (section) {
        setTimeout(() => scrollToSection(section), 50);
    }
}

function scrollToSection(sectionId) {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start'});
}

function getHome() {
    pauseTimer();
    roomPage.classList.add('hidden');
    landingPage.classList.remove('hidden');
}

function changeTheme() {
    const theme = document.getElementById('themeSelect').value;
    document.body.className = theme;
    localStorage.setItem('cozyTheme', theme);
}

function loadTheme() {
    const saved = localStorage.getItem('cozyTheme');
    if (!saved) return;
    document.body.className = saved;
    document.getElementById('themeSelect').value = saved;
}