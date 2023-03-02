const timerDisplay = document.querySelector("#timer");
const pomo = document.querySelector("#pomo-num");
const pomoTotal = document.querySelector('#pomo-num-total')
const etiqueta = document.querySelector('#etiqueta')




// Función para iniciar la cuenta regresiva
var timer = 5 * 60; // El pomo de inicio de 5 minutos, ajustar según lo que se necesite.
var pomoCount = 0;
var pomodoroTotal = 5;
var interval;
var minutos;
var segundos;
var savedTimer = 0;
var autoTimer = true;
var iniciado = false;

// Función para iniciar la cuenta regresiva
function startTimer() {
  interval = setInterval(function () {
    minutos = parseInt(timer / 60, 10);
    segundos = parseInt(timer % 60, 10);
    pomoTotal.innerHTML = pomodoroTotal


    console.log(autoTimer)
    minutos = minutos < 10 ? "0" + minutos : minutos;
    segundos = segundos < 10 ? "0" + segundos : segundos;
    timerDisplay.innerHTML = minutos + ":" + segundos;

    if (--timer < 0) {
      if (pomoCount % 3 === 0) {
        timer = 10 * 60; // Pomodoro de 10 minuto de descanso, ajustar según lo que crean necesario.
        etiqueta.innerHTML = 'DESCANSO 🍙🥤';

      } else if (pomoCount % 3 === 1) {
        timer = 2 * 60; // Pomodoro de 60 minutos de trabajo, ajustar según lo que crean necesario.
        if (!autoTimer) {
          stopTimer()
        }
        etiqueta.innerHTML = 'PRODUCTIVO 📚📖';

      } else {
        timer = 10 * 60; // Pomodoro de 10 minutos de descanso, ajustar según lo que crean necesario.
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
        iniciado = false;
        audioAviso()
        return;
      }
      audioAviso()
      pomoCount++;
    }

  }, 100);
}


function audioAviso() {
  const audio = new Audio('campana.mp3');
  audio.play()
}

// Función para detener el timer
function stopTimer() {
  savedTimer = timer;
  iniciado = false;
  clearInterval(interval);
}


function timerAuto() {
  if (!autoTimer) return autoTimer = true
  if (autoTimer) return autoTimer = false
}


function pomot(num) {
  pomodoroTotal = num;
  pomoTotal.innerHTML = pomodoroTotal;
}

function minutosOn(num) {
  minutosChange = num + 0;
  timer = minutosChange * 60;
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
  if (username === 'cuartodechenz' || mod) {

    switch (command) {
      case "start":
        if (!iniciado) {
          iniciado = true;
          startTimer()
        } else {
          console.log('Ya hay un timer activo')
        }
        break;
      case "pause":
        stopTimer();
        break;
      case "auto":
        timerAuto();
        break;
      case "min":
        minutosOn(num)
        break;
      case "pomot":
        pomot(num)
        break;
      default:
        console.log('No es un comando valido')
    }

  }
});




