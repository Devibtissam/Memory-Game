const twoGrid = [
  {
    id: 1,
    alt: 'ananas image',
    img: './images/ananas.png',
  },
  {
    id: 2,
    alt: 'orange image',
    img: './images/orange.png',
  },
];

const fourGrid = [
  {
    id: 1,
    alt: 'ananas image',
    img: './images/ananas.png',
  },
  {
    id: 2,
    alt: 'orange image',
    img: './images/orange.png',
  },
  {
    id: 3,
    alt: 'boire image',
    img: './images/boire.png',
  },
  {
    id: 4,
    alt: 'citron image',
    img: './images/citron.png',
  },
  {
    id: 5,
    alt: 'creme glace image',
    img: './images/creme-glacee.png',
  },
  {
    id: 6,
    alt: 'fraise image',
    img: './images/fraise.png',
  },
  {
    id: 7,
    alt: 'noix de coco image',
    img: './images/noix-de-coco.png',
  },
  {
    id: 8,
    alt: 'pasteque image',
    img: './images/pasteque.png',
  },
];
//  const indexNums = [];
function randIndexese(gridArr) {
  const randNum = Math.floor(Math.random() * gridArr.length);

  return randNum;
}

const gridSize = parseInt(localStorage.getItem('gridSize'));
const cardsContainer = document.querySelector('.card-items');


function DisplayGridItems(gridNum, gridArr) {
  let displayCard = [];
  for (let i = 0; i < gridNum; i++) {
    const randIndexe = randIndexese(gridArr);

    const gridCard = `<div class="flip-card">
    <div class ="back"><img src="${gridArr[randIndexe].img}" alt="${gridArr[randIndexe].alt}"></div>
    </div>`;
    displayCard.push(gridCard);
  }
//   console.log(displayCard);
  displayCard = displayCard.join('');
  cardsContainer.innerHTML = displayCard;
}

function playGame() {
  if (gridSize === 4) {
    DisplayGridItems(gridSize, twoGrid);
    cardsContainer.classList.add('two-grid');
  } else {
    DisplayGridItems(gridSize, fourGrid);
    cardsContainer.classList.add('four-grid');
  }
  const flipCards = document.querySelectorAll('.flip-card');
  flipCards.forEach((card) => {
    card.addEventListener('click', (e) => {
      console.log(e.currentTarget);
      console.log('hhhh');
    });
  });
}

playGame();
