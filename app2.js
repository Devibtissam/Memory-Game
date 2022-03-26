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

function playGame() {
  if (gridSize === 4) {
    DisplayGridItems(gridSize, twoGrid);
    cardsContainer.classList.add('two-grid');
  } else {
    DisplayGridItems(gridSize, fourGrid);
    cardsContainer.classList.add('four-grid');
  }
  let moves = 0;
  const choosenCards = [];
  const flipCards = document.querySelectorAll('.flip-card');
  // console.log(backCards);
  flipCards.forEach((card) => {
    card.addEventListener('click', (e) => {
      moves += 1;
      console.log(moves);
      const backCard = card.querySelector('.hide-card');
      console.log(backCard);
      if (backCard.classList.contains('hide-card')) {
        backCard.classList.remove('hide-card');
        backCard.classList.add('show-card');
        console.log('hhh');
      }
      const selectedCard = e.currentTarget.dataset.title;
      choosenCards.push(selectedCard);
      if (choosenCards.length === 2) {
        flipCards.forEach((flipcard) => {
          if (checkCards(choosenCards)) {
            if (
              flipcard.dataset.title === choosenCards[0] ||
              flipcard.dataset.title === choosenCards[choosenCards.length - 1]
            ) {
              console.log('opacity');
            }
          } else {
            console.log('non opacity');
          }
        });
        choosenCards.length = 0;
      }

      // if (choosenCards.length === 2) {
      //   if (choosenCards[0] === choosenCards[choosenCards.length - 1]) {
      //     console.log('rahom kif kif');
      //   } else {
      //     console.log('marahomch kif kif');
      //   }
      //   choosenCards.length = 0;
      // }
    });
  });
}

playGame();
