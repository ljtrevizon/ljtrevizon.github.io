const enviarBtn = document.getElementById('enviar');
const cantidadInput = document.getElementById('cantidad');
const resultadoDiv = document.getElementById('resultado');

enviarBtn.addEventListener('click', async () => {
    const cantidad = BigInt(cantidadInput.value);
    if (/^\d+$/.test(cantidadInput.value) && cantidad > 0) {
        resultadoDiv.innerHTML = '<p>Contrasenas</p>';
        const respuesta = await fetch('http://127.0.0.1:8000/api/pass', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Origin': '*',
                'Content-Length': 541
            },
            body: JSON.stringify({ cantidad: cantidad.toString() })
        });

        const datos = await respuesta.json();
        console.log(datos)
        const array = datos.lista;
        const elementos = array.map((element, index) => `<p>${index+1}. ${element.toString()}</p>`);
        resultadoDiv.innerHTML += elementos.join('');
    } else {
        resultadoDiv.innerHTML = '<p>Ingrese una cantidad válida</p>';
    }
});