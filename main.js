const timerDisplay = document.querySelector("#timer");
const pomo = document.querySelector("#pomo-num");
const etiqueta = document.querySelector('#etiqueta')
let timer = 1 * 60;
let pomodoros = 1;
const pomodoroTotal = 12;
let breakTime = false;


function startTimer() {
  var sound = new Audio("music.mp3");
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  timerDisplay.innerHTML = `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""
    }${seconds}`;
  timer--;
  if (timer < 0) {
    if (!breakTime) {
      pomodoros++;
      pomo.innerHTML = pomodoros;
      etiqueta.innerHTML = 'Break'
      sound.play();
      if (pomodoros === pomodoroTotal) {
        return;
      }
      setTimeout(() => {
        timer = 10 * 60;
        breakTime = true;
        startTimer();
        sound.play();
      }, 60 * 1000);
    } else {
      breakTime = false;
      timer = 60 * 60;
      etiqueta.innerHTML = 'Productivo'
      setTimeout(() => {
        sound.play();
        startTimer();
      }, 10 * 60 * 1000);
    }
  } else {
    setTimeout(startTimer, 1000);
  }

}

startTimer();








