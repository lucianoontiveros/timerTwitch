
## INTRODUCCIÓN

El timer del [Cuarto de Chenz](https://www.twitch.tv/cuartodechenz "Cuarto de Chenz") está hecho con muy poco conocimiento de programación. Se necesita una  base sólida si se desea  crear grandes cosas; sin embargo, por pequeño que sea, es un gran paso para mí. Llevo de manera autodidacta estudiando programación  y para ser sincero, es un tiempo acotado para dominar varias tecnologías. Pero dicen que la necesidad es un empuje, y ahora me encuentro haciendo directos de Study With me y necesitaba un timer, una cuenta regresiva que me permitiera marcar los pomodoros de estudio. Mi idea siempre fue poder brindarle instrucciones desde el chat de Twitch. Por lo cual de manera precaria termine por crear este componente que dejo a su disposición para que utilicen y si lo desean, mejorarlo.



[![imagen-1.png](https://i.postimg.cc/xjX3y7mW/imagen-1.png)](https://postimg.cc/NLwXQdp4)

## CONTRIBUCIONES

Para crear este timer necesitaba saber algún framework o librería como React, para poder utilizar tmi.js así vincularme con el chat de twitch, pero en ese momento estaba muy lejos de poder hacerlo ya que apenas podía dominar JavaScript en un nivel junior. Sin embargo, me encontré con un chico que tiene un canal en inglés que me enseño a través de un video como utilizar un archivo tmi.js que directamente te permite conectar tu codigo con el dom y al chat con solo abrir el index html, sin mayores complicaciones. El creador de contenidos tiene este canal [Code Garden](https://www.youtube.com/channel/UCIAW44-a_W8dGAhZDar7OmA "Code Garden") el cual expone muchos proyectos de fácil ejecución. Vale la pena cuando estás buscando innovar y encontrar tu lado creativo. Todo lo demás lo aprendí de canales como  [Bluuweb](https://bluuweb.github.io/ "Bluuweb") y [Manz](https://manz.dev/ "Manz") que me ayudaron a ordenar mi codigo e implementar cosas que eran nuevas para mi.

## COMPORTAMIENTO
El timer se ejecuta con un tiempo de iniciación. Es una funcionalidad característica de cualquier directo, empleado  al comienzo de la emisión para esperar al público de Twitch. Por defecto es de 5 minutos y al terminar itera otra cuenta regresiva de 10 minutos que se emplean como espacio para interactuar con las personas del chat. Terminado estos tiempos se empieza el momento productivo que tiene una duración de 60 minutos. Sin embargo, cada persona puede configurarlo con el tiempo que crea conveniente desde el código fuente.

## CONFIGURACIÓN
De acuerdo a los tiempos que desee determinar deberá ingresar al archivo main.js y cambiar los tiempos que crea convenientes:
    var timer = 5 * 60; // El pomo de inicio de 5 minutos, ajustar según lo que se necesite.

     if (--timer < 0) {
          if (pomoCount % 3 === 0) {
            timer = 10 * 60; // Pomodoro de 10 minuto de descanso, ajustar según lo que crean necesario.
            etiqueta.innerHTML = 'DESCANSO 🍙🥤';

          } else if (pomoCount % 3 === 1) {
            timer = 60 * 60; // Pomodoro de 60 minutos de trabajo, ajustar según lo que crean necesario.
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

Finalmente, hay que ingresar el nombre del canal donde queremos controlar el timer a través del chat.

    const client = new tmi.Client({
      channels: ['cuartodechenz'] //aqui cambiamos el nombre del canal
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
      if (username === 'cuartodechenz' || mod) { //aqui cambiamos el nombre del canal
[![imagen-2.png](https://i.postimg.cc/QNvk6bkV/imagen-2.png)](https://postimg.cc/c6MnCfzN)

**Los pomos se comenzarán a contar a partir que el timer ya hubiera recorrido el tiempo de iniciación, el break de inicio y el primer pomodoro**. Cumplida esas condiciones por cada pomo productivo comenzará a imputarlo en el marcador. En pantalla se exponen los numeros de los pomo que pasaron y la cantidad de pomos totales.

**¿Hay alguna forma que el timer no se ejecute automaticamente y haga una parada entre el break y el momento productivo?**

Sí, configuré un modo auto, el cual se activa o se desactiva con el comando **!auto** en el chat.

## COMANDOS
Los comandos para ejecutar el codigo son los siguientes:

**- !start:** Permite que se inicie el timer y que apartir de allí este se ejecute automaticamente. Salvo que antes o durante el transcurso del tiempo ejecutes en el chat !auto. Esto hará que se desactive el modo automatico y comience a hacer parada en cada instancia al terminar la cuenta regresiva (break, productivo)

**- !min + tiempo de ejecución:** Cuando necesitamos agregar más tiempo o modificar los minutos del timer, podemos usar el comando !min + más el tiempo que queremos resetearlo. Por ejemplo, si deseo que el timer corra ahora 25 minutos, ingreso en el chat !min 25. Tener en cuenta con este ejemplo que no suma 25, sino que inicia en 25. Es posible que por un error  solamente escribas y envies !min sin mencionar los minutos a resetar, que ocasionará un error NaN en pantalla. Se soluciona ingresando correctamente el comando con los minutos correspondientes.

**- !pomoi:** permite marcar un pomo pasado por si hubiera algún inconveniente con el timer.

**- !pomot:** permite ingresar la cantidad de pomos totalas que se deseen.

**- !auto:**Pasara del modo automatico a hacer paradas por cada instancia, descansos y momentos productivos.

**- !pause:**Esto pausará el tiempo, y simplemente con ingresar !start iniciará sin problemas desde donde lo dejaste, ejecutando la secuencia en la que se encontraba.


[![imagen-3.png](https://i.postimg.cc/rwkGTwHk/imagen-3.png)](https://postimg.cc/dL5ZmwvH)

### **IMPORTANTE**
Al vincular con obs, navegador, ubicación local, seleccionar el archivo index.html, no ingresar la opción reiniciar y apagar fuente cuando no sea visible, como tampoco actualizar la escena cuando se active.
