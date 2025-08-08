document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const input = document.querySelector('input[type="text"]');
  const poemContainer = document.getElementById("poem-output");

  const API_KEY = "ctec04f17ee45ebe9b5ffoa34af106fa";

  // Typewriter effect
  function typePoem(poem) {
    poemContainer.textContent = "";
    let index = 0;

    const interval = setInterval(() => {
      poemContainer.textContent += poem[index];
      index++;

      if (index >= poem.length) {
        clearInterval(interval);
      }
    }, 40); // adjust speed if needed
  }

  // Fetch poem from SheCodes AI API
  async function fetchPoem(prompt) {
    const apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(
      prompt
    )}&context=${encodeURIComponent(
      "Please write a short original poem in French based on the prompt."
    )}&key=${API_KEY}`;

    poemContainer.textContent = "✨ Génération du poème... ✨";

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
      }
    } catch (error) {
      console.error("Error fetching poem:", error);
      poemContainer.textContent =
        "⚠️ Une erreur est survenue. Veuillez réessayer.";
    }
  }

  // Handle form submission
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const prompt = input.value.trim();

    if (prompt === "") return;

    fetchPoem(prompt);
  });
});
