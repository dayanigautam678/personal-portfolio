
let userScore = 0;
let computerScore = 0;

const choices = ["rock", "paper", "scissors"];

const userScoreDisplay = document.getElementById("userScore");
const computerScoreDisplay = document.getElementById("computerScore");
const userChoiceDisplay = document.getElementById("userChoice");
const computerChoiceDisplay = document.getElementById("computerChoice");
const resultDisplay = document.getElementById("result");
const messageDisplay = document.getElementById("message");

function playGame(userChoice) {
    const randomIndex = Math.floor(Math.random() * choices.length);
    const computerChoice = choices[randomIndex];

    userChoiceDisplay.textContent = "Your Choice: " + userChoice;
    computerChoiceDisplay.textContent = "Computer Choice: " + computerChoice;

    if (userChoice === computerChoice) {
        resultDisplay.textContent = "It's a Draw!";
        resultDisplay.style.color = "#e5a000";
        messageDisplay.textContent = "Both selected the same option!";

    } else if (
        (userChoice === "rock" && computerChoice === "scissors") ||
        (userChoice === "paper" && computerChoice === "rock") ||
        (userChoice === "scissors" && computerChoice === "paper")
    ) {
        userScore++;
        userScoreDisplay.textContent = userScore;

        resultDisplay.textContent = "You Win! ";
        resultDisplay.style.color = "green";
        messageDisplay.textContent = "Great move! You won this round.";

    } else {
        computerScore++;
        computerScoreDisplay.textContent = computerScore;

        resultDisplay.textContent = "You Lose!";
        resultDisplay.style.color = "red";
        messageDisplay.textContent = "Computer won this round. Try again!";
    }
}

document.querySelectorAll(".choice").forEach(function(button) {
    button.addEventListener("click", function() {
        const userChoice = button.getAttribute("data-choice");
        playGame(userChoice);
    });
});

document.getElementById("restartBtn").addEventListener("click", function() {
    userScore = 0;
    computerScore = 0;

    userScoreDisplay.textContent = 0;
    computerScoreDisplay.textContent = 0;

    userChoiceDisplay.textContent = "Your Choice: -";
    computerChoiceDisplay.textContent = "Computer Choice: -";

    resultDisplay.textContent = "Let's Play!";
    resultDisplay.style.color = "#5b5bd6";

    messageDisplay.textContent = "Select Rock, Paper, or Scissors.";
});
