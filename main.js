
console.log(localStorage);
localStorage.setItem('size', 0);

mostrarHistorial();



function handleSubmit() {
    const size = document.getElementById('tamano').value;
    const jugador_1 = document.getElementById('input_jugador1').value;
    const jugador_2 = document.getElementById('input_jugador2').value;
    const jugador_3 = document.getElementById('input_jugador3').value;
    const jugador_4 = document.getElementById('input_jugador4').value;
    localStorage.setItem('size', size);
    localStorage.setItem('jugador-1', jugador_1);
    localStorage.setItem('jugador-2', jugador_2);
    localStorage.setItem('jugador-3', jugador_3);
    localStorage.setItem('jugador-4', jugador_4);


    window.location.href = "juego.html";
    
}


function mostrarHistorial() {
    let historial = JSON.parse(localStorage.getItem('ganadores')) || [];
    let texto = document.getElementById('puntos');
    texto.innerHTML = '';
    for (let i = 0; i < historial.length; i++) {
        let victorias = historial[i][1];
        let nombre = historial[i][0];
        texto.innerHTML += `<p>${nombre}: ${victorias} victorias</p>`;
    }
}
