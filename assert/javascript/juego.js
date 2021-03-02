"use strict";

let nombreUsuario, botonPedir, botonNuevo, botonPlantarse, dineroUsuario, apuestaUsuario;
let baraja = [];
let palos = ["C", "D", "T", "P"];
let puntuacionJugador = 0;
let puntuacionBanca = 0;
let dinero, apuesta, dineroIngresado, ganancia;


window.addEventListener("load", () => {
  inicializar();
  iniciarBaraja();
  let usuario = prompt("Como te llamas");
  dinero = prompt("¿Con cuántas fichas quiere empezar?");
        while (isNaN(dinero) || dinero === '' || parseInt(dinero)<100){
            dinero = parseInt(prompt("Lo sentimos, entrada mínima de 100$.¿Con cuánto quiere empezar?"));  
        }

  apuesta = prompt("¿Cuanto quiere apostar?");
        while (isNaN(apuesta) || apuesta === '' || parseInt(apuesta) < 5 || parseInt(apuesta) > parseInt(dinero)){
          apuesta = parseInt(prompt("Lo sentimos, la apuesta debe ser entre 5$ y sus fichas disponibles. ¿Cuánto quiere apostar?"));  
        }

  nombreUsuario.innerHTML = usuario + nombreUsuario.innerHTML;
  dineroUsuario.innerHTML = dinero + dineroUsuario.innerHTML; 
  apuestaUsuario.innerHTML = apuesta + apuestaUsuario.innerHTML; 
        


  //BOTÓN PLANTARSE
  botonPlantarse.addEventListener("click", () => {
    botonPedir.disabled = true;
    botonPlantarse.disabled = true;
    iniciarBaraja();
    turnoBanca();
  });


  //BOTÓN JUGAR DE NUEVO
  botonNuevo.addEventListener("click", () => {
    iniciarBaraja();
    
    if(dinero < 5){
      dineroIngresado = prompt("Saldo insuficiente. Para continuar debe ingresar más fichas.");
      while (isNaN(dineroIngresado) || dineroIngresado === '' || parseInt(dineroIngresado)<100){
        dineroIngresado = parseInt(prompt("Lo sentimos, entrada mínima de 100$.¿Cuántas fichas quiere ingresar?"));
        document.querySelector("#dinero_jugador").innerHTML = dinero;          
      }

      document.querySelector("#dinero_jugador").innerHTML = dinero;
      dinero = dinero + parseInt(dineroIngresado);
      document.querySelector("#dinero_jugador").innerHTML = dinero;

      apuesta = prompt("¿Cuanto quiere apostar?");
        while (isNaN(apuesta) || apuesta === '' || parseInt(apuesta) < 5 || parseInt(apuesta) > parseInt(dinero)){
          apuesta = parseInt(prompt("Lo sentimos, la apuesta debe ser entre 5$ y sus fichas disponibles. ¿Cuánto quiere apostar?"));  
        }
      }else{
      apuesta = prompt("¿Cuanto quiere apostar?");
          while (isNaN(apuesta) || apuesta === '' || parseInt(apuesta) < 5 || parseInt(apuesta) > parseInt(dinero)){
            apuesta = parseInt(prompt("Lo sentimos, la apuesta debe ser entre 5$ y sus fichas disponibles. ¿Cuánto quiere apostar?"));  
          } 
          document.querySelector("#dinero_jugador").innerHTML = dinero;
      }

          document.querySelector("#dinero_jugador").innerHTML = dinero;
          document.querySelector("#dinero_jugador").innerHTML = dinero;
          document.querySelector("#cartas_jugador").innerHTML = "";
          document.querySelector("#cartas_banca").innerHTML = "";
          document.querySelector("#puntuacion_jugador").innerHTML = 0;
          document.querySelector("#puntuacion_banca").innerHTML = 0;
          document.querySelector("#apuesta_jugador").innerHTML = apuesta;
          puntuacionJugador = 0;
          botonPedir.disabled = false;
          botonPlantarse.disabled = false; 
  });

  //BOTÓN PEDIR
  botonPedir.addEventListener("click", () => {
    //console.log(pedirCarta());
    //console.log({ baraja });
    let cartaPedida = pedirCarta();
    ponerCarta(cartaPedida, "jugador");
    ponerPuntuacion(calcularValor(cartaPedida), "jugador");
    botonNuevo.disabled = true;
  });
});




function inicializar() {
  nombreUsuario = document.querySelector("#nombre_jugador");
  dineroUsuario = document.querySelector("#dinero_jugador");
  apuestaUsuario = document.querySelector("#apuesta_jugador");
  botonPedir = document.querySelector("#boton_pedir");
  botonNuevo = document.querySelector("#boton_nuevo");
  botonPlantarse = document.querySelector("#boton_plantarse");
}




function iniciarBaraja() {
  let carta;
  for (let index = 0; index < palos.length; index++) {
    for (let indexN = 1; indexN < 14; indexN++) {
      //const element = array[index];
      if (indexN === 11) {
        carta = `J${palos[index]}`;
      } else if (indexN === 12) {
        carta = `Q${palos[index]}`;
      } else if (indexN === 13) {
        carta = `K${palos[index]}`;
      } else {
        carta = `${indexN}${palos[index]}`;
      }
      baraja.push(carta);
    }
  }
  baraja = _.shuffle(baraja);
  console.log(baraja);
}


function pedirCarta() {
  let carta = baraja.shift();
  return carta;
}


function ponerCarta(carta, turno) {
  let nodoImagen = document.createElement("img");
  nodoImagen.src = `./assert/images/${carta}.png`;
  nodoImagen.className = "carta";

  if (turno === "jugador") {
    document.querySelector("#cartas_jugador").append(nodoImagen);
  } else if (turno == "banca") {
    document.querySelector("#cartas_banca").append(nodoImagen);
  }
}


function calcularValor(carta) {
  let valor = Number(carta.toString().substring(0, carta.length - 1));
  if (isNaN(valor)) {
    valor = 10;
  }
  return valor;
}



function ponerPuntuacion(puntuacion, turno) {
  console.log(`${turno}`);

  if (turno === "jugador") {
    console.log("jugador");
    puntuacionJugador += puntuacion;
    document.querySelector("#puntuacion_jugador").innerHTML = puntuacionJugador;
    // puedo continuar cuando tengo < 21
    // cuando tengo 21 juega la banca
    setTimeout(() => {
      if (puntuacionJugador > 21) {
        alert("Has perdido.");
        botonPedir.disabled = true;
        botonPlantarse.disabled = true;
        dinero = dinero - apuesta;
        document.querySelector("#dinero_jugador").innerHTML = dinero;
        botonNuevo.disabled = false;
      } else if (puntuacionJugador == 21) {
        botonPedir.disabled = true;
        botonPlantarse.disabled = true;
        dinero = parseInt(dinero) + parseInt(apuesta)*2;
        document.querySelector("#dinero_jugador").innerHTML = dinero;
        botonNuevo.disabled = false;
        ganancia = parseInt(apuesta)*2;
        alert("Has ganado " + ganancia + "$ !!");
      }
    }, 100);
  } else if (turno === "banca") {
    puntuacionBanca += puntuacion;
    document.querySelector("#puntuacion_banca").innerHTML = puntuacionBanca;
  }}


    // puedo continuar cuando tengo < 21
    // cuando tengo 21 juega la banca
    function trasPlantarse(){
    setTimeout(() => {
      if (puntuacionBanca > 21) {  
        botonPedir.disabled = true;
        botonPlantarse.disabled = true;
        dinero = parseInt(dinero) + parseInt(apuesta)*2;
        document.querySelector("#dinero_jugador").innerHTML = dinero;
        puntuacionBanca = 0;
        botonNuevo.disabled = false;
        ganancia = parseInt(apuesta)*2;
        alert("Has ganado " + ganancia + "$ !!");

      }else if (puntuacionBanca == 21 && puntuacionJugador == 21) {
        alert("Has empatado.");
        botonPedir.disabled = true;
        botonPlantarse.disabled = true;
        document.querySelector("#dinero_jugador").innerHTML = dinero;
        puntuacionBanca = 0;
        botonNuevo.disabled = false;
      }else if (puntuacionBanca === 21){
        alert("Has perdido.");
        botonPedir.disabled = true;
        botonPlantarse.disabled = true;
        dinero = parseInt(dinero) - parseInt(apuesta);
        document.querySelector("#dinero_jugador").innerHTML = dinero;
        puntuacionBanca = 0;
        botonNuevo.disabled = false;
      }else if (puntuacionBanca >= 16 && puntuacionBanca < 21) {
        if (puntuacionBanca > puntuacionJugador) {
          alert("Has perdido.");
          botonPedir.disabled = true;
          botonPlantarse.disabled = true;
          dinero = parseInt(dinero) - parseInt(apuesta);
          document.querySelector("#dinero_jugador").innerHTML = dinero;
          puntuacionBanca = 0;
          botonNuevo.disabled = false;
        }else if (puntuacionJugador > puntuacionBanca) {
          botonPedir.disabled = true;
          botonPlantarse.disabled = true;
          dinero = parseInt(dinero) + parseInt(apuesta)*2;
          document.querySelector("#dinero_jugador").innerHTML = dinero;
          puntuacionBanca = 0;
          botonNuevo.disabled = false;
          ganancia = parseInt(apuesta)*2;
          alert("Has ganado " + ganancia + "$ !!");
        }else {
          alert("Has empatado.");
          botonPedir.disabled = true;
          botonPlantarse.disabled = true;
          document.querySelector("#dinero_jugador").innerHTML = dinero;
          puntuacionBanca = 0;
          botonNuevo.disabled = false;
        }
      }
    }, 300);
  }




//JUEGO DE LA BANCA
function turnoBanca() {
  //Pide carta siempre que su puntuación sea menor de 16
  while (puntuacionBanca <= 16) {  
    let cartaPedida = pedirCarta();
    ponerCarta(cartaPedida, "banca");
    ponerPuntuacion(calcularValor(cartaPedida), "banca");  
  }
  trasPlantarse();
}


