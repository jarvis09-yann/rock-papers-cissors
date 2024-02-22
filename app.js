const choices = ["Rock", "Paper", "Cissors"];

function getComputerChoice() {
  let randomNumber = Math.floor(Math.random() * 3);
  // Take a random number between 0 and 1 and multiply it by 3 and then round it
  return choices[randomNumber];
}

function getPlayerChoice() {
  let playerChoice = prompt("Rock, Paper or Cissors?");
  playerChoice =
    playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1).toLowerCase();
  // Capitalize the first letter, ugly but it works well
  if (!choices.includes(playerChoice)) {
    alert("Please choose Rock, Paper or Cissors");
    return getPlayerChoice();
    // If playerChoice not in choices, try again
  }
  return playerChoice;
}

function play() {
  let playerChoice = getPlayerChoice();
  let computerChoice = getComputerChoice();
  if (playerChoice === computerChoice) {
    console.log("It's a tie!");
  } // Ugly but i have no idea on how to do that more properly
  if (playerChoice === "Rock" && computerChoice === "Cissors") {
    console.log("You win! computer chose Cissors");
  }
  if (playerChoice === "Paper" && computerChoice === "Rock") {
    console.log("You win! Computer chose Rock");
  }
  if (playerChoice === "Cissors" && computerChoice === "Paper") {
    console.log("You win! Computer chose Paper");
  }
  if (playerChoice == "Rock" && computerChoice === "Paper") {
    console.log("You lose! Computer chose Paper");
  }
  if (playerChoice === "Paper" && computerChoice === "Cissors") {
    console.log("You lose! Computer chose Cissors");
  }
  if (playerChoice === "Cissors" && computerChoice === "Rock") {
    console.log("You lose! Computer chose Rock");
  }
}

function playGames() {
  for (let i = 0; i < 5; i++) {
    play();
  }
}
