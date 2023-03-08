// Select DOM Elements
let headerName = document.querySelector(".user span");
let headerWrong = document.querySelector(".wrong span");
let gameBody = document.querySelector(".game-body");
//let userName = prompt("What Is Your Name");
let wrongAttemps = 0;
let successAudio = document.querySelector(".success");
let failAudio = document.querySelector(".failur");
let result = document.querySelector(".result");
let resultLevel = document.querySelector(".content .level");
let resultWrongAttemps = document.querySelector(".content .wrong-number");
let startGame = document.querySelector(".startGame");
let startButton = document.querySelector(".startGame button");
let startAgainButton = document.querySelector(".startAgain");
let gameStartCounter = document.querySelector(".game-starting-counter");
let gameStartCounterNumber = document.querySelector(
  ".game-starting-counter .number"
);

// Sets The User Name Part
//headerName.innerHTML = userName || "Unkown";
// Get The Rndom Number
let nums1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  ranNums1 = [],
  i1 = nums1.length,
  j1 = 0;

while (i1--) {
  j1 = Math.floor(Math.random() * (i1 + 1));
  ranNums1.push(nums1[j1]);
  nums1.splice(j1, 1);
}
let nums2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  ranNums2 = [],
  i2 = nums2.length,
  j2 = 0;

while (i2--) {
  j2 = Math.floor(Math.random() * (i2 + 1));
  ranNums2.push(nums2[j2]);
  nums2.splice(j2, 1);
}
randomArray = ranNums1.concat(ranNums2);

//Sets The Box Elements And Images Inside It
function setBoxGame(randomArray) {
  for (let i = 0; i < 20; i++) {
    // Set The Box Container Element
    let boxGame = document.createElement("div");
    boxGame.classList.add("box", "rotate");
    boxGame.setAttribute("data-box", i);

    // Set The Front And Back Images
    let frontImage = document.createElement("img");
    frontImage.classList.add("front");
    frontImage.src = `images/image${randomArray[i]}.png`;
    frontImage.setAttribute("data-image", randomArray[i]);

    let backImage = document.createElement("img");
    backImage.classList.add("back");
    backImage.src = `images/question.png`;

    // Append Images To Box Container
    boxGame.appendChild(frontImage);
    boxGame.appendChild(backImage);

    // Append Box Containers To GameBody
    gameBody.appendChild(boxGame);
  }
  startGameFunction();
}
setBoxGame(randomArray);

// Start The Game

function startGameFunction() {
  startButton.onclick = function () {
    // Disappear The Start Button
    startGame.style.display = "none";

    // Set The Counter
    let count = 5;
    gameStartCounter.style.display = "block";
    gameStartCounterNumber.innerHTML = count;
    let boxGames = Array.from(gameBody.children);
    gameStartingCounter();
    let countDown = setInterval(() => {
      count--;
      gameStartCounterNumber.innerHTML = count;
      if (count === -1) {
        clearInterval(countDown);
        gameStartCounter.style.display = "none";
      }
    }, 1000);
    setTimeout(() => {
      boxGames.forEach((box) => {
        box.classList.remove("rotate");
        box.classList.add("clickable");
      });
    }, 5000);

    console.log(Array.isArray(boxGames));
  };
}

// Set The GameStart Counter Which Will Count 5 second
function gameStartingCounter() {}
// Set Function Which Givs Me The Indexes Of Clicked Boxes
function giveIndex() {
  let imageIndex = [];
  gameBody.addEventListener("click", (e) => {
    if (e.target.parentElement.classList.contains("clickable")) {
      // Rotate The Box When Clicking
      e.target.parentElement.classList.add("rotate");
      e.target.parentElement.classList.remove("clickable");

      // Get The Index Of The Container Box
      let clickedImage = e.target.parentElement
        .querySelector(".front")
        .getAttribute("data-image");
      imageIndex.push(clickedImage);

      let boxArray = Array.from(gameBody.children);
      let collectedBoxes = boxArray.filter((box) =>
        box.classList.contains("rotate")
      );

      // Reset The Array Of Clicked Images And Clicked Boxes
      if (collectedBoxes.length === 2) {
        // Add No Click Class To The GameBody Container
        gameBody.classList.add("no-click");

        // Trigger The Commpare Clicked Images Function
        compareClickedIndexes(collectedBoxes, imageIndex, boxArray);
        collectedBoxes = [];
        imageIndex = [];
      }
    }
  });
}
giveIndex();

// Set The Main Function
function compareClickedIndexes(collectedBoxes, imageIndex, boxArray) {
  // Make Decision If The Images Were Same Or Not
  if (imageIndex[0] === imageIndex[1]) {
    // Play Success Audio
    successAudio.play();

    // Delete The Classes Which Added After Clicking
    setTimeout(() => {
      gameBody.classList.remove("no-click");
      collectedBoxes.map(function (box) {
        box.classList.remove("rotate");
        box.classList.add("true");

        // Set The Result Message
        if (wrongAttemps > 15) {
          resultLevel.innerHTML = "Game Over";
        } else if (wrongAttemps > 10) {
          resultLevel.innerHTML = "Good";
        } else if (wrongAttemps > 5) {
          resultLevel.innerHTML = "Perfect";
        } else if (wrongAttemps > 0) {
          resultLevel.innerHTML = "Super Perfect";
        }
        resultWrongAttemps.innerHTML = wrongAttemps;
        if (boxArray.every((box) => box.classList.contains("true")))
          result.style.display = "flex";
      });
    }, 1000);

    // Check If There are Still Clickable Image or Not To Finish The Game
  } else {
    // Increase The Wrong Attems
    wrongAttemps++;
    headerWrong.innerHTML = wrongAttemps;

    // Play The Fail Audio
    failAudio.play();

    // Delete The Class which Has Been Added After Clicking
    setTimeout(() => {
      gameBody.classList.remove("no-click");
      collectedBoxes.map(function (box) {
        box.classList.remove("rotate");
        box.classList.add("clickable");
      });
    }, 1000);
  }
}

startAgainButton.onclick = function () {
  result.style.display = "none";
  gameBody.innerHTML = "";
  setBoxGame(randomArray);
  startGameFunction();
};

/*

How To Create shuffle Function

let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
function shuffle(array) {
  let current = array.length - 1,
    temp,
    random;
  while (current >= 0) {
    temp = array[current];
    random = Math.floor(Math.random() * current);
    array[current] = array[random];
    array[random] = temp;
    current--;
  }
  console.log(array);
}
shuffle(array);
  Example
  [1, 7, 10, 4, 2, 3, 5, 9, 6, 8]



-- Steps

[1] Save The Current Number To Temp
[2] Current Element = Random Number
[3] Random Nubmer = Current Element
*/
