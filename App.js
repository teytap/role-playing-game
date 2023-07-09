import characterData from "./data.js";
import Character from "./Character.js";

let monstersArray = ["orc", "demon", "goblin"];
let isWaiting = false;

const wizard = new Character(characterData.hero);

function getNewMonster() {
  const nextMonsterData = characterData[monstersArray.shift()];
  return nextMonsterData ? new Character(nextMonsterData) : {};
}

function attack() {
  if (!isWaiting) {
    wizard.setDiceHtml();
    monster.setDiceHtml();
    wizard.takeDamage(monster.currentDiceScore);
    monster.takeDamage(wizard.currentDiceScore);
    render();
    if (wizard.dead) {
      setTimeout(() => endGame(), 2000);
    } else if (monster.dead) {
      if (monstersArray.length > 0) {
        isWaiting = true;
        document.getElementById("monster").style.animation = "fadeOut";

        setTimeout(() => {
          monster = getNewMonster();
          render();
          isWaiting = false;
        }, 1000);
      } else {
        setTimeout(() => endGame(), 1500);
      }
    }
  }
}

function endGame() {
  isWaiting = true;
  let emoji = wizard.health > monster.health ? "🔮" : "☠️";
  let message =
    wizard.health < monster.health
      ? "The monsters Victorious"
      : wizard.health > monster.health
      ? "The Wizard Wins"
      : "No victors - all creatures are dead";

  document.body.innerHTML = `<div class="end-game">
      <h2>Game Over</h2>
      <h3>${message}</h3>
      <p class="end-emoji">${emoji}</p>
      </div>
      `;

  setTimeout(() => {
    location.reload();
  }, 3000);
}

function render() {
  document.getElementById("hero").innerHTML = wizard.getCharacterHtml();
  document.getElementById("monster").style.animation =
    "1.5s ease-out 0s 1 slideInFromRight";
  document.getElementById("monster").innerHTML = monster.getCharacterHtml();
}

let monster = getNewMonster();
const attackBtn = document.getElementById("attack-button");
const playBtn = document.getElementById("play-button");
attackBtn.addEventListener("click", attack);
playBtn.addEventListener("click", render);

render();
