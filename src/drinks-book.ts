const recipes = [
  {
    title: "Homemade Hot Chocolate",
    subtitle: "Een warme chocoladeknuffel",
    emoji: "☕",
    servings: "1 mok · 10 minuten",
    alcohol: false,
    ingredients: [
      "250 ml melk",
      "1 el cacaopoeder",
      "1–2 el lichte basterdsuiker",
      "25 g pure of gewone chocolade, fijngehakt",
      "1 el slagroom",
      "Extra chocolade om te raspen",
    ],
    method: [
      "Verwarm de melk, cacao, suiker en chocolade in een pannetje op middelhoog vuur.",
      "Blijf verwarmen tot de chocolade gesmolten is en de melk goed heet is. Klop alles even door.",
      "Schenk in een mok, voeg de slagroom toe en rasp er wat chocolade overheen.",
    ],
    source: "https://www.bbcgoodfood.com/recipes/homemade-hot-chocolate",
  },
  {
    title: "Christmas Margarita",
    subtitle: "Een feestelijk citruscocktailtje",
    emoji: "🍊",
    servings: "2 glazen · 10 minuten",
    alcohol: true,
    ingredients: [
      "1 tl ahornsiroop voor de glasrand",
      "½ el fijne rietsuiker",
      "Een snufje zeezout",
      "50 ml tequila reposado",
      "20 ml triple sec",
      "20 ml ahornsiroop",
      "25 ml limoensap",
      "50 ml vers mandarijnsap",
      "IJsblokjes",
    ],
    method: [
      "Smeer de randen van twee glazen in met een beetje ahornsiroop.",
      "Meng de suiker met een snufje zeezout op een schoteltje en dip de glasranden erin.",
      "Doe tequila, triple sec, ahornsiroop, limoensap en mandarijnsap in een cocktailshaker.",
      "Voeg ijs toe en shake tot alles goed koud is.",
      "Zeef de cocktail in de glazen en voeg eventueel vers ijs toe.",
    ],
    source: "https://www.bbcgoodfood.com/recipes/christmas-margarita",
  },
  {
    title: "Christmas Glühwein",
    subtitle: "De geur van kerst in een glas",
    emoji: "🍷",
    servings: "8–10 glazen · 20 minuten",
    alcohol: true,
    ingredients: [
      "1 sinaasappel, in plakjes",
      "1 fles rode wijn",
      "200 g fijne kristalsuiker",
      "5 kruidnagels",
      "1 kaneelstokje",
      "2 steranijsjes",
      "3 plakjes verse, geschilde gember",
      "150 ml brandy (of rum, amaretto of schnapps)",
    ],
    method: [
      "Doe de sinaasappel, rode wijn, suiker, kruidnagels, kaneel, steranijs en gember in een grote pan.",
      "Verwarm het geheel zachtjes gedurende 10–15 minuten. Laat het absoluut niet koken.",
      "Voeg de brandy toe.",
      "Schenk warm in glazen en geniet van de kerstsfeer!",
    ],
    source: "https://www.bbcgoodfood.com/recipes/gluhwein",
  },
  {
    title: "Jingle Fizz",
    subtitle: "Een sprankelend kerstfeestje",
    emoji: "✨",
    servings: "1 glas · 40 minuten",
    alcohol: true,
    ingredients: [
      "120 ml water",
      "150 g suiker, verdeeld",
      "Ongeveer 30 g verse of diepvriescranberry's",
      "30 ml eiwit of kikkererwtenvocht (aquafaba)",
      "120 ml cranberrysap",
      "90 ml gin (of meer naar smaak)",
      "Een scheutje limoensap",
      "IJsblokjes",
      "60 ml bruiswater",
    ],
    method: [
      "Breng het water met 100 g suiker aan de kook en roer tot de suiker is opgelost.",
      "Haal van het vuur en roer de cranberry's erdoor. Schep ze na het omhullen op een rooster en laat 20–30 minuten drogen.",
      "Rol de cranberry's door de overgebleven suiker.",
      "Doe eiwit of aquafaba, cranberrysap, gin, limoensap en ongeveer 60 ml van de cranberrysiroop in een shaker. Shake 10–15 seconden.",
      "Voeg ijs toe en shake nogmaals tot de cocktail goed koud is.",
      "Zeef in een glas met ijs, voeg bruiswater toe en garneer met de gesuikerde cranberry's.",
    ],
    source:
      "https://www.delish.com/cooking/recipe-ideas/a69597223/jingle-fizz-recipe/",
  },
];

type Recipe = (typeof recipes)[number];

type BookPage =
  | { type: "cover" }
  | { type: "recipe"; recipe: Recipe }
  | { type: "end" };

const pages: BookPage[] = [
  { type: "cover" },
  ...recipes.map((recipe): BookPage => ({ type: "recipe", recipe })),
  { type: "end" },
];

export function createDrinkBookHTML(): string {
  return `
    <div class="drink-book" id="drink-book">
      <div class="drink-book-top">
        <span>✦ A LITTLE CHRISTMAS MAGIC ✦</span>
        <button class="drink-book-close" type="button" aria-label="Sluiten">×</button>
      </div>

      <div class="drink-book-page" id="drink-book-page"></div>

      <div class="drink-book-navigation">
        <button type="button" id="drink-book-prev">← Vorige</button>
        <span id="drink-book-counter">1 / 6</span>
        <button type="button" id="drink-book-next">Volgende →</button>
      </div>
    </div>
  `;
}

export function setupDrinkBook(): void {
  const book = document.querySelector<HTMLDivElement>("#drink-book");
  if (!book) return;

  const pageElement = book.querySelector<HTMLDivElement>("#drink-book-page")!;
  const counter = book.querySelector<HTMLSpanElement>("#drink-book-counter")!;
  const previous = book.querySelector<HTMLButtonElement>("#drink-book-prev")!;
  const next = book.querySelector<HTMLButtonElement>("#drink-book-next")!;
  const close = book.querySelector<HTMLButtonElement>(".drink-book-close")!;

  let currentPage = 0;

  function renderPage(): void {
    const page = pages[currentPage];

    if (page.type === "cover") {
      pageElement.innerHTML = `
        <div class="drink-cover">
          <div class="drink-cover-decoration">✦ ❄ ✦</div>
          <p class="drink-cover-small">A COLLECTION OF</p>
          <h2>Our Little<br>Christmas<br>Drinks Book</h2>
          <div class="drink-cover-decoration">🍊 🍷 ☕</div>
          <p class="drink-cover-note">Warm drinks, festive sips & a little magic</p>
          <p class="drink-cover-made">Made with love ♡</p>
        </div>
      `;
    } else if (page.type === "end") {
      pageElement.innerHTML = `
        <div class="drink-end">
          <div class="drink-cover-decoration">✦ ❄ ✦</div>
          <h2>Cheers to Christmas!</h2>
          <p>Op warme momenten, gezellige avonden en mooie herinneringen.</p>
          <p>Maak er iets moois van! ♡</p>
          <div class="drink-cover-decoration">🥂</div>
          <p class="drink-cover-made">Made with love by Rie</p>
        </div>
      `;
    } else {
      const recipe = page.recipe;

      pageElement.innerHTML = `
        <div class="drink-recipe">
          <div class="drink-recipe-emoji">${recipe.emoji}</div>
          <p class="drink-recipe-number">CHRISTMAS DRINK NO. ${currentPage}</p>
          <h2>${recipe.title}</h2>
          <p class="drink-recipe-subtitle">${recipe.subtitle}</p>

          <div class="drink-recipe-meta">
            ${recipe.servings}
            ${recipe.alcohol ? " · Bevat alcohol" : " · Alcoholvrij"}
          </div>

          <h3>Ingrediënten</h3>
          <ul>
            ${recipe.ingredients.map((item) => `<li>${item}</li>`).join("")}
          </ul>

          <h3>Bereiding</h3>
          <ol>
            ${recipe.method.map((item) => `<li>${item}</li>`).join("")}
          </ol>

          <a class="drink-recipe-source"
             href="${recipe.source}"
             target="_blank"
             rel="noopener noreferrer">
            Bekijk het originele recept ↗
          </a>
        </div>
      `;
    }

    counter.textContent = `${currentPage + 1} / ${pages.length}`;
    previous.disabled = currentPage === 0;
    next.disabled = currentPage === pages.length - 1;
  }

  previous.addEventListener("click", () => {
    if (currentPage > 0) {
      currentPage--;
      renderPage();
    }
  });

  next.addEventListener("click", () => {
    if (currentPage < pages.length - 1) {
      currentPage++;
      renderPage();
    }
  });

  close.addEventListener("click", () => {
    const area = book.closest(".window-area");
    area?.classList.remove("open");
  });

  renderPage();
}
