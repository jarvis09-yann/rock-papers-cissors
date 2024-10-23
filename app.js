const choices = ["rock", "paper", "scissors"];
const choicesEmojis = ["🪨", "📜", "🗡️"];
const playerEmoji = document.querySelector("#player-emoji");
const computerEmoji = document.querySelector("#computer-emoji");
const choicesContainer = document.querySelector(".rps-container");
const mainHeading = document.querySelector("h1");
const subHeading = document.querySelector("#sub-heading");

const gameSettings = document.querySelectorAll(".game-btn");
const gameSettingsInput = document.querySelector("#custom-games");
const currentGameType = document.querySelector("#current-game-type");

const closeButton = document.querySelector("#close-button");

let currentGame = {
  maxRounds: 1,
  wins: 0,
  losses: 0,
  draws: 0,
};

let totalGames = {
  wins: 0,
  losses: 0,
  draws: 0,
};

function updateSettings() {
  document.querySelector("#wins").textContent = currentGame.wins;
  document.querySelector("#losses").textContent = currentGame.losses;
  document.querySelector("#draws").textContent = currentGame.draws;

  document.querySelector("#future-game-type").textContent =
    currentGame.maxRounds;

  document.querySelector("#rounds-remaining").textContent =
    currentGame.wins + currentGame.losses + currentGame.draws;

  document.querySelector("#wins-total").textContent = totalGames.wins;
  document.querySelector("#losses-total").textContent = totalGames.losses;
  document.querySelector("#draws-total").textContent = totalGames.draws;
  if (totalGames.wins + totalGames.losses === 0) {
    document.querySelector("#win-rate").textContent = 0;
    return;
  }
  document.querySelector("#win-rate").textContent = Math.round(
    (totalGames.wins / (totalGames.wins + totalGames.losses)) * 100
  );
}

function getComputerChoice() {
  let randomNumber = Math.floor(Math.random() * 3);
  return choices[randomNumber];
}

choicesContainer.addEventListener("click", (e) => {
  let target = e.target;
  let computerChoice = getComputerChoice();
  updateChoices(target.id, computerChoice);

  switch (target.id) {
    case "rock":
      play("rock", computerChoice);
      break;
    case "paper":
      play("paper", computerChoice);
      break;
    case "scissors":
      play("scissors", computerChoice);
      break;
  }
});

closeButton.addEventListener("click", () => {
  document.querySelector("footer").style.display = "none";
  document.querySelector(".game-container").style.height = "100vh";
});

gameSettings.forEach((button) => {
  button.addEventListener("click", (e) => {
    const buttonId = e.target.id;
    handleGameSettings(buttonId);
  });
});

function updateChoices(playerChoice, computerChoice) {
  if (playerChoice === "") {
    return;
  }
  playerEmoji.textContent = choicesEmojis[choices.indexOf(playerChoice)];
  computerEmoji.textContent = choicesEmojis[choices.indexOf(computerChoice)];
}

function play(playerChoice, computerChoice) {
  if (playerChoice === "rock" && computerChoice === "scissors") {
    win();
    return;
  }
  if (playerChoice === "paper" && computerChoice === "rock") {
    win();
    return;
  }
  if (playerChoice === "scissors" && computerChoice === "paper") {
    win();
    return;
  }

  if (playerChoice === computerChoice) {
    draw();
    return;
  }
  lose();
}

function win() {
  mainHeading.textContent = "Thou hast triumphed";
  currentGame.wins++;
  totalGames.wins++;
  updateSettings();
  checkIfGameOver();
}

function lose() {
  mainHeading.textContent = "Thou hast been slain";
  currentGame.losses++;
  totalGames.losses++;
  updateSettings();
  checkIfGameOver();
}

function draw() {
  mainHeading.textContent = "Thou hast drawn";
  currentGame.draws++;
  totalGames.draws++;
  updateSettings();
  checkIfGameOver();
}

function checkIfGameOver() {
  if (currentGame.maxRounds === 1) {
    return;
  }
  if (
    currentGame.maxRounds <=
    currentGame.wins + currentGame.losses + currentGame.draws
  ) {
    if (currentGame.wins > currentGame.losses) {
      resetGame();
      subHeading.textContent = "Thou hast triumphed the war";
      return;
    }
    if (currentGame.wins < currentGame.losses) {
      resetGame();
      subHeading.textContent = "Thou hast lost the war";
      return;
    }
    subHeading.textContent = "Thou hast drawn the war";
    return;
  }
}

function handleGameSettings(settingID) {
  switch (settingID) {
    case "one-game":
      currentGame.maxRounds = 1;
      updateSettings();
      break;

    case "five-games":
      currentGame.maxRounds = 5;
      updateSettings();
      break;

    case "custom-games-btn":
      if (gameSettingsInput.value != "") {
        currentGame.maxRounds = gameSettingsInput.value;
        updateSettings();
        startGame(currentGame.maxRounds);
      }
      break;

    case "reset-game":
      startGame(currentGame.maxRounds);
      break;
    case "reset-stats":
      resetDisplay();
      resetStats();
      break;
  }
}

function resetDisplay() {
  mainHeading.textContent = "Thou shall choose: Stone, Parchement, Dagger?";

  playerEmoji.textContent = "❔";
  computerEmoji.textContent = "❔";
}

function startGame(rounds) {
  resetGame();
  document.querySelector("#current-game-type").textContent = rounds;
}

function resetGame() {
  resetDisplay();
  currentGame = {
    maxRounds: currentGame.maxRounds,
    wins: 0,
    losses: 0,
    draws: 0,
  };
  updateSettings();
}

function resetStats() {
  resetGame();
  totalGames = {
    wins: 0,
    losses: 0,
    draws: 0,
  };
  updateSettings();
}
