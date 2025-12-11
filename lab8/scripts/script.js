const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const hangmanImg = document.querySelector(".hangman-box img");
const keyboardDiv = document.querySelector(".keyboard");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");
const hintText = document.querySelector(".hint-text b");

const maxWrong = 6;
let wrongGuessCount = 0;
let selectedWord = "";
let selectedHint = "";
let revealed = [];

function generateKeyboard() {
    keyboardDiv.innerHTML = "";
    const alphabet = "abcdefghijklmnopqrstuvwxyz";

    alphabet.split("").forEach(letter => {
        const button = document.createElement("button");
        button.innerText = letter;
        button.addEventListener("click", () => handleGuess(letter, button));
        keyboardDiv.appendChild(button);
    });
}

function selectRandomWord() {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    selectedWord = word.toLowerCase();
    selectedHint = hint;
    revealed = Array(selectedWord.length).fill(false);
    console.log(selectedWord);
    hintText.innerText = selectedHint;
}

function displayWord() {
    wordDisplay.innerHTML = "";
    selectedWord.split("").forEach((letter, i) => {
        const li = document.createElement("li");
        li.className = "letter";

        if (revealed[i]) {
            li.innerText = letter.toUpperCase();
            li.classList.add("guessed");
        } else {
            li.innerText = "";
        }

        wordDisplay.appendChild(li);
    });
}

function handleGuess(letter, button) {
    let indices = [];

    for (let i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] === letter && !revealed[i]) {
            indices.push(i);
        }
    }

    if (indices.length === 0) {
        // WRONG GUESS
        wrongGuessCount++;
        guessesText.innerText = `${wrongGuessCount} / ${maxWrong}`;
        hangmanImg.src = `/lab8/hangman-game-images/images/hangman-${wrongGuessCount}.svg`;

        button.disabled = true;

        if (wrongGuessCount >= maxWrong) return gameOver(false);
        return;
    }

    // Reveal ONLY ONE letter (the first unrevealed)
    revealed[indices[0]] = true;
    displayWord();

    // Disable key if no more occurrences left
    if (indices.length === 1) button.disabled = true;

    checkWin();
}

function checkWin() {
    if (revealed.every(v => v)) {
        return gameOver(true);
    }
}

function gameOver(won) {
    const modalImg = gameModal.querySelector("img");
    const modalText = gameModal.querySelector("p b");
    const modalHeader = gameModal.querySelector("h4");

    if (won) {
        modalImg.src = "/lab8/hangman-game-images/images/victory.gif";
        modalHeader.innerText = "Та яллаа!";
    } else {
        modalImg.src = "/lab8/hangman-game-images/images/lost.gif";
        modalHeader.innerText = "Тоглоом дууслаа!";
    }

    modalText.innerText = selectedWord.toUpperCase();
    gameModal.classList.add("show");
}

function resetGame() {
    wrongGuessCount = 0;
    guessesText.innerText = `0 / ${maxWrong}`;
    hangmanImg.src = `/lab8/hangman-game-images/images/hangman-0.svg`;

    gameModal.classList.remove("show");
    generateKeyboard();
    selectRandomWord();
    displayWord();
}

playAgainBtn.addEventListener("click", resetGame);

// START game on load
generateKeyboard();
resetGame();
