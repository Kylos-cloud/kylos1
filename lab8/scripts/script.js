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
    const currentIndex = revealed.indexOf(false);
    if (currentIndex === -1) return;

    //
    if (selectedWord[currentIndex] !== letter) {
        wrongGuessCount++;
        guessesText.innerText = `${wrongGuessCount} / ${maxWrong}`;
        hangmanImg.src = `hangman-game-images/images/hangman-${wrongGuessCount}.svg`;

        button.classList.add("wrong");

        if (wrongGuessCount >= maxWrong) {
            gameOver(false);
        }
        return;
    }

    // left->right
    revealed[currentIndex] = true;
    displayWord();

    // zuvhun ter useg ni duussn tohioldold disable hiine 
    const stillNeeded = selectedWord
        .split("")
        .some((ch, i) => ch === letter && !revealed[i]);

    if (!stillNeeded) {
        button.disabled = true;
    }

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
        modalImg.src = "hangman-game-images/images/victory.gif";
        modalHeader.innerText = "Та яллаа!";
    } else {
        modalImg.src = "hangman-game-images/images/lost.gif";
        modalHeader.innerText = "Тоглоом дууслаа!";
    }

    modalText.innerText = selectedWord.toUpperCase();
    gameModal.classList.add("show");
}

function resetGame() {
    wrongGuessCount = 0;
    guessesText.innerText = `0 / ${maxWrong}`;
    hangmanImg.src = `hangman-game-images/images/hangman-0.svg`;

    gameModal.classList.remove("show");
    generateKeyboard();
    selectRandomWord();
    displayWord();
}

playAgainBtn.addEventListener("click", resetGame);

// START game on load
generateKeyboard();
resetGame();
