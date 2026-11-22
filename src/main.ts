import "./style.css";
import { createWordleHTML, setupWordle } from "./wordle";
import { createDrinkBookHTML, setupDrinkBook } from "./drinks-book";

// Lock-systeem adventskalender
const TEST_UNLOCKED_DAY: number | null = 25;

function getUnlockedDay(): number {
  if (TEST_UNLOCKED_DAY !== null) {
    return TEST_UNLOCKED_DAY;
  }

  const today = new Date();

  if (today.getMonth() !== 11) {
    return 0;
  }

  return today.getDate();
}

const asset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;

const recipients: Record<string, string> = {
  annie: "Annie",
  jais: "Jais",
  vero: "Vero",
  marjon: "Marjon",
};

// Welke persoonlijke kalender wordt geopend?
const params = new URLSearchParams(window.location.search);
const recipientId = params.get("voor") ?? "";
const recipientName = recipients[recipientId] ?? "Christmas Friend";
document.title = `${recipientName}'s Advent Calendar`;

// ==========================================
// HIER VUL JE DE PERSOONLIJKE VERRASSINGEN IN
// ==========================================

type Surprise = {
  title?: string;
  text?: string;
  image?: string;
  video?: string;
};

const surprises: Record<string, Record<number, Surprise>> = {
  annie: {
    1: {
      text: "Lekker drankie doen saampies!",
      image: "/images/verassingen/annie/Foto1.JPG",
    },
    2: {
      text: "Echte diva deze meid",
      image: "/images/verassingen/annie/2.JPG",
    },
    5: {
      text: "Kiek ons nou haha",
      image: "/images/verassingen/annie/dag5.jpg",
    },
  },

  jais: {
    1: {
      text: "Echt kleintjes.",
      image: "/images/verassingen/jais/dag1.JPG",
    },
    2: {
      text: "En echt te hip zijn wij",
      image: "/images/verassingen/jais/dag2.jpg",
    },
    5: {
      text: "echt een cutie",
      image: "/images/verassingen/jais/dag5.JPG",
    },
  },

  vero: {
    1: {
      text: "Toen al gekkies!",
      image: "/images/verassingen/vero/baard3.jpg",
    },
    2: {
      text: "Nu nog gekkies!",
      image: "/images/verassingen/vero/dag2.JPG",
    },
    5: {
      text: "Lekker drankies doen saampies",
      image: "/images/verassingen/vero/dag5.JPG",
    },
  },
  marjon: {
    1: {
      text: "Toen al helemaal hip samen",
      image: "/images/verassingen/marjon/dag1.JPG",
    },
    2: {
      text: "Nu nog helemaal hip!",
      image: "/images/verassingen/marjon/dag2.JPG",
    },
    5: {
      text: "Weetje nog in Italie?",
      image: "/images/verassingen/marjon/dag5.JPG",
    },
  },
};

// Verrassingen voor de persoon die de link opent
const personalSurprises = surprises[recipientId] ?? {};

// HTML maken voor een verrassingskaartje
function createSurpriseCard(day: number): string {
  // Wordle op dag 7
  if (day === 7) {
    return `
      <div class="surprise-card surprise-card-7 wordle-surprise-card">
        ${createWordleHTML()}
      </div>
    `;
  }

  // Gezamenlijk receptenboekje op dag 3
  if (day === 3) {
    return `
    <div class="surprise-card surprise-card-3 drink-book-surprise-card">
      ${createDrinkBookHTML()}
    </div>
  `;
  }

  // Compliment of the day op dag 4
  if (day === 4) {
    return `
    <div class="surprise-card surprise-card-4">
      <h2>Compliment of the day ♡</h2>
      <p>Ik ben blij met alle gezelligheid en blijdschap die jij in mijn leven brengt.</p>
    </div>
  `;
  }

  // Current Mood op dag 6
  if (day === 6) {
    return `
    <div class="surprise-card surprise-card-6">
      <h2>Current mood</h2>
      <p>
        Stuur een foto of plaatje die jouw mood van vandaag omschrijft!
      </p>
      <p>
        Mag een selfie zijn, een meme, een GIF of iets totaal randoms. 😂
      </p>
    </div>
  `;
  }
  // Persoonlijke kersthoroscoop op dag 12
  if (day === 12) {
    const horoscopes: Record<string, string> = {
      annie:
        "Deze kerst hangt er iets bijzonders in de lucht. Jouw warme hart brengt gezelligheid en geluk aan de mensen om je heen. Verwacht knusse momenten, onverwachte lachbuien en misschien wel een kleine verrassing uit de kerststerren.",

      jais: "Jij bent deze kerst niet te missen! Net als de kerstlichtjes straal je erop los. De sterren voorspellen een vleugje avontuur, een flinke dosis gezelligheid en een verrassing die helemaal bij jou past. Blijf vooral lekker shinen!",

      vero: "De kerststerren brengen jou een seizoen vol warmte, harmonie en kleine geluksmomentjes. Er staat gezelligheid op de planning en misschien komt er iets op je pad dat je nét dat extra beetje magie geeft. Volg je gevoel, want dat zit deze kerst helemaal goed.",

      marjon:
        "Deze kerst fluisteren de sterren dat jouw creativiteit mag schitteren! Laat je inspireren door de kleine dingen om je heen en geef je fantasie alle ruimte. Misschien ontstaat er wel iets bijzonders uit een onverwachte ingeving. De mooiste kunstwerken beginnen tenslotte met een beetje magie. ♡",
    };

    return `
      <div class="surprise-card surprise-card-12">
        <h2>Jouw kersthoroscoop ✨</h2>
        <p>${horoscopes[recipientId] ?? "De kerststerren hebben iets moois voor jou in petto. Laat je verrassen door een beetje kerstmagie! ♡"}</p>
      </div>
    `;
  }

  const surprise = personalSurprises[day];

  if (!surprise) {
    return `
      <div class="surprise-card surprise-card-${day}">
        <p>Deze verrassing komt eraan ♡</p>
      </div>
    `;
  }

  const imageHTML = surprise.image
    ? `<img src="${asset(surprise.image)}" class="surprise-image-${recipientId}-${day}" alt="${surprise.title ?? "Een verrassing"}">`
    : "";

  const videoHTML = surprise.video
    ? `<video src="${asset(surprise.video)}" controls playsinline></video>`
    : "";

  const titleHTML = surprise.title ? `<h2>${surprise.title}</h2>` : "";

  const textHTML = surprise.text ? `<p>${surprise.text}</p>` : "";

  return `
    <div class="surprise-card surprise-card-${day}">
      ${imageHTML}
      ${videoHTML}
      ${titleHTML}
      ${textHTML}
    </div>
  `;
}

// Welke raampjes hebben één paneel?
const singleWindowDays = new Set([5, 6, 9, 10, 11, 13, 19, 22]);

type CropInfo = {
  left: number;
  top: number;
  width: number;
  height: number;
  originalWidth: number;
  originalHeight: number;
};

// Uitsnedegegevens ophalen
const cropMetadata: Record<string, CropInfo> = await fetch(
  asset("/images/raampjes-klein/metadata.json"),
).then((response) => {
  if (!response.ok) {
    throw new Error("De metadata van de raampjes kon niet worden geladen.");
  }

  return response.json();
});

// Een uitgesneden raampje op de oorspronkelijke positie plaatsen
function createCroppedWindow(file: string, className: string): string {
  const crop = cropMetadata[file];

  if (!crop) {
    throw new Error(`Geen uitsnedegegevens gevonden voor ${file}`);
  }

  const left = (crop.left / crop.originalWidth) * 100;
  const top = (crop.top / crop.originalHeight) * 100;
  const width = (crop.width / crop.originalWidth) * 100;
  const height = (crop.height / crop.originalHeight) * 100;

  return `
    <div class="window ${className}">
      <img
        src="${asset(`/images/raampjes-klein/${file}`)}"
        class="window-crop"
        style="left:${left}%; top:${top}%; width:${width}%; height:${height}%;"
        alt=""
      />
    </div>
  `;
}

// Genereer HTML voor raampjes 2 t/m 25
const windowsHTML = Array.from({ length: 24 }, (_, index) => {
  const day = index + 2;
  const isSingle = singleWindowDays.has(day);

  const panels = isSingle
    ? createCroppedWindow(`${day}.png`, "window-single")
    : `
        ${createCroppedWindow(`${day}l.png`, "window-left")}
        ${createCroppedWindow(`${day}r.png`, "window-right")}
      `;

  return `
    <div class="window-area window-${day}" data-day="${day}" aria-label="Day ${day}">
      ${createSurpriseCard(day)}
      ${panels}

      <button
        class="window-click-area window-click-area-${day}"
        aria-label="Open raampje ${day}"
      ></button>
    </div>
  `;
}).join("");

// Pagina opbouwen
document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <main class="page">
    <header class="intro">
      <p class="eyebrow">A LITTLE CHRISTMAS TRADITION</p>
      <h1>${recipientName}'s Advent Calendar</h1>
      <p class="subtitle">Twenty-five little moments of magic</p>
    </header>

    <section class="calendar">
      <img
        src="${asset("/images/Basis.png")}"
        alt="Our Christmas village advent calendar"
        class="calendar-image"
      />

      <!-- Voordeur: dag 1 -->
      <div class="door-area" data-day="1" aria-label="Day 1">
        ${createSurpriseCard(1)}

        <img src="${asset("/images/deurtjes/1l.png")}" class="door door-left" alt="">
        <img src="${asset("/images/deurtjes/1r.png")}" class="door door-right" alt="">

        <button class="door-click-area" aria-label="Open voordeur"></button>
      </div>

      <!-- Raampjes 2 t/m 25 -->
      ${windowsHTML}
    </section>

    <footer>
      <p>Made with love by Rie :)</p>
    </footer>
  </main>
`;

// Wordle activeren nadat de HTML is opgebouwd
setupWordle();
setupDrinkBook();

// Eén klikfunctie voor alle deuren en raampjes
document.querySelector(".calendar")?.addEventListener("click", (event) => {
  const target = event.target;

  if (!(target instanceof Element)) return;

  const clickArea = target.closest(".door-click-area, .window-click-area");

  if (!clickArea) return;

  const area = clickArea.closest(".door-area, .window-area");

  if (!area) return;

  // Bepaal welke dag bij dit deurtje of raampje hoort
  const day = Number(area.getAttribute("data-day"));

  // Voorkom openen van toekomstige dagen
  if (!area.classList.contains("open") && day > getUnlockedDay()) {
    return;
  }

  area.classList.toggle("open");
});
