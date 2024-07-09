// HTML elements
const stopwatchDisplay = document.getElementById('stopwatch-display');
const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const lapButton = document.getElementById('lap-button');
const resetButton = document.getElementById('reset-button');
const lapsList = document.getElementById('laps-list');

// Stopwatch variables
let startTime = 0;
let currentTime = 0;
let lapTimes = [];
let lastLapTime = 0;
let isRunning = false;

// Start button event listener
startButton.addEventListener('click', () => {
  if (!isRunning) {
    startTime = new Date().getTime();
    currentTime = 0;
    lastLapTime = startTime;
    isRunning = true;
    startButton.disabled = true;
    stopButton.disabled = false;
    lapButton.disabled = false;
    resetButton.disabled = false;
    updateStopwatchDisplay();
  }
});

// Stop button event listener
stopButton.addEventListener('click', () => {
  if (isRunning) {
    currentTime = new Date().getTime() - startTime;
    isRunning = false;
    startButton.disabled = false;
    stopButton.disabled = true;
    lapButton.disabled = true;
    resetButton.disabled = false;
    updateStopwatchDisplay();
  }
});

// Lap button event listener
lapButton.addEventListener('click', () => {
  if (isRunning) {
    const lapTime = new Date().getTime() - lastLapTime;
    lapTimes.push(lapTime);
    lastLapTime = new Date().getTime();
    updateLapsList();
  }
});

// Reset button event listener
resetButton.addEventListener('click', () => {
  startTime = 0;
  currentTime = 0;
  lapTimes = [];
  lastLapTime = 0;
  isRunning = false;
  startButton.disabled = false;
  stopButton.disabled = true;
  lapButton.disabled = true;
  resetButton.disabled = true;
  updateStopwatchDisplay();
  updateLapsList();
});

// Update stopwatch display function
function updateStopwatchDisplay() {
  if (isRunning) {
    currentTime = new Date().getTime() - startTime;
  }
  const timeString = formatTime(currentTime);
  stopwatchDisplay.textContent = timeString;
  if (isRunning) {
    setTimeout(updateStopwatchDisplay, 10); // Update every 10ms for a smoother display
  }
}

// Format time function
function formatTime(time) {
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = time % 1000;
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 3)}`;
}

// Pad function
function pad(number, length = 2) {
  return String(number).padStart(length, '0');
}

// Update laps list function
function updateLapsList() {
  lapsList.innerHTML = '';
  lapTimes.forEach((lapTime, index) => {
    const lapTimeString = formatTime(lapTime);
    const lapListItem = document.createElement('li');
    lapListItem.textContent = `Lap ${index + 1}: ${lapTimeString}`;
    lapsList.appendChild(lapListItem);
  });
}

// Initialize the display