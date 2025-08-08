document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const input = document.querySelector('input[type="text"]');
  const poemContainer = document.getElementById("poem-output");

  function typePoem(poem) {
    poemContainer.textContent = "";
    poemContainer.classList.remove("typewriter");
    let index = 0;

    const interval = setInterval(() => {
      poemContainer.textContent += poem[index];
      index++;

      if (index >= poem.length) {
        clearInterval(interval);
      }
    }, 40);
  }

  function generatePoem(prompt) {
    //Replace this with real API call later!
    const poems = {
      amour: `Dans le silence doux de l’amour\nUn souffle chaud, un rêve court\nTon regard brille, éclat d’étoile\nMon cœur chavire, sans boussole.`,
      nuit: `Sous le voile noir de la nuit\nChantent les ombres, s'enfuit l'ennui\nLa lune danse entre les branches\nEt l’âme se perd, douce revanche.`,
      fleur: `Petite fleur au matin clair\nTon parfum flotte dans les airs\nChaque pétale est un secret\nUn doux mystère à jamais discret.`,
    };

    const lowerPrompt = prompt.toLowerCase();

    return (
      poems[lowerPrompt] ||
      `Voici un poème sur "${prompt}"...\n\nSous les mots naît un doux frisson\nInspiration et passion fusionnent\nL’IA rêve et t’offre ces vers\nNés d’un souffle imaginaire.`
    );
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const prompt = input.value.trim();

    if (prompt === "") return;

    // Simulate loading
    poemContainer.textContent = "✨ Génération du poème... ✨";
    poemContainer.classList.remove("typewriter");

    setTimeout(() => {
      const poem = generatePoem(prompt);
      typePoem(poem);
    }, 1000);
  });
});
