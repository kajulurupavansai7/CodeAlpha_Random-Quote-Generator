const quoteText = document.getElementById("quoteText");
const quoteAuthor = document.getElementById("quoteAuthor");

const newQuoteBtn = document.getElementById("newQuoteBtn");
const copyBtn = document.getElementById("copyBtn");
const shareBtn = document.getElementById("shareBtn");
const darkModeBtn = document.getElementById("darkModeBtn");

const quoteCounter = document.getElementById("quoteCounter");

let lastQuoteIndex = -1;

// Load counter
let viewedQuotes =
  parseInt(localStorage.getItem("quoteCounter")) || 0;

quoteCounter.textContent = viewedQuotes;

// Generate Quote
function generateQuote() {

  let randomIndex;

  do {
    randomIndex = Math.floor(Math.random() * quotes.length);
  } while (
    quotes.length > 1 &&
    randomIndex === lastQuoteIndex
  );

  lastQuoteIndex = randomIndex;

  const quote = quotes[randomIndex];

  quoteText.textContent = `"${quote.text}"`;
  quoteAuthor.textContent = `- ${quote.author}`;

  viewedQuotes++;

  quoteCounter.textContent = viewedQuotes;

  localStorage.setItem(
    "quoteCounter",
    viewedQuotes
  );
}

// New Quote
newQuoteBtn.addEventListener(
  "click",
  generateQuote
);

// Copy Quote
copyBtn.addEventListener("click", async () => {

  const text =
    `${quoteText.textContent} ${quoteAuthor.textContent}`;

  try {

    await navigator.clipboard.writeText(text);

    const oldText = copyBtn.textContent;

    copyBtn.textContent = "✅ Copied";

    setTimeout(() => {
      copyBtn.textContent = oldText;
    }, 1500);

  } catch (err) {

    alert("Unable to copy quote.");
  }

});

// Share Quote
shareBtn.addEventListener("click", async () => {

  const text =
    `${quoteText.textContent} ${quoteAuthor.textContent}`;

  if (navigator.share) {

    try {

      await navigator.share({
        title: "Random Quote",
        text
      });

    } catch (err) {}

  } else {

    try {

      await navigator.clipboard.writeText(text);

      alert(
        "Sharing not supported. Quote copied to clipboard."
      );

    } catch (err) {

      alert("Unable to share quote.");

    }

  }

});

// Dark Mode Toggle
darkModeBtn.addEventListener("click", () => {

  document.body.classList.toggle("dark-mode");

  const isDark =
    document.body.classList.contains("dark-mode");

  localStorage.setItem(
    "quoteDarkMode",
    isDark
  );

});

// Load Dark Mode
if (
  localStorage.getItem("quoteDarkMode")
  === "true"
) {
  document.body.classList.add("dark-mode");
}

// Generate first quote automatically
generateQuote();