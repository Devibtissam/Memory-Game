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
const indexNums = [];
let randNum = 0;

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

function DisplayGridItems(gridNum, gridArr) {
  let displayCard = [];
  for (let i = 0; i < gridNum; i++) {
    const randIndexe = getRandNumber(gridArr);

    const gridCard = `<div class="flip-card" data-title="${gridArr[randIndexe].title}">
    <div class ="hide-card"><img src="${gridArr[randIndexe].img}" alt="${gridArr[randIndexe].alt}"></div>
    </div>`;
    displayCard.push(gridCard);
  }
  //   console.log(displayCard);
  displayCard = displayCard.join('');
  cardsContainer.innerHTML = displayCard;
}

function checkCards(cardsName) {
  if (cardsName[0] === cardsName[cardsName.length - 1]) {
    // mathched card
    return true;
  }
  // unmatched card
  return false;
}
// // @description game timer
let second = 0;
let minute = 0;
let hour = 0;
const timer = document.querySelector('.times');
console.log(timer);

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
  let moves = 0;
  const choosenCards = [];
  const unmatchedCards = [];
  const matchedCards = [];
  const flipCards = document.querySelectorAll('.flip-card');
  const moveCards = document.querySelector('.moves');
  // console.log(moveCards);
  // console.log(backCards);
  flipCards.forEach((card) => {
    card.addEventListener('click', (e) => {
      // moves += 1;
      // add moves each time you clicked on card
      // console.log(card);
      const backCard = card.querySelector('.hide-card');
      // console.log(backCard);
      if (backCard.classList.contains('hide-card')) {
        // backCard.classList.remove('hide-card');
        backCard.classList.toggle('show-card');
        // console.log('hhh');
        unmatchedCards.push(backCard);
      }
      console.log(unmatchedCards);
      const selectedCard = e.currentTarget.dataset.title;
      choosenCards.push(selectedCard);
      if (choosenCards.length === 2) {
        moves += 1;
        moveCards.innerHTML = `moves: ${moves}`;
        if (checkCards(choosenCards)) {
          flipCards.forEach((flipCard) => {
            console.log(flipCard);
            if (
              flipCard.dataset.title === choosenCards[0] ||
              flipCard.dataset.title === choosenCards[choosenCards.length - 1]
            ) {
              flipCard.classList.add('matched-card');
              matchedCards.push(flipCard);
              console.log(matchedCards);
            }
          });
        } else {
          // console.log('non opacity');
          unmatchedCards.forEach((unmatchedCard) => {
            unmatchedCard.classList.add('unmatched-card');
            setTimeout(() => {
              // unmatchedCard.classList.add('hide-card');
              unmatchedCard.classList.remove('show-card');
            }, 1100);
          });
        }
        choosenCards.length = 0;
        unmatchedCards.length = 0;
        if (matchedCards.length === gridSize) {
          // timer.innerHTML = '0 mins 0 secs';
          // console.log('hhhhh');
          clearInterval(interval);
          // console.log(interval);
        }
      }
    });
  });
}

playGame();
