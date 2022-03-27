console.log("index.js");

// document.addEventListener("keydown", function (event) {
//   // console.log("keydown");
//   // console.log(event.key);
//   if (event.key == "Backspace") {
//     console.log("back");
//   }
//   wordUserIsGuessing += event.key;
//   console.log(wordUserIsGuessing);
// });

// List of possible words.
var mikesFavoriteStuff = [
  "enchantress",
  "derevi",
  "llamas",
  "anime",
  "legacy",
  "memes",
  "darksouls",
];

// Sets the variables used in the functions
let answer = "";
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;
let win = new Audio("good job.mp3");
let lose = new Audio("You Died.mp3");

// Chooses the word to be guessed
function randomWord() {
  answer =
    mikesFavoriteStuff[Math.floor(Math.random() * mikesFavoriteStuff.length)];
}

// Generates the buttons by adding to the HTML of the document and gives them the functionality of "handleGuess" when they're clicked on.
function generateButtons() {
  let buttonsHTML = "abcdefghijklmnopqrstuvwxyz"
    .split("")
    .map((letter) => {
      return `<button class="btn btn-lg btn-primary m-2" id='${letter}' onClick="handleGuess('${letter}')">${letter}</button>`;
    })
    .join("");
  document.getElementById("keyboard").innerHTML = buttonsHTML;
}

// Takes the user input and "handles" their guess when they click a letter in the onscreen keyboard.
function handleGuess(chosenLetter) {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  document.getElementById(chosenLetter).setAttribute("disabled", true);
  if (answer.indexOf(chosenLetter) >= 0) {
    guessedWord();
    checkIfGameWon();
  } else if (answer.indexOf(chosenLetter) === -1) {
    mistakes++;
    updateMistakes();
    checkIfGameLost();
    updateHangmanPicture();
  }
}

// Changes the picture when the function is called
function updateHangmanPicture() {
  document.getElementById("hangmanPic").src = "./images/" + mistakes + ".jpg";
}

// If the user guesses the word, displays a message and plays the audio.
function checkIfGameWon() {
  if (wordStatus === answer) {
    document.getElementById("keyboard").innerHTML =
      "I like what you got! GOOD JOB!";
    win.play();
  }
}

// If the user makes too many mistakes displays a message and plays the audio
function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById("wordSpotlight").innerHTML =
      "The answer was " + answer;
    document.getElementById("keyboard").innerHTML = "You Died";
    lose.play();
  }
}

// Based on the chosen word, will display _ for every letter in the word. Updates the _ with letters as they are guessed correctly.
function guessedWord() {
  wordStatus = answer
    .split("")
    .map((letter) => (guessed.indexOf(letter) >= 0 ? letter : " _ "))
    .join("");
  document.getElementById("wordSpotlight").innerHTML = wordStatus;
}

// Updates the counter on the screen to keep track of how many mistakes the user has made.
function updateMistakes() {
  document.getElementById("mistakes").innerHTML = mistakes;
}

// Makes the reset button work. Runs the various functions to set everything back to starting.
function reset() {
  mistakes = 0;
  guessed = [];
  document.getElementById("hangmanPic").innerHTML = maxWrong;

  randomWord();
  guessedWord();
  updateMistakes();
  generateButtons();
  updateHangmanPicture();
}
// Displays how many guesses the player can get wrong. Seems overly complicated as that could have just been set in the HTML itself.
document.getElementById("maxWrong").innerHTML = maxWrong;

// These functions are called at page load to Choose a word, generate all the buttons, and properly display the word to be guessed.
randomWord();
generateButtons();
guessedWord();
