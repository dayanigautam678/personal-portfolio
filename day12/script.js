let secretNumber;
let attemptsLeft;
let score = 0;
let gameOver = false;

const guessInput = document.getElementById("guessInput");
const checkBtn = document.getElementById("checkBtn");
const playAgainBtn = document.getElementById("playAgainBtn");
const message = document.getElementById("message");
const attemptsDisplay = document.getElementById("attempts");
const scoreDisplay = document.getElementById("score");
const gameContainer = document.querySelector(".game-container");

function startGame() {
    secretNumber = Math.floor(Math.random() * 20) + 1;
    attemptsLeft = 5;
    gameOver = false;

    guessInput.value = "";
    guessInput.disabled = false;
    checkBtn.disabled = false;

    attemptsDisplay.textContent = attemptsLeft;
    message.textContent = "Good luck! Start guessing.";
    message.className = "";

    playAgainBtn.hidden = true;
    gameContainer.classList.remove("win-effect");

    guessInput.focus();
}

function checkGuess() {
    if (gameOver) return;

    const guess = Number(guessInput.value);

    if (
        guessInput.value.trim() === "" ||
        !Number.isInteger(guess) ||
        guess < 1 ||
        guess > 20
    ) {
        message.textContent = "Please enter a number between 1 and 20!";
        message.className = "error";
        return;
    }

    attemptsLeft--;
    attemptsDisplay.textContent = attemptsLeft;

    if (guess === secretNumber) {
        score += attemptsLeft * 10 + 10;
        scoreDisplay.textContent = score;

        message.textContent = "🎉 Correct! You Won!";
        message.className = "success";

        gameContainer.classList.add("win-effect");
        endGame();

    } else if (attemptsLeft === 0) {
        message.textContent = "Game Over! The number was " + secretNumber;
        message.className = "error";
        endGame();

    } else if (guess > secretNumber) {
        message.textContent = "Too High! Try a smaller number.";
        message.className = "error";

    } else {
        message.textContent = "Too Low! Try a bigger number.";
        message.className = "error";
    }

    guessInput.value = "";
    guessInput.focus();
}

function endGame() {
    gameOver = true;
    guessInput.disabled = true;
    checkBtn.disabled = true;
    playAgainBtn.hidden = false;
}

function playAgain() {
    startGame();
}

checkBtn.addEventListener("click", checkGuess);
playAgainBtn.addEventListener("click", playAgain);

guessInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        checkGuess();
    }
});

startGame();
