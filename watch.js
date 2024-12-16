const timer = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');

let intervalId = null;
let milliseconds = 0;
let seconds = 0;
let minutes = 0;

// Add sound files
const buttonBeep = new Audio('button.mp3'); // Beep sound for button press
const minuteBeep = new Audio('reset.mp3'); // Beep sound for every minute

function playSound(sound) {
    sound.currentTime = 0; // Reset sound playback
    sound.play();
}

function startTimer() {
    if (intervalId !== null) return; // Prevent multiple intervals

    playSound(buttonBeep); // Play button sound

    intervalId = setInterval(() => {
        milliseconds++;
        if (milliseconds === 100) {
            milliseconds = 0;
            seconds++;
        }
        if (seconds === 60) {
            seconds = 0;
            minutes++;
            playSound(minuteBeep); // Play minute beep
        }

        const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
        timer.textContent = formattedTime;
    }, 10);
}

function stopTimer() {
    playSound(buttonBeep); // Play button sound
    clearInterval(intervalId);
    intervalId = null;
}

function resetTimer() {
    playSound(buttonBeep); // Play button sound
    clearInterval(intervalId);
    intervalId = null;
    milliseconds = 0;
    seconds = 0;
    minutes = 0;
    timer.textContent = '00:00:00';
}

// Attach event listeners
startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);
