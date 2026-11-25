import { VALID_WORDS } from "./wordle-words";
const SECRET_WORD = "ELVES";
const MAX_GUESSES = 6;

export function createWordleHTML(): string {
  return `
    <div class="wordle" id="wordle">

      <button class="wordle-close" type="button" aria-label="Sluiten">×</button>

      <h2>CHRISTMAS WORDLE</h2>
      <p class="wordle-instructions">
  Zoek het engelse woord in 6 beurten (niet alle woorden paktie dus dan moetje even een andere verzinnen
  Thema is KERST!<br>
  Groen = juiste plek, Geel is onjuiste plek, Grijs is letter zit er niet in.
</p>

      <div class="wordle-grid" id="wordle-grid"></div>

      <p class="wordle-message" id="wordle-message">
        6 guesses · English words only
      </p>

      <div class="wordle-keyboard" id="wordle-keyboard">
        ${["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"]
          .map(
            (row, index) => `
          <div class="wordle-key-row">
            ${index === 2 ? '<button data-key="ENTER" class="wordle-key wordle-wide-key">ENTER</button>' : ""}
            ${[...row]
              .map(
                (letter) => `
              <button data-key="${letter}" class="wordle-key">${letter}</button>
            `,
              )
              .join("")}
            ${index === 2 ? '<button data-key="BACKSPACE" class="wordle-key wordle-wide-key">⌫</button>' : ""}
          </div>
        `,
          )
          .join("")}
      </div>
    </div>
  `;
}

export function setupWordle(): void {
  const root = document.querySelector<HTMLDivElement>("#wordle");
  if (!root) return;

  const grid = root.querySelector<HTMLDivElement>("#wordle-grid")!;
  const message = root.querySelector<HTMLParagraphElement>("#wordle-message")!;
  const keyboard = root.querySelector<HTMLDivElement>("#wordle-keyboard")!;
  const closeButton = root.querySelector<HTMLButtonElement>(".wordle-close");

  // Kruisje sluit het volledige raampje van dag 7
  closeButton?.addEventListener("click", (event) => {
    event.stopPropagation();
    root.closest(".window-area")?.classList.remove("open");
  });

  let guesses: string[] = [];
  let currentGuess = "";
  let finished = false;

  function render(): void {
    grid.innerHTML = "";

    for (let row = 0; row < MAX_GUESSES; row++) {
      const guess =
        guesses[row] ?? (row === guesses.length ? currentGuess : "");
      const result = guesses[row] ? getResult(guesses[row]) : [];

      for (let col = 0; col < 5; col++) {
        const tile = document.createElement("div");
        tile.className = "wordle-tile";

        if (result[col]) tile.classList.add(result[col]);
        tile.textContent = guess[col] ?? "";

        grid.appendChild(tile);
      }
    }
  }

  function getResult(guess: string): string[] {
    const result = Array(5).fill("absent");
    const remaining = SECRET_WORD.split("");

    for (let i = 0; i < 5; i++) {
      if (guess[i] === SECRET_WORD[i]) {
        result[i] = "correct";
        remaining[i] = "";
      }
    }

    for (let i = 0; i < 5; i++) {
      if (result[i] === "correct") continue;

      const found = remaining.indexOf(guess[i]);

      if (found !== -1) {
        result[i] = "present";
        remaining[found] = "";
      }
    }

    return result;
  }

  function updateKeyboard(guess: string): void {
    const result = getResult(guess);

    [...guess].forEach((letter, index) => {
      const key = keyboard.querySelector<HTMLButtonElement>(
        `[data-key="${letter}"]`,
      );

      if (!key) return;

      const newState = result[index];
      const oldState = key.dataset.state;

      const priority = { absent: 1, present: 2, correct: 3 };

      if (
        !oldState ||
        priority[newState as keyof typeof priority] >
          priority[oldState as keyof typeof priority]
      ) {
        key.dataset.state = newState;
        key.classList.remove("correct", "present", "absent");
        key.classList.add(newState);
      }
    });
  }

  function submitGuess(): void {
    if (currentGuess.length !== 5 || finished) return;

    if (!VALID_WORDS.has(currentGuess)) {
      message.textContent = "Please enter a valid English word!";
      return;
    }

    guesses.push(currentGuess);
    updateKeyboard(currentGuess);
    const won = currentGuess === SECRET_WORD;

    currentGuess = "";
    render();

    if (won) {
      finished = true;
      message.textContent = "Wonderful! You found the word! ♡";
    } else if (guesses.length === MAX_GUESSES) {
      finished = true;
      message.textContent = "The word was ELVES. Merry Christmas! ♡";
    } else {
      message.textContent = `${MAX_GUESSES - guesses.length} guesses left`;
    }
  }

  function pressKey(key: string): void {
    if (finished) return;

    if (key === "ENTER") {
      submitGuess();
    } else if (key === "BACKSPACE") {
      currentGuess = currentGuess.slice(0, -1);
      message.textContent = "6 guesses · English words only";
      render();
    } else if (/^[A-Z]$/.test(key) && currentGuess.length < 5) {
      currentGuess += key;
      message.textContent = "6 guesses · English words only";
      render();
    }
  }

  keyboard.addEventListener("click", (event) => {
    const target = event.target;

    if (!(target instanceof Element)) return;

    const button = target.closest<HTMLButtonElement>("[data-key]");
    if (button) pressKey(button.dataset.key ?? "");
  });

  root.addEventListener("keydown", (event) => {
    if (event.key === "Enter") pressKey("ENTER");
    else if (event.key === "Backspace") pressKey("BACKSPACE");
    else if (/^[a-zA-Z]$/.test(event.key)) pressKey(event.key.toUpperCase());
  });

  root.tabIndex = 0;
  render();
}
