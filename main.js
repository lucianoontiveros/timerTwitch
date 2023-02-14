const timerDisplay = document.querySelector("#timer");
const pomo = document.querySelector("#pomo-num");
const pomoTotal = document.querySelector('#pomo-num-total')
const etiqueta = document.querySelector('#etiqueta')
import tmi from 'tmi.js'
var sound = new Audio("music.mp3");


// Variables necesarias
var timer = 60 * 60;
var pomoCount = 0;
var pomodoroTotal = 14;
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
      etiqueta.innerHTML = 'PRODUCTIVO'
      if (pomoCount === pomodoroTotal) {
        clearInterval(interval);
        console.log("Se completaron los 12 pomos");
        sound.play()
        return;
      }

      // Iniciar cuenta regresiva de 10 minutos
      timer = 10 * 60;
      pomoCount++;
      etiqueta.innerHTML = 'DESCANSO'
      pomo.innerHTML = pomoCount
    }
  }, 1000);
}

// Función para detener el timer
function stopTimer() {
  savedTimer = timer;
  clearInterval(interval);
  etiqueta.innerHTML = 'EN PAUSA'
  sound.play()
}

// Función para reiniciar el timer
function restartTimer() {
  stopTimer();
  timer = savedTimer;
  pomoCount = 0;
  etiqueta.innerHTML = '💻'
  startTimer();
  sound.play()
}

function restartBreak() {
  stopTimer();
  timer = 10 * 60;
  pomoCount = 0;
  etiqueta.innerHTML = 'DESCANSO'
  startTimer();
  sound.play()
}

function restartPomo() {
  stopTimer();
  timer = 60 * 60;
  pomoCount = 0;
  etiqueta.innerHTML = 'PRODUCTIVO'
  startTimer();
  sound.play()
}


function pomoi(num) {
  pomoCount = num
  pomo.innerHTML = pomoCount
}

function pomot(num) {
  pomodoroTotal = num;
  pomoTotal.innerHTML = pomodoroTotal

}



// Conectar a Twitch a través de tmi.js
const client = new tmi.Client({
  channels: ['cuartodechenz']
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

startTimer()






