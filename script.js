"use script";

const gameContainer = document.querySelector(".game-container");
const wordContainer = document.querySelector(".word-box");
const letterInput = document.getElementById("letterInput");
const buttonCheck = document.getElementById("btn");
const statusText = document.getElementById("statusText");
const gameTriesNumText = document.getElementById("gameTries");
const listTriedLetters = document.getElementById("listTriedLetters");

let alreadyTriedLetter = [];
let revealedLetters = [];
let gameTries = 6;
gameTriesNumText.innerText = gameTries;

const words = "javascript";
let wordsArray = [];

const fetchApi = async () => {
  try {
    const res = await fetch(
      "https://api.mockfly.dev/mocks/27dcb470-c104-490a-88ce-d4ad14ed8132/words"
    );
    const wordsList = await res.json();
    wordsArray = wordsList.map((wordObj) => wordObj.wordToPlay);
    return wordsArray;
  } catch (error) {
    console.error(`Download error: ${error.message}`);
    return [];
  }
};

const fetchDataAndStartGame = async () => {
  await fetchApi();
  renderLetters(getRandomWord());
};

const getRandomWord = () => {
  const randomIndex = Math.floor(Math.random() * wordsArray.length);
  return wordsArray[randomIndex];
};

const wordLettersObj = [];
let pastLetterIndex;
let selectedLetterIndex;

const renderLetters = (word) => {
  wordContainer.innerHTML = "";
  wordLettersObj.length = 0;

  word.split("").forEach((letter, i) => {
    const letterParagraph = document.createElement("p");

    console.log(letter);

    const lettersObj = {
      letter: letter,
      isGuessed: false,
      element: letterParagraph,
    };

    if (i === 0 || lettersObj.isGuessed === true) {
      letterParagraph.innerText = lettersObj.letter;
      lettersObj.isGuessed = true;
      revealedLetters.push(lettersObj.letter.toUpperCase());
    } else {
      letterParagraph.innerText = "_";
    }

    wordContainer.append(letterParagraph);
    wordLettersObj.push(lettersObj);
  });
};

const checkStatusWin = () => {
  const isWin = wordLettersObj.every((lettersObj) => lettersObj.isGuessed);

  if (isWin) {
    statusText.innerText = "Congratulations! You've won!";
    statusText.style.color = "green";
    setTimeout(gameOver, 4000);
  }
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
      correctLetters();
      checkStatusWin();
      letterInput.value = "";
    } else if (letterInput.value === "") {
      statusText.innerText = "Try to write a letter. To play the game";
      statusText.style.color = "red";
    } else {
      attemptedLetters();
    }

    if (gameTries <= 0) {
      statusText.innerText = "Sorry it's game over for you.";
      statusText.style.color = "red";
      setTimeout(gameOver, 4000);
    }
  });
};

const gameOver = () => {
  gameTries = 6;
  gameTriesNumText.innerText = gameTries;

  wordLettersObj.forEach((letterObj) => {
    letterObj.isGuessed = false;
  });

  letterInput.value = "";
  statusText.innerText = "";
  listTriedLetters.innerText = "";
  alreadyTriedLetter = [];
  revealedLetters = [];

  renderLetters(getRandomWord());
};

const attemptedLetters = () => {
  const letterInputUpperCase = letterInput.value.toUpperCase();

  if (
    !alreadyTriedLetter.includes(letterInputUpperCase) &&
    letterInput.value !== ""
  ) {
    alreadyTriedLetter.push(letterInputUpperCase);
    listTriedLetters.innerText = alreadyTriedLetter.join(" ,  ");
    gameTries--;
    gameTriesNumText.innerText = gameTries;
    statusText.innerText = "Wrong letter. Try guessing again.";
    statusText.style.color = "red";
    letterInput.value = "";
  } else {
    statusText.innerText =
      "You already tried this letter.  Please try guessing a different letter.";
    statusText.style.color = "red";
  }

  console.log(alreadyTriedLetter);
};

const correctLetters = () => {
  const letterInputUpperCase = letterInput.value.toUpperCase();

  if (
    !revealedLetters.includes(letterInputUpperCase) &&
    letterInput.value !== ""
  ) {
    revealedLetters.push(letterInputUpperCase);
    statusText.innerText = "Congrats! You revealed a letter.";
    statusText.style.color = "green";
  } else {
    statusText.innerText =
      "You already revealed this letter.  Please try guessing a different letter.";
    statusText.style.color = "green";
  }

  console.log(revealedLetters);
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

guessTheLetter();
fetchDataAndStartGame();
