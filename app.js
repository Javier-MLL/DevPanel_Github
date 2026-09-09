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
let resultado_ip_div = document.getElementById("resultado_ip");
let datos_ip = document.getElementById("datos_ip");
const modulos = [base_codigos, datos_ip];


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


async function buscar_ip() {
    let ip = document.getElementById("text_ip").value;
    if (ip !== "") {
        let respuesta = await fetch(`http://ip-api.com/json/${ip}`);
        let datos = await respuesta.json();
        resultado_ip_div.innerHTML = `
            <p><strong>Ciudad:</strong> ${datos.city}</p>
            <p><strong>Región:</strong> ${datos.regionName}</p>
            <p><strong>País:</strong> ${datos.country}</p>
            <p><strong>Organización:</strong> ${datos.org}</p>
            <p><strong>ASN:</strong> ${datos.as}</p>
            <p><strong>Código Postal:</strong> ${datos.zip}</p>
            <p><strong>Latitud:</strong> ${datos.lat}</p>
            <p><strong>Longitud:</strong> ${datos.lon}</p>
            <p><strong>Dirección IP:</strong> ${datos.query}</p>`;
    }
}
function mostrarModulo(moduloSeleccionado) {
    for (const modulo of modulos) {
        if (modulo === moduloSeleccionado) {
            // Alternamos entre block y none directamente en el estilo en línea
            if (modulo.style.display === "block") {
                modulo.style.display = "none";
            } else {
                modulo.style.display = "block";
            }
        } else {
            // Todos los demás módulos se ocultan obligatoriamente
            modulo.style.display = "none";
        }
    }
}


