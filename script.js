let startTime;
let updatedTime;
let difference = 0;
let timerInterval;
let running = false;
let laps = [];

const timeDisplay = document.getElementById('time');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');
const timerContainer = document.getElementById('timerContainer');

function startTimer() {
    startTime = new Date().getTime() - difference;
    timerInterval = setInterval(updateTimer, 1000);
    startPauseBtn.textContent = 'Pause';
    running = true;
    timerContainer.style.backgroundColor = '#76c7c0'; // Change color when running
}

function pauseTimer() {
    clearInterval(timerInterval);
    startPauseBtn.textContent = 'Start';
    running = false;
    timerContainer.style.backgroundColor = '#fff'; // Revert color when paused
}

function resetTimer() {
    clearInterval(timerInterval);
    difference = 0;
    timeDisplay.textContent = '00:00:00';
    startPauseBtn.textContent = 'Start';
    running = false;
    laps = [];
    updateLaps();
    timerContainer.style.backgroundColor = '#fff'; // Revert color when reset
}

function updateTimer() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    timeDisplay.textContent = formatTime(difference);
}

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return (
        (hours > 9 ? hours : '0' + hours) + ':' +
        (minutes > 9 ? minutes : '0' + minutes) + ':' +
        (seconds > 9 ? seconds : '0' + seconds)
    );
}

function addLap() {
    if (running) {
        laps.push(formatTime(difference));
        updateLaps();
    }
}

function updateLaps() {
    lapsList.innerHTML = '';
    laps.forEach((lap, index) => {
        const li = document.createElement('li');
        li.textContent = `Lap ${index + 1}: ${lap}`;
        lapsList.appendChild(li);
    });
}

startPauseBtn.addEventListener('click', () => {
    if (running) {
        pauseTimer();
    } else {
        startTimer();
    }
});

resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', addLap);
