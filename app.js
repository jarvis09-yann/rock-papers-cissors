const choices = ["rock", "paper", "scissors"];
const choicesEmojis = ["🪨", "📜", "🗡️"];
const playerEmoji = document.querySelector("#player-emoji");
const computerEmoji = document.querySelector("#computer-emoji");
const choicesContainer = document.querySelector(".rps-container");
const mainHeading = document.querySelector("h1");

const gameSettings = document.querySelectorAll(".game-btn");
const gameSettingsInput = document.querySelector("#custom-games");
const currentGameType = document.querySelectorAll(".current-game-type");
const remainingRounds = document.querySelector("#rounds-remaining");

let totalRounds = 0;
let maxRounds = 1;

function getComputerChoice() {
  return choices[Math.floor(Math.random() * 3)];
}

function updateChoices(playerChoice, computerChoice) {
  playerEmoji.textContent = choicesEmojis[choices.indexOf(playerChoice)];
  computerEmoji.textContent = choicesEmojis[choices.indexOf(computerChoice)];
}

function startGame(rounds) {
  maxRounds = rounds;
  totalRounds = 0;
  remainingRounds.textContent = maxRounds;
  resetDisplay();
}

function play(playerChoice, computerChoice) {
  if (totalRounds >= maxRounds) {
    endGame();
    return;
  }

  totalRounds++;
  remainingRounds.textContent = maxRounds - totalRounds;

  if (playerChoice === computerChoice) {
    draw();
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    win();
  } else {
    lose();
  }
}

function win() {
  mainHeading.textContent = "Thou hast triumphed";
  incrementStat("#wins");
}

function lose() {
  mainHeading.textContent = "Thou hast been slain";
  incrementStat("#losses");
}

function draw() {
  mainHeading.textContent = "Thou hast drawn";
  incrementStat("#draws");
}

function incrementStat(selector) {
  const element = document.querySelector(selector);
  element.textContent = parseInt(element.textContent) + 1;
}

function handleGameSettings(settingID) {
  switch (settingID) {
    case "one-game":
      startGame(1);
      break;
    case "five-games":
      startGame(5);
      break;
    case "custom-games-btn":
      if (gameSettingsInput.value) {
        startGame(parseInt(gameSettingsInput.value));
      }
      break;
    case "reset-game":
      resetGame();
      break;
    case "reset-stats":
      resetStats();
      break;
  }
}

function resetDisplay() {
  mainHeading.textContent = "Thou shall choose: Stone, Parchement, Dagger?";
  playerEmoji.textContent = "❔";
  computerEmoji.textContent = "❔";
}

function endGame() {
  const wins = parseInt(document.querySelector("#wins").textContent);
  const losses = parseInt(document.querySelector("#losses").textContent);

  if (wins < losses) {
    mainHeading.textContent = "Thou hast lost the war";
  } else if (wins > losses) {
    mainHeading.textContent = "Thou hast triumphed the war";
  } else {
    mainHeading.textContent = "Thou hast drawn the war";
  }

  resetGame();

  // Show message for 3 seconds then reset display
  setTimeout(resetDisplay, 3000);
}

function resetGame() {
  resetDisplay();
  document.querySelector("#wins").textContent = "0";
  document.querySelector("#losses").textContent = "0";
  document.querySelector("#draws").textContent = "0";
  remainingRounds.textContent = "0";
  totalRounds = 0;
  maxRounds = 1;
}

function resetStats() {
  resetGame();
  document.querySelector("#wins-total").textContent = "0";
  document.querySelector("#losses-total").textContent = "0";
  document.querySelector("#draws-total").textContent = "0";
}

document.addEventListener("DOMContentLoaded", () => {
  resetDisplay();
});

choicesContainer.addEventListener("click", (e) => {
  let target = e.target;
  if (!choices.includes(target.id)) return;

  let computerChoice = getComputerChoice();
  updateChoices(target.id, computerChoice);
  play(target.id, computerChoice);
});

gameSettings.forEach((button) => {
  button.addEventListener("click", (e) => {
    handleGameSettings(e.target.id);
  });
});
