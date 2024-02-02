"use script";

const gameContainer = document.querySelector(".game-container");
const wordContainer = document.querySelector(".word-box");
const letterInput = document.getElementById("letterInput");
const buttonCheck = document.getElementById("btn");
const statusText = document.getElementById("statusText");
const gameTriesNumText = document.getElementById("gameTries");

const alreadyTriedLetter = [];
let gameTries = 6;
gameTriesNumText.innerText = gameTries;

// task 1 (create variable of word which will be in guessing game)
// task 2 render the letters on screen, which depend of letter status
// task 3 (check every letter to find out which letter we are guessing)

const words = "javascript";

const wordLettersObj = words.split("").map((n) => {
  return {
    letter: n,
    isGuessed: false,
    element: null,
  };
});

let pastLetterIndex;
let selectedLetterIndex;

const renderLetters = () => {
  wordContainer.innerHTML = "";

  wordLettersObj.forEach((lettersObj, i) => {
    const letterParagraph = document.createElement("p");

    if (i === 0 || lettersObj.isGuessed === true) {
      letterParagraph.innerText = lettersObj.letter;
    } else {
      letterParagraph.innerText = "_";
    }

    wordContainer.append(letterParagraph);
    lettersObj.element = letterParagraph;
  });
};

const guessTheLetter = () => {
  buttonCheck.addEventListener("click", () => {
    let correctGuess = false;

    wordLettersObj.forEach((lettersObj) => {
      if (lettersObj.letter === letterInput.value) {
        lettersObj.isGuessed = true;
        lettersObj.element.innerText = letterInput.value;
        correctGuess = true;
      }
    });

    if (correctGuess) {
      statusText.innerText = "Congrats! You revealed a letter.";
      statusText.style.color = "green";
    } else {
      statusText.innerText = "Wrong letter. Try guessing again.";
      statusText.style.color = "red";
      gameTries--;
      gameTriesNumText.innerText = gameTries;
    }

    if (gameTries <= 0) {
      gameOver();
    }

    attemptedLetters();
  });
};

const gameOver = () => {
  gameTries = 6;
  gameTriesNumText.innerText = gameTries;

  wordLettersObj.forEach((letterObj) => {
    letterObj.isGuessed = false;
  });

  statusText.innerText = "";

  renderLetters();
};

const attemptedLetters = () => {
  const letterInputUpperCase = letterInput.value.toUpperCase();
  alreadyTriedLetter.push(letterInputUpperCase);
};

// const guessTheLetter = () => {
//   wordLettersObj.forEach((lettersObj, i) => {
//     const letterParagraph = document.createElement("p");

// letterParagraph.addEventListener("click", () => {
//   if (pastLetterIndex !== undefined) {
//     wordLettersObj[pastLetterIndex].element.style.border = "none";
//   }

//   selectedLetterIndex = i;

//   pastLetterIndex = selectedLetterIndex;

//   letterParagraph.style.border = "1px solid black";

//   console.log(selectedLetterIndex);
// });

// lettersObj.element = letterParagraph;
//   });
// };

renderLetters();
guessTheLetter();
