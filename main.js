const timerDisplay = document.querySelector("#timer");
const pomo = document.querySelector("#pomo-num");
const pomoTotal = document.querySelector('#pomo-num-total')
const etiqueta = document.querySelector('#etiqueta')
import tmi from 'tmi.js'

document.addEventListener('click', function () {
  audioAviso();
  document.removeEventListener('click', arguments.callee);
});


// Variables necesarias
var timer = 1 * 60;
var pomoCount = 0;
var pomodoroTotal = 3;
var interval;
var minutos;
var segundos;
var savedTimer = 0;
var autoTimer = true
// Función para iniciar la cuenta regresiva
function startTimer() {
  interval = setInterval(function () {
    minutos = parseInt(timer / 60, 10);
    segundos = parseInt(timer % 60, 10);
    pomoTotal.innerHTML = pomodoroTotal


    console.log(autoTimer)
    minutos = minutos < 10 ? "0" + minutos : minutos;
    segundos = segundos < 10 ? "0" + segundos : segundos;
    1
    timerDisplay.innerHTML = minutos + ":" + segundos;

    if (--timer < 0) {
      if (pomoCount % 3 === 0) {
        timer = 1 * 60; // Pomodoro de 1 minuto de trabajo
        etiqueta.innerHTML = 'DESCANSO 🍙🥤';

      } else if (pomoCount % 3 === 1) {
        timer = 2 * 60; // Pomodoro de 2 minutos de descanso
        if (!autoTimer) {
          stopTimer()
        }
        etiqueta.innerHTML = 'PRODUCTIVO 📚📖';

      } else {
        timer = 1 * 60; // Pomodoro de 1 minuto de trabajo
        if (!autoTimer) {
          stopTimer()
        }
        etiqueta.innerHTML = 'DESCANSO 🍙🥤';

      }


      if (pomoCount % 3 === 2) { // Se completa 1 pomo después del segundo descanso
        pomoCount++;

        pomo.innerHTML = Math.ceil(pomoCount / 3);
      }

      if (pomoCount === pomodoroTotal * 3) {
        clearInterval(interval);
        console.log(`Se completaron ${pomodoroTotal} pomodoros`);
        etiqueta.innerHTML = '🚨FINAL DE STREAM 🚨';

        return;
      }
      audioAviso()
      pomoCount++;
    }

  }, 10);
}

function audioAviso() {
  const audio = new Audio();
  audio.src = './campana.mp3';
  audio.play()
}

// Función para detener el timer
function stopTimer() {
  savedTimer = timer;
  clearInterval(interval);
}

// Función para reiniciar el timer
function restartTimer() {
  stopTimer();
  timer = savedTimer;
  startTimer();
}

function restartBreak() {
  stopTimer();
  timer = 10 * 60;
  etiqueta.innerHTML = 'DESCANSO'
  startTimer();
}

function restartPomo() {
  stopTimer();
  timer = 60 * 60;
  etiqueta.innerHTML = 'PRODUCTIVO'
  startTimer();
}

function timerAuto() {
  if (!autoTimer) return autoTimer = true
  if (autoTimer) return autoTimer = false
}
function pomoi(num) {
  pomoCount = num * 2 - 1; // El número ingresado es el número de pomos completados, no el número de descansos
  pomo.innerHTML = Math.ceil(pomoCount / 2);
}

function pomot(num) {
  pomodoroTotal = num;
  pomoTotal.innerHTML = pomodoroTotal;
}

// Conectar a Twitch a través de tmi.js
const client = new tmi.Client({
  channels: ['brunispet']
});

client.connect();

// Escuchar comandos en Twitch
client.on("chat", function (channel, userstate, message, self) {
  if (!message.startsWith('!')) return;
  const args = message.slice(1).split(' ');
  const command = args.shift().toLowerCase();
  const username = userstate.username;
  const mod = userstate?.mod
  const num = parseInt(args)
  console.log(command)
  console.log(num)
  if (username === 'cuartodechenz' || mod) {

    switch (command) {
      case "start":
        startTimer();
        break;
      case "pause":
        stopTimer();
        break;
      case "restart":
        restartTimer();
        break;
      case "auto":
        timerAuto();
        break;
      case "timebreak":
        restartBreak()
        break;
      case "pomotime":
        restartPomo()
        break;
      case "pomoi":
        pomoi(num)
        break;
      case "pomot":
        pomot(num)
        break;
      default:
        console.log('No es un comando valido')
    }

  }
});







