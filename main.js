
let winAudio = new Audio("./sound/timer-cocina-.mp3")
const timers = [
    { displayId: "timerDisplay1", startButtonId: "buttonStart1", stopButtonId: "buttonStop1", duration: 1500 },
    { displayId: "timerDisplay2", startButtonId: "buttonStart2", stopButtonId: "buttonStop2", duration: 300 },
    { displayId: "timerDisplay3", startButtonId: "buttonStart3", stopButtonId: "buttonStop3", duration: 900 },
];

function setupTimer(timerData) {
    const { displayId, startButtonId, stopButtonId, duration } = timerData;
    const timerDisplay = document.getElementById(displayId);
    const startButton = document.getElementById(startButtonId);
    const stopButton = document.getElementById(stopButtonId);

    let intervalID;
    let timer = duration;
    let isRunning = false;

    function updateDisplay() {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
        const displayText = `${minutes}m ${seconds}s`;
        timerDisplay.innerText = displayText;
    }

    function timerCounter() {
        if (!isRunning) {
            isRunning = true;
            intervalID = setInterval(() => {
                if (timer > 0) {
                    timer--;
                    updateDisplay();
                } else {
                    stopTimer();
                    winAudio.play()
                }
            }, 1000);
            timerDisplay.classList.add("timer-running");
        }
    }

    function stopTimer() {
        if (isRunning) {
            isRunning = false;
            clearInterval(intervalID);
            updateDisplay();
            timerDisplay.classList.remove("timer-running");
        }
    }

    startButton.addEventListener("click", timerCounter);
    stopButton.addEventListener("click", stopTimer);

    updateDisplay();
}

timers.forEach(setupTimer);
