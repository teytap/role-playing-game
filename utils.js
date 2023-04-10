function getDiceRollArray(diceCount) {
  return new Array(diceCount)
    .fill(0)
    .map(() => Math.floor(Math.random() * 6 + 1));
}

function getDicePlaceholderHtml(diceCount) {
  return new Array(diceCount)
    .fill(0)
    .map(() => `<div class="placeholder-dice"></div>`)
    .join(" ");
}

const getPercentage = (remainingHealth, maxHealth) =>
  (100 * remainingHealth) / maxHealth;
export { getDiceRollArray, getDicePlaceholderHtml, getPercentage };
