import "./style.css";

const asset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;

// Namen per persoonlijke kalender
const recipients: Record<string, string> = {
  annie: "Annie",
  jais: "Jais",
  vero: "Vero",
};

// Welke persoonlijke kalender wordt geopend?
const params = new URLSearchParams(window.location.search);
const recipientId = params.get("voor") ?? "";
const recipientName = recipients[recipientId] ?? "Christmas Friend";

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
  },

  jais: {
    1: {
      title: "Voor jou!",
      text: "Tijd voor een gezellig avondje.",
      image: "/images/verassingen/jais-1.jpg",
    },
  },

  vero: {
    1: {
      title: "Ho ho ho!",
      text: "Een kleine verrassing voor jou.",
      image: "/images/verassingen/vero-1.jpg",
    },
  },
};

// Verrassingen voor de persoon die de link opent
const personalSurprises = surprises[recipientId] ?? {};

// HTML maken voor een verrassingskaartje
function createSurpriseCard(day: number): string {
  const surprise = personalSurprises[day];

  if (!surprise) {
    return `
      <div class="surprise-card surprise-card-${day}">
        <p>Deze verrassing komt eraan ♡</p>
      </div>
    `;
  }

  const imageHTML = surprise.image
    ? `<img src="${asset(surprise.image)}" alt="${surprise.title ?? "Een verrassing"}">`
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

// Eén klikfunctie voor alle deuren en raampjes
document.querySelector(".calendar")?.addEventListener("click", (event) => {
  const target = event.target;

  if (!(target instanceof Element)) return;

  const clickArea = target.closest(".door-click-area, .window-click-area");

  if (!clickArea) return;

  const area = clickArea.closest(".door-area, .window-area");
  area?.classList.toggle("open");
});
