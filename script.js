
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

const quoteText = document.getElementById('quote');

const quotes = [
    'Small Progress is Still Progress',
    'You are worthy of love just for being who you ARE.',
    'You can do hard things.',
    'Believe in yourself and all that you are.',
    'Your Future Self Will Thank You.',
    'A calm mind brings inner strength.',
    'You are the sky — everything else is just the weather.',
    'The happiness of your life depends upon the quality of your thoughts.',
    'Did You Drink Water Today?'
]

function newQuote() {
    const i = Math.floor(Math.random() * quotes.length);
    quoteText.textContent = quotes[i];
}

setInterval(newQuote, 5000);


const audioPlayer = document.getElementById('audioPlayer');
const musicName = document.getElementById('musicName');
const minisong = document.getElementById('minisong');

audioPlayer.volume = 0.4;

const sounds = {
    lofi: {name: 'Lo-fi Focus', src: 'assets/music/lofi.mp3'},
    rain: {name: 'Rain', src: 'assets/music/rain.mp3'},
    cafe: {name: 'Cafe', src: 'assets/music/cafe.mp3'},
    fireplace: {name: 'FirePlace', src: 'assets/music/fireplace.mp3'},
};

function chooseSound(type) {
    audioPlayer.src = sounds[type].src;
    musicName.textContent = sounds[type].name;
    minisong.textContent = sounds[type].name;
}

function playMusic() {
    if (!audioPlayer.src || audioPlayer.src === window.location.href) {
        chooseSound('lofi');
    }
    audioPlayer.play().catch(() => showToast('Click Play To Start Again'));
}

function pauseMusic() {
    audioPlayer.pause();
}

