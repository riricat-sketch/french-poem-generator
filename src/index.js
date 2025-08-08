document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const input = document.querySelector('input[type="text"]');
  const submitBtn = document.querySelector('input[type="submit"]');
  const poemContainer = document.getElementById("poem-output");
  const copyBtn = document.getElementById("copy-btn");

  const API_KEY = "ctec04f17ee45ebe9b5ffoa34af106fa";

  function typePoem(poem) {
    poemContainer.textContent = "";
    poemContainer.style.opacity = 0; // reset opacity for fade-in animation
    let index = 0;

    const interval = setInterval(() => {
      poemContainer.textContent += poem[index];
      index++;

      if (index >= poem.length) {
        clearInterval(interval);
        poemContainer.style.opacity = 1; // fade in complete

        // Show copy button
        copyBtn.hidden = false;
      }
    }, 40);
  }

  function setLoading(isLoading) {
    if (isLoading) {
      poemContainer.innerHTML =
        '✨ Génération du poème... <span class="loading-spinner"></span>';
      input.disabled = true;
      submitBtn.disabled = true;
      copyBtn.hidden = true;
    } else {
      input.disabled = false;
      submitBtn.disabled = false;
    }
  }

  async function fetchPoem(prompt) {
    setLoading(true);

    const apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(
      prompt
    )}&context=${encodeURIComponent(
      "Please write a short original poem in French based on the prompt."
    )}&key=${API_KEY}`;

    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();

      if (data && data.answer) {
        typePoem(data.answer);
      } else {
        poemContainer.textContent = "❌ No poem returned from the AI.";
        copyBtn.hidden = true;
      }
    } catch (error) {
      console.error("Error fetching poem:", error);
      poemContainer.textContent =
        "⚠️ Une erreur est survenue. Veuillez réessayer.";
      copyBtn.hidden = true;
    } finally {
      setLoading(false);
    }
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const prompt = input.value.trim();

    if (prompt === "") return;

    fetchPoem(prompt);
  });

  // Copy poem to clipboard
  copyBtn.addEventListener("click", () => {
    const text = poemContainer.textContent;
    if (!text || text === "Your poem will appear here") return;

    navigator.clipboard.writeText(text).then(() => {
      copyBtn.textContent = "✅ Copied!";
      setTimeout(() => (copyBtn.textContent = "📋 Copy Poem"), 1500);
    });
  });
});
