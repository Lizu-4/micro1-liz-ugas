const jugador1 = localStorage.getItem('jugador-1');
const jugador2 = localStorage.getItem('jugador-2');
const jugador3 = localStorage.getItem('jugador-3');
const jugador4 = localStorage.getItem('jugador-4');
const size = localStorage.getItem('size')

var matriz1 = generarMatriz(size);
var matriz2 = generarMatriz(size);
var matriz3 = generarMatriz(size);
var matriz4 = generarMatriz(size);
let turnos = 80;

document.getElementById("numero-turnos").textContent = turnos; 

var padre = document.getElementById("carton");

var estadoPartida = true;



const jugador_1 = {
    Nombre: jugador1,
    puntos: 0,
    tablon: matriz1
};

mostrarCarton(jugador_1,padre)

const jugador_2 = {
    Nombre: jugador2,
    puntos: 0,
    tablon: matriz2
};

const jugador_3 = {
    Nombre: jugador3,
    puntos: 0,
    tablon: matriz3
};

const jugador_4 = {
    Nombre: jugador4,
    puntos: 0,
    tablon: matriz4
};



document.getElementById('cartones').addEventListener('change', function() {
    const jugadorNumber = this.value;
    let jugador;

    switch (jugadorNumber) {
        case '1':
            jugador = jugador_1;
            break;
        case '2':
            jugador = jugador_2;
            break;
        case '3':
            jugador = jugador_3;
            break;
        case '4':
            jugador = jugador_4;
            break;
        default:
            jugador = jugador_1;
            break;
    }
            mostrarCarton(jugador,padre)
});




function registrarVictoria(ganador) {
    let historial = JSON.parse(localStorage.getItem('ganadores')) || [];
    let index = historial.findIndex(item => item[0] === ganador.Nombre);
    if (index === -1) {
        historial.push([ganador.Nombre, 1]);
    } else {
        historial[index][1] = historial[index][1] +1 ;
    }
    localStorage.setItem('ganadores', JSON.stringify(historial));
}

function turno() {
    if (turnos > 0 && estadoPartida) {
        mostrarPuntos();
        turnos = turnos - 1
        numero = Math.floor(Math.random() * 30) + 1;
        document.getElementById("numero").textContent = numero;   
        document.getElementById("numero-turnos").textContent = turnos;   
        marcarNumero(jugador_1, numero, padre);
        marcarNumero(jugador_2, numero, padre);
        marcarNumero(jugador_3, numero, padre);
        marcarNumero(jugador_4, numero, padre);    
        }
    if (turnos == 0) {
        partidaFinalizada();
    }
    
}

function mostrarPuntos() {
    caja =  document.getElementById("score");
    caja.innerHTML = ""

    caja.innerHTML +=  jugador_1.Nombre + ": " + jugador_1.puntos + "<br>";
    caja.innerHTML +=  jugador_2.Nombre + ": " + jugador_2.puntos + "<br>";
    caja.innerHTML +=  jugador_3.Nombre + ": " + jugador_3.puntos + "<br>";
    caja.innerHTML +=  jugador_4.Nombre + ": " + jugador_4.puntos + "<br>";
}

function marcarNumero(jugador, numero, padre) { 
    for (let i = 0; i < jugador.tablon.length; i++) { 
        for (let j = 0; j <jugador.tablon[i].length; j++) { 
            if (jugador.tablon[i][j] === numero) { 
                jugador.tablon[i][j] = 'X'; 
                mostrarCarton(jugador, padre);
                revisarPuntos(jugador, i, j)
            } 
        } 
        
    } 
    mostrarCarton(jugador, padre);
} 

function revisarPuntos(jugador, x, y) {
    let filaPuntos = true;
    let columnaPuntos = true;
    let diagonalDPuntos = false;
    let diagonalIPuntos = false;
    let cartonLleno = true;
    
    
    for (let i = 0; i < jugador.tablon.length; i++) { 
        for (let j = 0; j <jugador.tablon[i].length; j++) { 
            if (jugador.tablon[i][j] !== 'X') {
                cartonLleno = false;
            }
        } 
    }


     //diagonal
    if (x == y) {
        diagonalDPuntos = true;
        for (let j = 0; j < jugador.tablon.length; j++) {
            if (jugador.tablon[j][j] !== 'X') {
                diagonalDPuntos = false;
                break;
            }
        }
    
    }

    //diagonal izquierda
    if (x === 0 && y === jugador.tablon.length-1 || y === 0 && x === jugador.tablon.length-1 || x == y && x > 0) {
        diagonalIPuntos = true;
        let j = jugador.tablon.length-1
        for (let i = 0; i < jugador.tablon.length; i++) {
                if (jugador.tablon[i][j] !== 'X') {
                    diagonalIPuntos = false;
                    break;
                }
                j = j-1
        }
    }

    //fila
    for (let i = 0; i < jugador.tablon[0].length; i++) {
        if (jugador.tablon[x][i] !== 'X') {
            filaPuntos = false;
            break;
        }
    }

    //columna
    for (let j = 0; j < jugador.tablon.length; j++) {
        if (jugador.tablon[j][y] !== 'X') {
            columnaPuntos = false;
            break;
        }
    }

    if (cartonLleno) {
        jugador.puntos = jugador.puntos + 50;
        partidaFinalizada();
    }

    if (filaPuntos) {
        jugador.puntos = jugador.puntos + 1;
        mostrarPuntos();
    }
    if (columnaPuntos) {
        jugador.puntos = jugador.puntos + 1;
        mostrarPuntos();
    }
    if (diagonalDPuntos) {
        jugador.puntos = jugador.puntos + 3;
        mostrarPuntos();
    }
    if (diagonalIPuntos) {
        jugador.puntos = jugador.puntos + 3;
        mostrarPuntos();
    }
}

function partidaFinalizada() {
    estadoPartida = false;
    let maxPuntos = 0;
    let ganadores = [];
    caja = document.getElementById("mensaje");
    caja.innerHTML = ''

    for (const jugador of [jugador_1, jugador_2, jugador_3, jugador_4]) {
        if (jugador.puntos > maxPuntos) {
            maxPuntos = jugador.puntos;
            ganadores = [jugador];
        } else if (jugador.puntos == maxPuntos) {
            ganadores.push(jugador);
        }
    }

    if (maxPuntos == 0) {
        caja.innerHTML = 'Nadie ha ganado :c';   
    }
    else if (ganadores.length > 1) {
        
        let nombres = ganadores.map(jugador => jugador.Nombre).join(' y ');
        caja.innerHTML = 'Hay un empate entre ' + nombres + '!!';
    } else if (ganadores.length == 1) {
        caja.innerHTML = ganadores[0].Nombre + ' ha ganado la partida!!!';
        registrarVictoria(ganadores[0]);
    }
}


function verCartonLleno(jugador) {
    ganador = true;
    for (let i = 0; i < jugador.tablon.length; i++) { 
        for (let j = 0; j <jugador.tablon[i].length; j++) { 
            if (jugador.tablon[i][j] !== 'X') {
                ganador = false;
            }
        } 
    }
    if (ganador) {
        jugador.puntos = jugador.puntos + 50;
        partidaFinalizada();
    }
}

function mostrarCarton(jugador, padre) {
    
    padre.innerHTML = "";
    
    for (i=0;i<jugador.tablon.length;i++) {
        for (j=0;j<jugador.tablon[i].length;j++) {
            console.log(jugador.tablon[i].length);
            if (jugador.tablon[i].length == 4) {
                padre.classList.add('grid4')
                padre.innerHTML += '<div class="cell">' + jugador.tablon[i][j] +'</div>';
            } if (jugador.tablon[i].length == 3) {
                padre.classList.add('grid3')
                padre.innerHTML += '<div class="cell">' + jugador.tablon[i][j] +'</div>';
            } else {
                padre.classList.add('grid5')
                padre.innerHTML += '<div class="cell">' + jugador.tablon[i][j] +'</div>';
            }
        

        }
    }
}

function generarMatriz(size) {
    var matriz = [];
    for (let i = 0; i < size; i++) {
        matriz.push([]);
        for (let j = 0; j < size; j++) {
            let randomNumber;
        do {
            randomNumber = randomNumber = Math.floor(Math.random() * 30) + 1;
        } while (matriz.flat().includes(randomNumber));
        matriz[i].push(randomNumber);
        }
    }
    return matriz;
}

function volverHome() {
    window.location.href = "index.html";
}

