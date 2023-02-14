const timerDisplay = document.querySelector("#timer");
const pomo = document.querySelector("#pomo-num");
const etiqueta = document.querySelector('#etiqueta')
import tmi from 'tmi.js'
var sound = new Audio("music.mp3");


// Variables necesarias
var timer = 60 * 60;
var pomoCount = 0;
const pomodoroTotal = 12;
var interval;
var minutos;
var segundos;
var savedTimer = 0;
// Función para iniciar la cuenta regresiva
function startTimer() {
  interval = setInterval(function () {
    minutos = parseInt(timer / 60, 10);
    segundos = parseInt(timer % 60, 10);

    minutos = minutos < 10 ? "0" + minutos : minutos;
    segundos = segundos < 10 ? "0" + segundos : segundos;

    timerDisplay.innerHTML = minutos + ":" + segundos;

    if (--timer < 0) {
      timer = 60 * 60;
      sound.play()

      if (pomoCount === pomodoroTotal) {
        clearInterval(interval);
        console.log("Se completaron los 12 pomos");
        sound.play()
        return;
      }

      // Iniciar cuenta regresiva de 10 minutos
      timer = 10 * 60;
      pomoCount++;
      pomo.innerHTML = pomoCount

    }
  }, 1000);
}

// Función para detener el timer
function stopTimer() {
  savedTimer = timer;
  clearInterval(interval);
  sound.play()
}

// Función para reiniciar el timer
function restartTimer() {
  stopTimer();
  timer = savedTimer;
  pomoCount = 0;
  startTimer();
  sound.play()
}

function restartBreak() {
  stopTimer();
  timer = 10 * 60;
  pomoCount = 0;
  startTimer();
  sound.play()
}



// Conectar a Twitch a través de tmi.js
const client = new tmi.Client({
  channels: ['brunispet']
});


client.connect();

// Escuchar comandos en Twitch
client.on("chat", function (channel, userstate, message, self) {
  const username = userstate.username;
  const mod = userstate?.mod
  if (username === 'cuartodechenz' || mod) {
    if (message === "!start") {
      startTimer();
    } else if (message === "!pause") {
      stopTimer();
    } else if (message === "!restart") {
      restartTimer();
    } else if (message === "!restartbreak") {
      restartBreak();
    }
  }
});

startTimer()






