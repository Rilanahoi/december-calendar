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
    9: {
      text: "Echte gekkies <3<3<3",
      image: "/images/verassingen/annie/dag9.jpg",
    },
    11: {
      image: "/images/verassingen/iedereen/memeannie.jpg",
    },
    14: {
      text: "Toen al supermodellen",
      image: "/images/verassingen/annie/dag14.JPG",
    },
    21: {
      text: "Merry larry xmas",
      image: "/images/verassingen/annie/merrylarry.png",
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
    9: {
      text: "<3<3<3",
      image: "/images/verassingen/jais/dag9.jpg",
    },
    11: {
      image: "/images/verassingen/iedereen/memejais.jpg",
    },
    14: {
      text: "En deze banger van een foto niet vergeten",
      image: "/images/verassingen/jais/dag14.JPG",
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
    9: {
      text: "<3 <3 <3",
      image: "/images/verassingen/vero/dag9.JPG",
    },
    11: {
      image: "/images/verassingen/iedereen/memevero.png",
    },
    14: {
      text: "al 100 jaar vriendinnen <3",
      image: "/images/verassingen/vero/dag14.JPG",
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
    9: {
      text: "<3<3<3",
      image: "/images/verassingen/marjon/dag9.JPG",
    },
    11: {
      image: "/images/verassingen/iedereen/mememarjon.jpg",
    },
    14: {
      text: "en het bordspel niet vergeten hihihi",
      image: "/images/verassingen/marjon/dag14.JPG",
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
        Mag een selfie zijn, een meme, een GIF of iets totaal randoms.
        Stuur naar Rie op whatsapp!
              </p>
    </div>
  `;
  }
  // Persoonlijk Spotify-nummer op dag 10
  if (day === 10) {
    const spotifyTracks: Record<string, string> = {
      annie: "https://open.spotify.com/track/0VjIjW4GlUZAMYd2vXMi3b",
      jais: "https://open.spotify.com/track/4zP7ADsgJgHGY6VzxbNp1z",
      vero: "https://open.spotify.com/track/2Tf9Zw167rkeEgq2t9JWpn",
      marjon: "https://open.spotify.com/track/7MeD7vt3AEmW2mQd0jzelq",
    };

    return `
      <div class="surprise-card surprise-card-10 spotify-card">
        <h2>Today's soundtrack</h2>
        <p>Een liedje speciaal voor jou!</p>
        <a
          href="${spotifyTracks[recipientId]}"
          target="_blank"
          rel="noopener noreferrer"
          class="spotify-button"
        >
          Luister hierrrr
        </a>
      </div>
    `;
  }
  // Meme of the Day op dag 11
  if (day === 11) {
    const meme = personalSurprises[11];

    return `
      <div class="surprise-card surprise-card-11">
        <h2>MEME OF THE DAY </h2>
        <p>Geen context nodig. Gewoon even lachen. 😂</p>
        <img
          src="${asset(meme.image!)}"
          class="surprise-image-${recipientId}-11"
          alt="Meme of the Day"
        >
      </div>
    `;
  }
  // Dilemma Tuesday op dag 8, 15 en 22
  const dilemmas: Record<number, { image: string; text: string }> = {
    8: {
      image: "/images/verassingen/iedereen/dd1.jpg",
      text: "Je moet elke ochtend een halve liter lauw bier drinken – OF – je moet elke ochtend bootcampen tussen 6 en 8.",
    },
    15: {
      image: "/images/verassingen/iedereen/dd2.jpg",
      text: "Je wordt elke dag wakker met Wake Me Up Before You Go-Go van Wham! – OF – je spuit elke dag een bus haarspray in je haar.",
    },
    22: {
      image: "/images/verassingen/iedereen/dd3.jpg",
      text: "Je maakt elk uur het geluid van een koekoeksklok – OF – je kunt geen klok meer lezen.",
    },
  };

  if (dilemmas[day]) {
    const dilemma = dilemmas[day];

    return `
      <div class="surprise-card surprise-card-${day} dilemma-tuesday-card">
        <img
          src="${asset(dilemma.image)}"
          class="dilemma-image"
          alt="Dilemma Tuesday"
        >
        <p class="dilemma-text">${dilemma.text}</p>
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

  if (day === 13) {
    return `
    <div class="surprise-card surprise-card-13">
      <h2>FOTO CHALLENGE</h2>
      <p>
       De challenge is simpel:
      </p>
      <p class="photo-challenge-task">
        zoek iets roods en maak een foto
      </p>
      <p>
        stuur naar rie op whatsapp!
      </p>
      <p class="photo-challenge-footer">
      </p>
    </div>
  `;
  }
  // A Random Prophecy op dag 16
  if (day === 16) {
    const prophecies: Record<
      string,
      { title: string; text: string; symbol: string }
    > = {
      annie: {
        title: "De voorspelling van onverwachte avonturen",
        text: "Er komt een onverwachte kans op je pad. In eerste instantie zul je je afvragen waarom je hieraan begint, maar uiteindelijk blijkt het precies het soort twijfelachtige avontuur te zijn dat je nodig had. Een spontaan plan, een beetje chaos en een verhaal om nooit meer te vergeten staan in de sterren geschreven.",
        symbol: "🗝️ Een mysterieuze sleutel",
      },
      jais: {
        title: "De voorspelling van groot fortuin",
        text: "Een mysterieuze golf van geluk komt jouw kant op. Iets wat je al een tijdje wilt, zal plotseling binnen handbereik liggen. Helaas is je bankrekening daar misschien iets minder enthousiast over. Het universum adviseert je om je dromen te volgen, maar misschien eerst even je saldo te checken.",
        symbol: "💰 Een gouden munt",
      },
      vero: {
        title: "De voorspelling van onverwachte wendingen",
        text: "Het universum heeft iets bijzonders voor je in petto. Een onverwachte ontmoeting, een vreemd toeval of een situatie die zo absurd is dat niemand je ooit zal geloven. Negeer de tekens niet. Vooral niet als ze iets te maken hebben met snacks, goede muziek of een bijzonder gelukkige dinsdag.",
        symbol: "🌟 Een vallende ster",
      },
      marjon: {
        title: "De voorspelling van creatieve chaos",
        text: "De sterren voorspellen een plotselinge uitbarsting van inspiratie. Een gewone dag verandert in een onverwacht creatief avontuur. Je begint misschien met één klein idee en eindigt met iets totaal anders. Pas op: je fantasie is niet meer te stoppen. Zelfs het universum kan je ideeën niet bijhouden.",
        symbol: "🖌️ Een penseel",
      },
    };

    const prophecy = prophecies[recipientId] ?? {
      title: "Een bijzondere voorspelling",
      text: "Het universum heeft iets moois voor jou in petto. Er komt een onverwachte verrassing op je pad. Blijf nieuwsgierig en laat je verrassen!",
      symbol: "✨ Een beetje kerstmagie",
    };

    return `
      <div class="surprise-card surprise-card-16">
        <h2>🔮 A RANDOM PROPHECY</h2>
        <p class="prophecy-intro">Het universum heeft een boodschap voor je...</p>

        <div class="prophecy-choices">
          <p class="prophecy-instruction">Kies één van de drie kaarten</p>

          <div class="prophecy-card-list">
            <button class="prophecy-card-choice" type="button" aria-label="Kies kaart 1">
              <span class="prophecy-card-inner">
                <span class="prophecy-card-back">✦</span>
                <span class="prophecy-card-front">☾</span>
              </span>
            </button>

            <button class="prophecy-card-choice" type="button" aria-label="Kies kaart 2">
              <span class="prophecy-card-inner">
                <span class="prophecy-card-back">✦</span>
                <span class="prophecy-card-front">☼</span>
              </span>
            </button>

            <button class="prophecy-card-choice" type="button" aria-label="Kies kaart 3">
              <span class="prophecy-card-inner">
                <span class="prophecy-card-back">✦</span>
                <span class="prophecy-card-front">☆</span>
              </span>
            </button>
          </div>
        </div>

        <div class="prophecy-result" hidden>
          <p class="prophecy-reveal-label">JOUW VOORSPELLING</p>
          <h3>${prophecy.title}</h3>
          <p class="prophecy-text">${prophecy.text}</p>
          <p class="prophecy-symbol">${prophecy.symbol}</p>
          <p class="prophecy-ending">Het universum heeft gesproken. Zeg niet dat we je niet gewaarschuwd hebben. ✨</p>
        </div>
      </div>
    `;
  }

  // Welke kerstfilm ben jij? - dag 20
  if (day === 20) {
    const questions = [
      {
        question: "Hoe ziet jouw ideale kerstdag eruit?",
        options: [
          {
            text: "Een dag vol avonturen en een beetje chaos",
            movie: "home-alone",
          },
          {
            text: "Lekker met rust gelaten worden, dankjewel",
            movie: "grinch",
          },
          {
            text: "Een knus huisje, lekker eten en gezelligheid",
            movie: "the-holiday",
          },
          {
            text: "Overal lichtjes, cadeautjes en kerstplezier!",
            movie: "elf",
          },
        ],
      },
      {
        question: "Wat is jouw rol tijdens een kerstfeest?",
        options: [
          {
            text: "Ik ben degene die iedereen aan het lachen maakt",
            movie: "elf",
          },
          {
            text: "Ik sta alles vanaf een afstandje te observeren",
            movie: "grinch",
          },
          {
            text: "Ik zorg dat iedereen zich welkom voelt",
            movie: "love-actually",
          },
          {
            text: "Ik ben de onverwachte factor van de avond",
            movie: "nightmare",
          },
        ],
      },
      {
        question: "Er gaat iets compleet mis met kerst. Wat doe je?",
        options: [
          { text: "Ik los het zelf wel op. Kom maar op!", movie: "home-alone" },
          {
            text: "Ik maak er het beste van met een dekentje en wat lekkers",
            movie: "the-holiday",
          },
          {
            text: "Ik vertrouw erop dat er iets magisch gebeurt",
            movie: "polar-express",
          },
          { text: "Ik had al verwacht dat dit zou gebeuren", movie: "grinch" },
        ],
      },
      {
        question: "Je mag één magisch kerstcadeau kiezen. Wat wordt het?",
        options: [
          {
            text: "Een kaartje naar een magische andere wereld",
            movie: "polar-express",
          },
          {
            text: "Een tweede kans op een bijzonder avontuur",
            movie: "love-actually",
          },
          {
            text: "Een beetje duistere magie en iets totaal onverwachts",
            movie: "nightmare",
          },
          {
            text: "Een onuitputtelijke voorraad speelgoed en snoep",
            movie: "elf",
          },
        ],
      },
      {
        question: "Waar zou jij het liefst kerst vieren?",
        options: [
          {
            text: "In een bruisende stad vol kerstlichtjes",
            movie: "love-actually",
          },
          {
            text: "In een Engels huisje met een open haard",
            movie: "the-holiday",
          },
          {
            text: "In een magische wereld vol sneeuw en sterren",
            movie: "polar-express",
          },
          {
            text: "In een vreemd maar prachtig fantasiewereldje",
            movie: "nightmare",
          },
        ],
      },
      {
        question: "Wat past het beste bij jouw persoonlijkheid?",
        options: [
          {
            text: "Slim, zelfstandig en soms een tikkeltje ondeugend",
            movie: "home-alone",
          },
          {
            text: "Een beetje sarcastisch, maar met een klein hartje",
            movie: "grinch",
          },
          {
            text: "Enthousiast, spontaan en altijd in voor plezier",
            movie: "elf",
          },
          {
            text: "Gevoelig, zorgzaam en gek op mooie momenten",
            movie: "love-actually",
          },
        ],
      },
      {
        question: "Kies jouw ultieme kerstgevoel!",
        options: [
          {
            text: "Een beetje vreemd, lekker eigenzinnig en creatief",
            movie: "nightmare",
          },
          {
            text: "Verwondering, magie en geloven in het onmogelijke",
            movie: "polar-express",
          },
          {
            text: "Lachen om alle chaos die vanzelf ontstaat",
            movie: "home-alone",
          },
          { text: "Warmte, romantiek en samen genieten", movie: "the-holiday" },
        ],
      },
    ];

    const movies = [
      {
        id: "home-alone",
        title: "Home Alone",
        description:
          "Jij bent slim, zelfstandig en niet bang om je eigen plan te trekken. Als er iets misgaat, bedenk jij wel een oplossing. Misschien loopt het niet altijd helemaal volgens plan, maar saai wordt het met jou nooit. Jij maakt van iedere situatie een avontuur!",
      },
      {
        id: "grinch",
        title: "The Grinch",
        description:
          "Je hebt een gezonde dosis sarcasme en bent niet altijd even enthousiast over alle kerstgekte. Maar achter dat soms wat norse uiterlijk zit een warm hart. Je laat misschien niet altijd zien hoeveel je om anderen geeft, maar de mensen die jou kennen weten wel beter.",
      },
      {
        id: "the-holiday",
        title: "The Holiday",
        description:
          "Jij houdt van gezelligheid, kleine geluksmomentjes en een flinke dosis romantiek. Een knus plekje, lekker eten en goed gezelschap maken jou helemaal gelukkig. Je gelooft dat er altijd iets moois kan ontstaan, zelfs wanneer dingen anders lopen dan verwacht.",
      },
      {
        id: "elf",
        title: "Elf",
        description:
          "Jij bent een en al enthousiasme! Je haalt plezier uit de kleinste dingen en brengt graag wat extra vrolijkheid in het leven van anderen. Soms ben je misschien een beetje té enthousiast, maar eerlijk: de wereld kan wel wat meer van jouw kerstenergie gebruiken.",
      },
      {
        id: "love-actually",
        title: "Love Actually",
        description:
          "Jij bent een gevoelsmens met een groot hart. Je hecht waarde aan bijzondere momenten, vriendschappen en mensen om je heen. Je ziet schoonheid in kleine gebaren en gelooft dat liefde in allerlei vormen voorkomt. Stiekem ben jij best een romanticus.",
      },
      {
        id: "polar-express",
        title: "The Polar Express",
        description:
          "Jij hebt een flinke dosis fantasie en verwondering in je. Je blijft nieuwsgierig, houdt van bijzondere ervaringen en gelooft dat er altijd meer mogelijk is dan je op het eerste gezicht denkt. Verlies vooral nooit dat beetje magie in jezelf!",
      },
      {
        id: "nightmare",
        title: "The Nightmare Before Christmas",
        description:
          "Jij bent creatief, eigenzinnig en absoluut niet van de standaardaanpak. Een beetje mysterie, een donker randje en een flinke dosis fantasie passen helemaal bij jou. Je doet de dingen graag op je eigen manier en dat maakt je juist zo leuk.",
      },
    ];

    return `
      <div class="surprise-card surprise-card-20 movie-quiz-card">
        <div class="movie-quiz" data-answers="[]">
          <p class="movie-quiz-kicker">KERSTFILM QUIZ</p>
          <h2>Welke kerstfilm ben jij?</h2>
          <p class="movie-quiz-intro">
            Beantwoord 7 vragen en ontdek welke kerstfilm bij jou past!
          </p>

          <p class="movie-quiz-progress">Vraag 1 van 7</p>

          <div class="movie-quiz-questions">
            ${questions
              .map(
                (question, index) => `
              <section class="movie-quiz-question" data-index="${index}" ${index === 0 ? "" : "hidden"}>
                <h3>${question.question}</h3>
                <div class="movie-quiz-options">
                  ${question.options
                    .map(
                      (option) => `
                    <button
                      type="button"
                      class="movie-quiz-answer"
                      data-movie="${option.movie}"
                    >
                      ${option.text}
                    </button>
                  `,
                    )
                    .join("")}
                </div>
              </section>
            `,
              )
              .join("")}
          </div>

          <div class="movie-quiz-result" hidden>
            <p class="movie-quiz-result-label">JOUW KERSTFILM IS...</p>

            ${movies
              .map(
                (movie) => `
              <article class="movie-quiz-outcome" data-movie-result="${movie.id}" hidden>
                <h3>${movie.title}</h3>
                <p>${movie.description}</p>
              </article>
            `,
              )
              .join("")}

            <button type="button" class="movie-quiz-restart">
              Speel opnieuw ↻
            </button>
          </div>
        </div>
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

  const spotifyButton = target.closest<HTMLAnchorElement>(".spotify-button");

  if (spotifyButton) {
    const spotifyWindow = spotifyButton.closest(".window-10");

    if (!spotifyWindow?.classList.contains("open")) {
      event.preventDefault();
      return;
    }
  }

  // Kerstfilmquiz - antwoorden verwerken
  const movieAnswer = target.closest<HTMLButtonElement>(".movie-quiz-answer");

  if (movieAnswer) {
    const movieWindow = movieAnswer.closest(".window-20");

    if (!movieWindow?.classList.contains("open")) return;

    const quiz = movieWindow.querySelector<HTMLElement>(".movie-quiz");
    const question = movieAnswer.closest<HTMLElement>(".movie-quiz-question");

    if (!quiz || !question) return;

    const answers = JSON.parse(quiz.dataset.answers ?? "[]") as string[];
    answers.push(movieAnswer.dataset.movie ?? "");
    quiz.dataset.answers = JSON.stringify(answers);

    question.hidden = true;

    const progress = quiz.querySelector<HTMLElement>(".movie-quiz-progress");

    if (answers.length < 7) {
      const nextQuestion = quiz.querySelector<HTMLElement>(
        `.movie-quiz-question[data-index="${answers.length}"]`,
      );

      nextQuestion?.removeAttribute("hidden");

      if (progress) {
        progress.textContent = `Vraag ${answers.length + 1} van 7`;
      }
    } else {
      const scores: Record<string, number> = {};

      answers.forEach((movie) => {
        scores[movie] = (scores[movie] ?? 0) + 1;
      });

      const highestScore = Math.max(...Object.values(scores));
      const lastAnswer = answers[answers.length - 1];

      const winner =
        scores[lastAnswer] === highestScore
          ? lastAnswer
          : Object.keys(scores).find((movie) => scores[movie] === highestScore);

      quiz.querySelector(".movie-quiz-questions")?.setAttribute("hidden", "");

      const result = quiz.querySelector<HTMLElement>(".movie-quiz-result");
      const outcome = quiz.querySelector<HTMLElement>(
        `.movie-quiz-outcome[data-movie-result="${winner}"]`,
      );

      result?.removeAttribute("hidden");
      outcome?.removeAttribute("hidden");

      if (progress) {
        progress.textContent = "Jouw uitslag is binnen! ✨";
      }
    }

    return;
  }

  // Kerstfilmquiz - opnieuw spelen
  const movieRestart = target.closest<HTMLButtonElement>(".movie-quiz-restart");

  if (movieRestart) {
    const movieWindow = movieRestart.closest(".window-20");

    if (!movieWindow?.classList.contains("open")) return;

    const quiz = movieWindow.querySelector<HTMLElement>(".movie-quiz");
    if (!quiz) return;

    quiz.dataset.answers = "[]";

    quiz.querySelector(".movie-quiz-result")?.setAttribute("hidden", "");
    quiz.querySelector(".movie-quiz-questions")?.removeAttribute("hidden");

    quiz
      .querySelectorAll<HTMLElement>(".movie-quiz-outcome")
      .forEach((outcome) => {
        outcome.setAttribute("hidden", "");
      });

    quiz
      .querySelectorAll<HTMLElement>(".movie-quiz-question")
      .forEach((question) => {
        question.setAttribute("hidden", "");
      });

    quiz
      .querySelector('.movie-quiz-question[data-index="0"]')
      ?.removeAttribute("hidden");

    const progress = quiz.querySelector<HTMLElement>(".movie-quiz-progress");
    if (progress) progress.textContent = "Vraag 1 van 7";

    return;
  }

  // Kaart kiezen bij A Random Prophecy - dag 16
  const prophecyChoice = target.closest<HTMLButtonElement>(
    ".prophecy-card-choice",
  );

  if (prophecyChoice) {
    const prophecyWindow = prophecyChoice.closest(".window-16");

    if (!prophecyWindow?.classList.contains("open")) return;

    const choices = prophecyWindow.querySelector(".prophecy-choices");
    const result = prophecyWindow.querySelector(".prophecy-result");

    if (!choices || !result || choices.classList.contains("is-choosing")) {
      return;
    }

    choices.classList.add("is-choosing");
    prophecyChoice.classList.add("is-selected");

    prophecyWindow
      .querySelectorAll<HTMLButtonElement>(".prophecy-card-choice")
      .forEach((card) => {
        card.disabled = true;
      });

    window.setTimeout(() => {
      choices.setAttribute("hidden", "");
      result.removeAttribute("hidden");
    }, 700);

    return;
  }

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
