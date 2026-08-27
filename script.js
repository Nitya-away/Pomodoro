
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

const timerDisplay = document.getElementById('timer');

let selectedMinutes = 30;
let time = selectedMinutes * 60;
let timerInterval = null;

function updateTimer() {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function setMode(minutes) {
    selectedMinutes = minutes;
    resetTimer();
}

function startTimer() {
    setCatMood('excited');
    if (timerInterval !== null) return;

    timerInterval = setInterval(() => {
        if (time > 0) {
            time--;
            updateTimer();
        } else {
            clearInterval(timerInterval);
            timerInterval = null;
            setCatMood('blink');
            showToast(selectedMinutes === 30 ? 'Focus Session Completed, Touch Some Grass' : 'Break Over, Get Back To Work!!');
            resetTimer();
        }
    }, 1000);
}

function pauseTimer() {
    setCatMood('sleep');
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    setCatMood('blink');
    time = selectedMinutes * 60;
    updateTimer();
}