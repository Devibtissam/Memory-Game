const twoGrid = [
  {
    id: 1,
    title: 'ananas',
    alt: 'ananas image',
    img: './images/ananas.png',
  },
  {
    id: 2,
    title: 'orange',
    alt: 'orange image',
    img: './images/orange.png',
  },
];

const fourGrid = [
  {
    id: 1,
    title: 'ananas',
    alt: 'ananas image',
    img: './images/ananas.png',
  },
  {
    id: 2,
    title: 'orange',
    alt: 'orange image',
    img: './images/orange.png',
  },
  {
    id: 3,
    boire: 'boire',
    alt: 'boire image',
    img: './images/boire.png',
  },
  {
    id: 4,
    title: 'citron',
    alt: 'citron image',
    img: './images/citron.png',
  },
  {
    id: 5,
    title: 'glace',
    alt: 'creme glace image',
    img: './images/creme-glacee.png',
  },
  {
    id: 6,
    title: 'fraise',
    alt: 'fraise image',
    img: './images/fraise.png',
  },
  {
    id: 7,
    title: 'coco',
    alt: 'noix de coco image',
    img: './images/noix-de-coco.png',
  },
  {
    id: 8,
    title: 'pasteque',
    alt: 'pasteque image',
    img: './images/pasteque.png',
  },
];
const gridSize = parseInt(localStorage.getItem('gridSize'));
const cardsContainer = document.querySelector('.card-items');
const timer = document.querySelector('.times');
const modalContainer = document.querySelector('.modal-container');
const modalText = document.querySelector('.modal-desc');
console.log(modalContainer);
const indexNums = [];
let randNum = 0;

//  generate Random Number to display cards dynamically from the arrays of each chosen Grid
//  cards with same icon should not be displayed more than two times
function getRandNumber(gridArr) {
  let lessThanTwo = false;
  while (!lessThanTwo) {
    randNum = Math.floor(Math.random() * gridArr.length);
    indexNums.push(randNum);
    let count = 0;
    for (let i = 0; i < indexNums.length; i++) {
      if (indexNums[i] === randNum) {
        count += 1;
      }
    }
    if (count <= 2) {
      lessThanTwo = true;
    }
  }
  if (lessThanTwo) {
    return randNum;
  }
}
// Displaying the shuffling Cards
function DisplayGridItems(gridNum, gridArr) {
  let displayCard = [];
  for (let i = 0; i < gridNum; i++) {
    const randIndexe = getRandNumber(gridArr);

    const gridCard = `<div class="flip-card" data-title="${gridArr[randIndexe].title}">
    <div class ="hide-card"><img src="${gridArr[randIndexe].img}" alt="${gridArr[randIndexe].alt}"></div>
    </div>`;
    displayCard.push(gridCard);
  }
  displayCard = displayCard.join('');
  cardsContainer.innerHTML = displayCard;
}
// check if the two selected cards are matched
function checkCards(cardsName) {
  if (cardsName[0] === cardsName[cardsName.length - 1]) {
    // mathched card
    return true;
  }
  // unmatched card
  return false;
}

let second = 0;
let minute = 0;
let hour = 0;

// count the times while the user plays
function startTimer() {
  timer.innerHTML = `${minute}mins ${second}secs`;
  second++;
  if (second == 60) {
    minute++;
    second = 0;
  }
  if (minute == 60) {
    hour++;
    minute = 0;
  }
}
const interval = setInterval(startTimer, 1000);

function playGame() {
  startTimer();
  if (gridSize === 4) {
    DisplayGridItems(gridSize, twoGrid);
    cardsContainer.classList.add('two-grid');
  } else {
    DisplayGridItems(gridSize, fourGrid);
    cardsContainer.classList.add('four-grid');
  }
  // counter to count the number of moves made by player
  let moves = 0;
  const chosenCards = [];
  const unmatchedCards = [];
  const matchedCards = [];
  const flipCards = document.querySelectorAll('.flip-card');
  const moveCards = document.querySelector('.moves');

  flipCards.forEach((card) => {
    card.addEventListener('click', (e) => {
      const backCard = card.querySelector('.hide-card');
      if (backCard.classList.contains('hide-card')) {
        backCard.classList.toggle('show-card');
        unmatchedCards.push(backCard);
      }
      const selectedCard = e.currentTarget.dataset.title;
      chosenCards.push(selectedCard);
      if (chosenCards.length === 2) {
        moves += 1;
        moveCards.innerHTML = `moves: ${moves}`;
        if (checkCards(chosenCards)) {
          flipCards.forEach((flipCard) => {
            if (
              flipCard.dataset.title === chosenCards[0] ||
              flipCard.dataset.title === chosenCards[chosenCards.length - 1]
            ) {
              flipCard.classList.add('matched-card');
              matchedCards.push(flipCard);
            }
          });
        } else {
          unmatchedCards.forEach((unmatchedCard) => {
            unmatchedCard.classList.toggle('unmatched-card');
            setTimeout(() => {
              unmatchedCard.classList.remove('show-card');
            }, 1100);
          });
        }
        chosenCards.length = 0;
        unmatchedCards.length = 0;
        if (matchedCards.length === gridSize) {
          // stop the timmer and display the pop-up modal at the end of the game
          clearInterval(interval);
          modalText.innerHTML = `you completed the game using ${moves} moves in ${minute} mins ${second} secs`;
          modalContainer.classList.add('open-modal');
        }
      }
    });
  });
}

playGame();
