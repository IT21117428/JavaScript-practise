let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElement();

function pickComputerMove() {
  const randomValue = Math.random();

  let computerMove = "";

  if (randomValue >= 0 && randomValue < 1 / 3) {
    computerMove = "Rock";
  } else if (randomValue >= 1 / 3 && randomValue < 2 / 3) {
    computerMove = "Paper";
  } else if (randomValue >= 2 / 3 && randomValue < 1) {
    computerMove = "Scissors";
  }
  return computerMove;
}

let isAutoPlay = false;
let intervalId;

function autoPlay() {
  if (!isAutoPlay) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlay = true;

    document.querySelector(".auto-play-button").innerHTML = "Stop playing";
  } else {
    clearInterval(intervalId);
    isAutoPlay = false;
    document.querySelector(".auto-play-button").innerHTML = "Auto play";
  }
}

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem("score");
  updateScoreElement();
}

function showResetConformation() {
  document.querySelector(".js-reset-conformation").innerHTML = `
        Are you sure you want to reset the score?
        <button class="js-reset-conformation-yes">Yes</button>
        <button class="js-reset-conformation-no">No</button>
    `;

  document
    .querySelector(".js-reset-conformation-yes")
    .addEventListener("click", () => {
      resetScore();
      hideResetConformation();
    });

  document
    .querySelector(".js-reset-conformation-no")
    .addEventListener("click", () => {
      hideResetConformation();
    });
}

function hideResetConformation() {
  document.querySelector(".js-reset-conformation").innerHTML = " ";
}

document.querySelector(".js-rock-button").addEventListener("click", () => {
  playGame("Rock");
});

document.querySelector(".js-paper-button").addEventListener("click", () => {
  playGame("Paper");
});

document.querySelector(".js-scissors-button").addEventListener("click", () => {
  playGame("Scissors");
});

document.querySelector(".auto-play-button").addEventListener("click", () => {
  autoPlay();
});

document.querySelector(".reset-score-button").addEventListener("click", () => {
  showResetConformation();
});

document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    playGame("Rock");
  } else if (event.key === "p") {
    playGame("Paper");
  } else if (event.key === "s") {
    playGame("Scissors");
  } else if (event.key === "a") {
    autoPlay();
  } else if (event.key === "Backspace") {
    showResetConformation();
  }
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = "";

  if (playerMove === "Scissors") {
    if (computerMove === "Rock") {
      result = "You lost";
    } else if (computerMove === "Paper") {
      result = "You win";
    } else if (computerMove === "Scissors") {
      result = "Tie";
    }
  } else if (playerMove === "Paper") {
    if (computerMove === "Rock") {
      result = "You win";
    } else if (computerMove === "Paper") {
      result = "Tie";
    } else if (computerMove === "Scissors") {
      result = "You lost";
    }
  } else if (playerMove === "Rock") {
    if (computerMove === "Rock") {
      result = "Tie";
    } else if (computerMove === "Paper") {
      result = "You lost";
    } else if (computerMove === "Scissors") {
      result = "You win";
    }
  }

  if (result === "You win") {
    score.wins += 1;
  } else if (result === "You lost") {
    score.losses += 1;
  } else if (result === "Tie") {
    score.ties += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));

  updateScoreElement();

  document.querySelector(".js-result").innerHTML = result;
  document.querySelector(
    ".js-moves"
  ).innerHTML = `You <img src="../Images/${playerMove}-emoji.png" class="move-icon" />
    <img src="../Images/${computerMove}-emoji.png" class="move-icon" /> Computer`;
}

function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}
