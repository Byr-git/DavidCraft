const music = document.getElementById("bgMusic");

const TRACKS = {
    normal: "../assets/musica.mp3",
    confesion: "../assets/musica-confesion.mp3",
    cofre: "../assets/musica-cofre.mp3",
    explosion: "../assets/musica-explosion.mp3",
    logro: "../assets/musica-logro.mp3"
};

let currentTrack = null;

function changeMusic(track, volume = 0.3) {
    if (!TRACKS[track]) return;

    const newTrack = TRACKS[track];

    // Si ya está sonando esta pista, no hacer nada
    if (currentTrack === newTrack && !music.paused) return;

    currentTrack = newTrack;

    music.pause();
    music.src = newTrack;
    music.currentTime = 0;
    music.volume = volume;

    // Solo la música normal se repite
    music.loop = track === "normal";

    music.play().catch(() => {
        showToast(
            "El navegador bloqueó la música. Pulsa la página una vez y vuelve a intentarlo 🎵"
        );
    });
}

// Cuando termina una música especial, vuelve a la música normal
music.addEventListener("ended", () => {
    if (currentTrack !== TRACKS.normal) {
        changeMusic("normal", 0.3);
    }
});

const startButton = document.getElementById("startButton");
const startScreen = document.getElementById("startScreen");
const game = document.getElementById("game");
const progressBar = document.getElementById("progressBar");
const loadingText = document.getElementById("loadingText");
const toast = document.getElementById("toast");

const loadingMessages = [
    "Generando mundo...",
    "Buscando aldeas...",
    "Generando 64 bloques de diamante...",
    "Detectando hacks de Creative...",
    "Revisando inventario de David...",
    "Encontrando 47 bloques sospechosos...",
    "Cargando el cumpleaños..."
];

let progress = 0;
let msg = 0;

const loading = setInterval(() => {
    progress += Math.floor(Math.random() * 9) + 4;

    if (progress >= 100) {
        progress = 100;
        clearInterval(loading);
        loadingText.textContent = "¡Mundo generado!";
        startButton.disabled = false;
    } else {
        loadingText.textContent = loadingMessages[msg % loadingMessages.length];
        msg++;
    }

    progressBar.style.width = progress + "%";
}, 250);

startButton.disabled = true;
startButton.style.opacity = ".5";

startButton.addEventListener("click", () => {
    startScreen.classList.add("hidden");
    game.classList.remove("hidden");

    // 🎵 Música principal
    changeMusic("normal", 0.3);

    createParticles(35);
    window.scrollTo(0, 0);
});

function showToast(text) {
    toast.textContent = text;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3500);
}

// 🐀 CONFESAR DELITO
document.getElementById("ratButton").addEventListener("click", () => {
    const result = document.getElementById("ratResult");

    changeMusic("confesion", 0.45);

    result.textContent =
        "CONFESIÓN REGISTRADA: “Sí, uso creativo en survival. ¿Y qué?” — elochinopro23";

    showToast("🐀 RATA DETECTADA. Caso cerrado.");
});

// 🏆 LOGROS
document.querySelectorAll(".achievement").forEach(button => {
    button.addEventListener("click", () => {
        changeMusic("logro", 0.4);

        document.getElementById("achievementMessage").textContent =
            "📜 " + button.dataset.msg;
    });
});

// 🎁 COFRE
const chestButton = document.getElementById("chestButton");
const chestContent = document.getElementById("chestContent");

chestButton.addEventListener("click", () => {
    chestButton.classList.add("open");
    chestContent.classList.remove("hidden");

    // 🎵 Música especial del regalo
    changeMusic("cofre", 0.4);

    showToast(
        "Has encontrado el objeto más raro del servidor."
    );

    createParticles(50);
});

// 💥 BOTÓN DESTRUCTIVO
document.getElementById("dangerButton").addEventListener("click", () => {
    const result = document.getElementById("dangerResult");

    // 🎵 Música del desastre
    changeMusic("explosion", 0.5);

    result.innerHTML =
        "💥 <strong>BOOOOOOM.</strong><br><br>" +
        "El servidor ha explotado porque David intentó sacar TNT del creativo.";

    for (let i = 0; i < 8; i++) {
        const explosion = document.createElement("div");
        explosion.className = "explosion";
        explosion.textContent = "💥";
        explosion.style.left = Math.random() * 90 + "vw";
        explosion.style.top = Math.random() * 80 + "vh";

        document.body.appendChild(explosion);
        setTimeout(() => explosion.remove(), 900);
    }

    createParticles(100);
});

function createParticles(amount) {
    const container = document.getElementById("particles");

    for (let i = 0; i < amount; i++) {
        const particle = document.createElement("div");
        particle.className = "particle";
        particle.style.left = Math.random() * 100 + "vw";
        particle.style.animationDuration =
            (1.5 + Math.random() * 3) + "s";
        particle.style.animationDelay =
            Math.random() * .8 + "s";

        container.appendChild(particle);

        setTimeout(() => particle.remove(), 5000);
    }
}

// Creeper aleatorio ocasional
setInterval(() => {
    if (Math.random() > 0.72 && !game.classList.contains("hidden")) {
        showToast(
            "No puedes dormir. Hay moustros cerca."
        );
    }
}, 7000);
