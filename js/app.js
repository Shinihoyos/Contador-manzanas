let numero1 = 0;
let numero2 = 0;
let total = 0;

const SVG_MANZANA = `
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="62" cy="17" rx="17" ry="8"
        fill="#2e8b57" transform="rotate(-25 62 17)"/>
    <rect x="47" y="12" width="7" height="18" rx="3"
        fill="#654321"/>
    <path d="M50 30 C30 15 10 35 15 60
        C20 85 40 92 50 82
        C60 92 80 85 85 60
        C90 35 70 15 50 30 Z"
        fill="#ed1c24" stroke="#222" stroke-width="4"/>
    <ellipse cx="32" cy="43" rx="7" ry="12"
        fill="white" opacity="0.45"/>
</svg>`;

function nuevaSuma() {
    numero1 = Math.floor(Math.random() * 9) + 1;
    numero2 = Math.floor(Math.random() * (10 - numero1)) + 1;
    total = numero1 + numero2;

    document.getElementById("contenedor1").innerHTML = "";
    document.getElementById("contenedor2").innerHTML = "";
    document.getElementById("resultado").innerHTML = "";

    document.getElementById("resultado").classList.remove("correcto", "incorrecto");
    document.getElementById("mensaje").textContent = "";

    crearManzanas(document.getElementById("contenedor1"), numero1);
    crearManzanas(document.getElementById("contenedor2"), numero2);
}

function crearManzanas(contenedor, cantidad) {
    for (let i = 0; i < cantidad; i++) {
        const manzana = document.createElement("div");
        manzana.className = "manzana";
        manzana.innerHTML = SVG_MANZANA;
        contenedor.appendChild(manzana);
    }
}

function comenzarArrastre(event) {
    event.dataTransfer.setData("text/plain", "manzana");
    event.dataTransfer.effectAllowed = "copy";
}

function permitirSoltar(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
}

function soltarManzana(event) {
    event.preventDefault();

    if (event.dataTransfer.getData("text/plain") !== "manzana") {
        return;
    }

    const resultado = document.getElementById("resultado");
    const nuevaManzana = document.createElement("div");

    nuevaManzana.className = "manzana";
    nuevaManzana.innerHTML = SVG_MANZANA;

    resultado.appendChild(nuevaManzana);

    resultado.classList.remove("correcto", "incorrecto");
    document.getElementById("mensaje").textContent = "";
}

function verificarResultado() {
    const resultado = document.getElementById("resultado");
    const cantidad = resultado.querySelectorAll(".manzana").length;
    const mensaje = document.getElementById("mensaje");

    if (cantidad === total) {
        resultado.classList.remove("incorrecto");
        resultado.classList.add("correcto");
        mensaje.textContent = "🎉 ¡Correcto! La suma está bien.";
    } else {
        resultado.classList.remove("correcto");
        resultado.classList.add("incorrecto");
        mensaje.textContent =
            "❌ Aún no es correcto. Sigue contando las manzanas.";
    }
}

document.getElementById("manzanaModelo").innerHTML = SVG_MANZANA;

document.getElementById("btnNuevaSuma").addEventListener("click", nuevaSuma);
document.getElementById("btnVerificar").addEventListener("click", verificarResultado);

nuevaSuma();
