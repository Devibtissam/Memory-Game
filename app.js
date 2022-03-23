// const twoGrid = [
//   {
//     id: 1,
//     alt: 'ananas image',
//     img: './images/ananas.png',
//   },
//   {
//     id: 2,
//     alt: 'orange image',
//     img: './images/orange.png',
//   },
// ];

// const fourGrid = [
//   {
//     id: 1,
//     alt: 'ananas image',
//     img: './images/ananas.png',
//   },
//   {
//     id: 2,
//     alt: 'orange image',
//     img: './images/orange.png',
//   },
//   {
//     id: 3,
//     alt: 'boire image',
//     img: './images/boire.png',
//   },
//   {
//     id: 4,
//     alt: 'citron image',
//     img: './images/citron.png',
//   },
//   {
//     id: 5,
//     alt: 'creme glace image',
//     img: './images/creme-glacee.png',
//   },
//   {
//     id: 6,
//     alt: 'fraise image',
//     img: './images/fraise.png',
//   },
//   {
//     id: 7,
//     alt: 'noix de coco image',
//     img: './images/noix-de-coco.png',
//   },
//   {
//     id: 8,
//     alt: 'pasteque image',
//     img: './images/pasteque.png',
//   },
// ];

const btns = document.querySelectorAll('.grid-btn');
// const span = document.querySelector('span');
// console.log(span);
// console.log(btns);

// function DisplayGridItems(gridNum, gridArr) {}

btns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const gridSize = e.currentTarget.getAttribute('id');
    // if (gridSize === 4) {
    //   //   DisplayGridItems(gridSize, twoGrid);
    //   localStorage.setItem('gridSize', 4);
    // } else {
    //     localStorage.setItem('gridSize', 8);
    //   //   DisplayGridItems(gridSize, fourGrid);
    // }
    localStorage.setItem('gridSize', gridSize * gridSize);
  });
});
