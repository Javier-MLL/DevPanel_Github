// Registramos el Service Worker si el navegador lo soporta
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then(() => console.log("PWA: Registrada correctamente"))
        .catch((err) => console.log("PWA: Error al registrar", err));
}

let lista_codigos = JSON.parse(localStorage.getItem("mis_codigos")) || [];
let base_codigos = document.getElementById("base_codigos");
let dato_cod_textarea = document.getElementById("dato_cod");
let codigos_div = document.getElementById("codigos");

actualizar_texto(); 

function escapar_html(texto_codigo) {
    return texto_codigo
    .replaceAll('&', '&amp;') // Este va primero para no romper los siguientes
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

    
function actualizar_texto(){
    codigos_div.innerHTML = "";
    
    // Usamos un contador 'i' que va desde 0 hasta el final de la lista
    for(let i = 0; i < lista_codigos.length; i++){
        let codigo_sucio = lista_codigos[i]; // Sacamos el código de esa posición
        let codigo_limpio = escapar_html(codigo_sucio); // Escapamos el HTML
        let codigo_actual = codigo_limpio; // Guardamos el código limpio en una variable
        codigos_div.innerHTML += `
            <div style='border: 1px solid black; margin: 2px; background-color:#353839; color: white; padding: 5px; border-radius:3px;'>
            <pre id='codigo'>${codigo_actual}</pre>
            <!-- Creamos un botón que al pulsarlo llama a eliminar_cod enviándole la posición 'i' -->
            <button onclick="eliminar_cod(${i})" id="eliminar_but" style='border-radius:5px;'>Eliminar</button>
            </div>`;
    }  
}
function eliminar_cod(posicion){
    // Eliminamos el código de la lista usando splice
    lista_codigos.splice(posicion, 1);
    // Guardamos la lista actualizada en localStorage
    localStorage.setItem("mis_codigos", JSON.stringify(lista_codigos));
    // Actualizamos la visualización
    actualizar_texto();
    setTimeout(function(){
        alert("Dato eliminado correctamente");
    }, 1);
}

function guardar_cod() {
    if (dato_cod_textarea.value !== ""){
        let dato_cod = String(dato_cod_textarea.value);
        lista_codigos.push(dato_cod);
        localStorage.setItem("mis_codigos", JSON.stringify(lista_codigos));
        dato_cod_textarea.value = "";
        actualizar_texto();
        setTimeout(function(){
            alert("Dato guardado correctamente");
        }, 1);
    }
}
function base_cod() {
    if (base_codigos.style.display === "block") {
        base_codigos.style.display = "none";
    } else {
        base_codigos.style.display = "block";
    }
}