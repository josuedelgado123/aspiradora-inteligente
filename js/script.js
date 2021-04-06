/*Para entender las posiciones "X" y "Y".
Consideramos "X" en vertical y "Y" en horizontal. [x][y] 
Donde "X" es el numero de la fila y "Y" el numero de la fila */

//creación de la tabla

var botonMatriz = document.getElementById("btnMatriz");
botonMatriz.addEventListener("click", crear);

//Mover la aspiradora

var botonMovimiento = document.getElementById("btnMovimiento");
botonMovimiento.disabled = true;
botonMovimiento.addEventListener("click", moverAspiradora);

//Limpieza rápida
var botonMovimientoAuto = document.getElementById("btnMovimientoAuto");
botonMovimientoAuto.disabled = true;
botonMovimientoAuto.addEventListener("click", moverAspiradoraAuto);

/*Funciones*/

var letras = []; //Crear un arreglo que almacene las letras generadas.
var n; //tendra el tamaño de la matriz
var matriz = []; //arreglo bidimensional que contiene las coordenadas x,y

function asignarNivelSuciedad() {
  //determina tamaño de matriz
  n = parseInt(getRandomArbitrary(4, 11), 10);
  for (var i = 0; i < n * n; i++) {
    //Esto va a devolver un número del 1-4.
    var num = parseInt(getRandomArbitrary(1, 5), 10);
    //1 = a 2 = b 3 = c 4 = d
    //agrega al arreglo el valor que recibe de la función, es decir el nivel de suciedad.
    letras.push(asignarLetra(num));
  }
}

function asignarLetra(num) {
  //de acuerdo al numero generado, asigna el nivel de suciedad
  var letra = "";
  switch (num) {
    case 1:
      letra = "a";
      break;
    case 2:
      letra = "b";
      break;
    case 3:
      letra = "c";
      break;
    default:
      letra = "d";
  }
  return letra;
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function crearMatriz() {
  var tabla = document.getElementsByTagName("table")[0];
  while (tabla.firstChild) {
    tabla.removeChild(tabla.firstChild);
  }
  var tableBody = document.createElement("tbody");
  tabla.classList.add("table");

  for (var i = 0; i < n; i++) {
    //crear la celda (fila)
    var celda = document.createElement("tr");
    celda.classList.add("celda");
    //agrego un arreglo al arreglo
    matriz.push([]);
    for (var x = 0; x < n; x++) {
      //crear las columnas
      var columnas = document.createElement("td");
      var suciedad = letras.shift();
      switch (suciedad) {
        case "a":
          columnas.classList.add("a");
          break;
        case "b":
          columnas.classList.add("b");
          break;
        case "c":
          columnas.classList.add("c");
          break;
        default:
          //solo setea el color a transparente para tener el valor de d almacenado
          columnas.classList.add("d");
      }
      columnas.appendChild(document.createTextNode(suciedad));
      celda.appendChild(columnas);
      //poner de hija de la fila
      columnas.classList.add("cuadros");
      matriz[i][x] = suciedad;
    }
    //poner la celda como hija del tbody
    tableBody.appendChild(celda);
  }
  tabla.appendChild(tableBody);
  setearEventListenerDeAsignacionDeInicio();
  botonMovimientoAuto.disabled = true;
  botonMovimiento.disabled = true;
}

function posicionarAgente(x, y) {
  var inicio = document.getElementsByTagName("tr")[x].childNodes[y];
  matriz[x][y] = "";
  inicio.textContent = "";
  inicio.classList.add("agente");
  posAspiradoraX = x;
  posAspiradoraY = y;
  console.log(inicio.offset);
}

function crear() {
  limpiarTabla();
  asignarNivelSuciedad();
  crearMatriz();
}

function limpiarTabla() {
  contadorDeClicks = 0;
  contadorPasos = 0;
  var listado = document.getElementById("lista");
  while (listado.firstChild) {
    listado.removeChild(listado.firstChild);
  }
  var pasosSpan = document.getElementById("cPasos");
  pasosSpan.textContent = "";
  matriz = [];
}

var letraPrioridad = ""; //nos sirve para almacenar la letra a comparar
var posAspiradoraX;
var posAspiradoraY;
var xFinal;
var yFinal;

function determinarLetra() {
  if (buscarLetra("a")) {
    letraPrioridad = "a";
    return true;
  }
  if (buscarLetra("b")) {
    letraPrioridad = "b";
    return true;
  }
  if (buscarLetra("c")) {
    letraPrioridad = "c";
    return true;
  }
  return false;
}

//metodo para detectar las letras. Es utilizado en la función determinarLetra. Ahí se le envia el parametro del nivel de suciedad
function buscarLetra(suciedad) {
  for (var i = 0; i < n; i++) {
    if (matriz[i].includes("" + suciedad)) {
      return true;
    }
  }
  return false;
}

//metodo para calcular la distancia

function calcularDistancia(x, y) {
  var distancia = Math.sqrt(
    Math.pow(posAspiradoraX - x, 2) + Math.pow(posAspiradoraY - y, 2)
  );
  return distancia;
}

//metodo para el texto, arreglar el tema de la xFinal y yFinal (problema de asignación)
var contadorPasos = 0;
function listarMovimientos() {
  var movSB = xFinal - posAspiradoraX;
  var movDI = yFinal - posAspiradoraY;
  var texto = "";

  //para el movimiento derecha e izquierda
  var pasoDI = movDI === 1 ? "paso" : "pasos";
  if (movDI > 0) {
    texto += `${Math.abs(movDI)} ${pasoDI} a la derecha, `;
  } else if (movDI < 0) {
    texto += `${Math.abs(movDI)} ${pasoDI} a la izquierda, `;
  }

  //para el movimiento arriba y abajo
  var pasoSB = movDI === 1 ? "paso" : "pasos";
  if (movSB > 0) {
    texto += `${Math.abs(movSB)} ${pasoSB} hacia abajo `;
  } else if (movSB < 0) {
    //uso el if porque cuando salga 0 no quiero que escriba
    texto += `${Math.abs(movSB)} ${pasoSB} hacia arriba `;
  }
  contadorPasos += Math.abs(movSB) + Math.abs(movDI);
  var pasosSpan = document.getElementById("cPasos");
  pasosSpan.textContent = contadorPasos;
  var listado = document.getElementById("lista");
  var pasos = document.createElement("li");
  pasos.textContent = texto;
  listado.appendChild(pasos);
}

//metodo de la ruta
var distancia = [];
var xVal = [];
var yVal = [];

function moverAspiradora() {
  //si hay más lugares sucios, entonces intentará mover.
  if (determinarLetra()) {
    for (i = 0; i < n; i++) {
      for (x = 0; x < n; x++) {
        if (matriz[i][x] === letraPrioridad) {
          distancia.push(calcularDistancia(i, x));
          xVal.push(i);
          yVal.push(x);
        }
      }
    }
    //el mover aspiradora nos llena la matriz, por lo tanto lo que prosigue es determinar la distancia menor y guardar la posicion.
    var distanciaMen = Math.sqrt(Math.pow(n, 2) + Math.pow(n, 2)) + 1;
    for (var i = 0; i < distancia.length; i++) {
      if (distancia[i] < distanciaMen) {
        distanciaMen = distancia[i];
        xFinal = xVal[i];
        yFinal = yVal[i];
      }
    }
    //Despues de ejecutar esto, ya tenemos la distancia menor y sus posiciones en "X" y "Y".
    limpiar(xFinal, yFinal);
    listarMovimientos();
    //ahora debemos actualizar la visualización de la tabla
    actualizarVisualizacionTabla(xFinal, yFinal);
    //limpiar los arreglos
    limpiarVariablesDeMovimiento();
  } else {
    notificarLimpiezaCompleta();
  }
}

//metodo para actualizar la tabla html

function actualizarVisualizacionTabla(x, y) {
  //trae el "td" que tiene a la aspiradora
  var aspiradora = document.getElementsByClassName("agente")[0];
  //trae el td que tendrá la nueva posición del agente
  var espacio = document.getElementsByTagName("tr")[x].childNodes[y];
  //Ese agente puede tener la imagen verde, amarilla o verde. Se las quitamos
  espacio.classList.remove("a", "b", "c");
  // Le agregamos las propiedades del agente
  espacio.classList.add("agente");
  //quitamos la imagen del aspiradora del "td" anterior
  aspiradora.classList.remove("agente", "a", "b", "c");
  //al "td" en el que estaba la aspiradora, se le pone "d" que equivale a limpio.
  aspiradora.classList.add("d");
  //se asgina la nueva posición del agente
  posicionarAgente(x, y);
}

//metodo para poner datos de la limpieza completa.
function notificarLimpiezaCompleta() {
  var listado = document.getElementById("lista");
  var pasos = document.createElement("li");
  pasos.textContent = "YA SE HA LIMPIADO EL TODA EL \u00c1REA";
  listado.appendChild(pasos);
  alert("Ya est\u00e1 limpio");
  botonMovimiento.disabled = true;
  botonMovimientoAuto.disabled = true;
}
//metodo de limpiar arreglos y asignar nuevas posiciones a la aspiradora

function limpiarVariablesDeMovimiento() {
  distancia = [];
  xVal = [];
  yVal = [];
  posAspiradoraX = xFinal;
  posAspiradoraY = yFinal;
}

//método de la limpieza
function limpiar(xFinal, yFinal) {
  matriz[xFinal][yFinal] = "";
}

//probando

function setearEventListenerDeAsignacionDeInicio() {
  var tr = document.getElementsByTagName("tr");
  for (var i = 0; i < n; i++) {
    for (var y = 0; y < n; y++) {
      tr[i].childNodes[y].addEventListener("click", asignarPosicionDeInicio);
    }
  }
}
// var inicio = document.getElementsByTagName("tr")[x].childNodes[y]
var contadorDeClicks = 0;
function asignarPosicionDeInicio() {
  if (contadorDeClicks < 1) {
    var posx = this.parentNode.sectionRowIndex;
    var posy = this.cellIndex;
    posicionarAgente(posx, posy);
    botonMovimiento.disabled = false;
    botonMovimientoAuto.disabled = false;
    contadorDeClicks++;
  }
}

//permite realizar la limpieza en un solo click
function moverAspiradoraAuto() {
  while (determinarLetra()) {
    botonMovimiento.click();
  }
}
//
