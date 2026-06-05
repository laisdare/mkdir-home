const terminalText = document.getElementById("terminalText");
const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");

const bootScreen = document.getElementById("boot-screen");
const content = document.getElementById("content");
const nextContainer = document.getElementById("nextContainer");

const typedCommand = document.getElementById("typed-command");

const music = document.getElementById("music");

let etapa = 0;

const telas = [

`$ cat thoughts.txt

Se eu fosse construir uma casa.`,

`Loading structure...

Eu usaria os seus braços como paredes.`,

`Loading windows...

Seus olhos como janelas.`,

`Loading entrance...

Seu sorriso como porta da frente.`,

`Loading fireplace...

Seu coração como a lareira.`,

`Loading light...

E tua alma como a luz.`,

`Saving faith...

E por fim, eu depositaria minha fé.`,

`Verifying...

Sabendo que finalmente`,

];

function typeCommand() {

    const command = "$ mkdir home";

    let i = 0;

    const interval = setInterval(() => {

        const current = command.substring(0, i);

        const commandPart = current.replace("$ ", "");

        let homePart = "";

        if (commandPart.includes(" ")) {
            homePart = commandPart.split(" ").slice(1).join(" ");
        }

        const mkdirPart = commandPart.includes(" ")
            ? commandPart.split(" ")[0]
            : commandPart;

        typedCommand.innerHTML = `
            <span class="green">$</span>
            <span class="red">${mkdirPart}</span>
            <span class="white">${homePart ? " " + homePart : ""}</span>
        `;

        i++;

        if (i > command.length) {
            clearInterval(interval);
        }

    }, 120);

}

function digitar(texto, callback) {

    terminalText.textContent = "";

    let i = 0;

    const intervalo = setInterval(() => {

        terminalText.textContent += texto.charAt(i);

        i++;

        if (i >= texto.length) {

            clearInterval(intervalo);

            callback();

        }

    }, 30);

}

function mostrarEtapa() {

    nextContainer.classList.add("hidden");

    digitar(telas[etapa], () => {

        nextBtn.textContent =
            etapa === telas.length - 1
                ? "Descobrir →"
                : "Continuar →";

        nextContainer.classList.remove("hidden");

    });

}

startBtn.addEventListener("click", async () => {

    const music = document.getElementById("music");

    try {
        music.volume = 0; // começa silencioso
        music.currentTime = 10; // garante que comece do início
        await music.play(); // inicia o áudio
        // FADE-IN
        let vol = 0;
        const fade = setInterval(() => {
            if (vol < 0.5) {
                vol += 0.02;
                music.volume = vol;
            } else {
                clearInterval(fade);
            }
        }, 100);

    } catch (e) {
        console.log("Não foi possível tocar a música:", e);
    }

    bootScreen.classList.add("hidden");
    content.classList.remove("hidden");

    mostrarEtapa();
});

nextBtn.addEventListener("click", () => {

   if (etapa === telas.length - 1) {

    terminalText.innerHTML = `
<div class="final-screen">

    <div class="final-text">
        Encontrei um lar
    </div>

    <div id="slideshow">
        <img id="currentPhoto" src="img/foto1.jpeg">
    </div>

    <div id="photo-gallery" class="photo-gallery hidden">

        <div class="polaroid hidden-photo rotate-left">
            <img src="img/foto1.jpeg">
        </div>

        <div class="polaroid hidden-photo rotate-right">
            <img src="img/foto10.jpeg">
        </div>

        <div class="polaroid hidden-photo rotate-left">
            <img src="img/foto3.jpeg">
        </div>

        <div class="polaroid hidden-photo rotate-right">
            <img src="img/foto4.jpeg">
        </div>

        <div class="polaroid hidden-photo rotate-left">
            <img src="img/foto5.jpeg">
        </div>

        <div class="polaroid hidden-photo rotate-right">
            <img src="img/foto6.jpeg">
        </div>

        <div class="polaroid hidden-photo rotate-left">
            <img src="img/foto7.jpeg">
        </div>

        <div class="polaroid hidden-photo rotate-right">
            <img src="img/foto8.jpeg">
        </div>

        <div class="polaroid hidden-photo rotate-left">
            <img src="img/foto9.jpeg">
        </div>

        <div class="polaroid hidden-photo rotate-right">
            <img src="img/foto2.jpeg">
        </div>

    </div>

    <div class="signature">
        — Laís & Móises
            05/02/2026
                ❤️
    </div>

</div>
`;


    const imagens = [
        "img/foto1.jpeg",
        "img/foto10.jpeg",
        "img/foto3.jpeg",
        "img/foto4.jpeg",
        "img/foto5.jpeg",
        "img/foto6.jpeg",
        "img/foto7.jpeg",
        "img/foto8.jpeg",
        "img/foto9.jpeg",
        "img/foto2.jpeg"
    ];

    const fotoAtual = document.getElementById("currentPhoto");
    const slideshow = document.getElementById("slideshow");
    const galeria = document.getElementById("photo-gallery");

    let indice = 0;

    const intervalo = setInterval(() => {

    fotoAtual.style.opacity = 0;

    setTimeout(() => {

        indice++;

        if (indice < imagens.length) {

            fotoAtual.src = imagens[indice];

            fotoAtual.style.opacity = 1;

        } else {

            clearInterval(intervalo);

            slideshow.remove();

            galeria.classList.remove("hidden");

            const fotos = document.querySelectorAll(".hidden-photo");

            fotos.forEach((foto, index) => {

                setTimeout(() => {

                    foto.classList.add("show-photo");

                }, index * 250);

            });

        }

    }, 500);

}, 2000);

    nextContainer.classList.add("hidden");

    return;
}
    etapa++;
    mostrarEtapa();

});

window.onload = () => {

    typeCommand();

};

