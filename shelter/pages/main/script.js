console.log(``)

const body = document.querySelector('body');

// Work input and ancor
const helpInput = document.getElementById('help-shelter');

document.addEventListener('DOMContentLoaded', () => {
  if (!!location.href.match(/#help/)) {
    helpInput.checked = true;
  }
})


// option cards constructor in section help
const optionDiv = document.querySelector('.option');
const optionCardTextArray = ['Pet food', 'Transportation', 'Toys', 'Bowls and cups', 'Shampoos', 'Vitamins', 'Medicines', 'Collars / leashes', 'Sleeping areas'];

const optionCardInner = `<div class="option-card-foto"></div>
<h4 class="header-4">Pet food</h4>`;

for (let i = 0; i < optionCardTextArray.length; i++) {
  const optionCard = document.createElement('div');

  optionCard.className = `option-card option-card-${i + 1}`;
  optionCard.innerHTML = optionCardInner;
  const optionTextElement = optionCard.querySelector('.header-4');
  optionTextElement.innerHTML = optionCardTextArray[i];
  optionDiv.append(optionCard);
}


// cards constructor from json in slider and modal constructor
const containerDiv = document.querySelectorAll('.cards-container');
const modal = document.querySelector('.pets-modal');
const modalInner = document.querySelector('.pets-modal-inner');
const modalClose = document.querySelector('.modal-close');
const arrowLeft = document.querySelector('.arrow-left');
const arrowRight = document.querySelector('.arrow-right');
const slider = document.querySelector('.slider');
const sliderInner = document.querySelector('.slider-inner');
const cardsOuter = document.querySelsecond = document.querySelector('.cards-container-outer');
const first = document.querySelectorAll('.first');
const second = document.querySelector('.second');

// let sortArray;
let globalData;
let currentArray;
let prevArray;
let count = 1;
let columnGap = 90;
let currentPosition = 0;
let leftPosition = 0;
let slidesCount = 3;
let experimentalData = Array(8).fill(0).map((el, i) => i);
let isBackClicked = false;
let isNextClicked = false;
let currentScreenSize;

const cardInner = `<div class="card-foto"></div>
<h4 class="header-4"></h4>
<button class="button">Learn more</button>`;

fetch('../pets.json')
  .then(response => response.json())
  .then((data) => {
    globalData = data;
    checkArray(data);
    currentArray = createNextArray();
    const currentData = currentArray.map((el) => data[el]);

    containerDiv.forEach(el => {
      createCards(currentData, el);
    });

    leftPosition = -cardsOuter.clientWidth - columnGap;
    cardsOuter.style.left = `${(leftPosition)}px`;
  })

function createNextArray() {
  let arr = [];
  if (!!currentArray) {
    experimentalData.forEach(el => {
      if (!currentArray.includes(el)) {
        arr.push(el);
      }
    });
    arr.sort(() => Math.random() - 0.5);
  } else {
    arr = experimentalData.map(el => el).sort(() => Math.random() - 0.5);
  }
  arr.length = slidesCount;
  return arr;
}

// function cloneCard(container) {
//   const cloneItem = container.cloneNode(true);
//   cardsOuter.appendChild(cloneItem);
//   // const cloneItem2 = container.cloneNode(true);
//   // container.before(cloneItem2);
// }

function createCards(dataArray, parrent) {
  // console.log(parrent);
  // dataArray.forEach(el => console.log(el.name));
  parrent.innerHTML = '';

  for (let i = 0; i < dataArray.length; i++) {
    const cardElement = document.createElement('div');
    cardElement.className = `card`;
    cardElement.innerHTML = cardInner;
    const textElement = cardElement.querySelector('.header-4');
    textElement.innerHTML = dataArray[i].name;
    const fotoElement = cardElement.querySelector('.card-foto');
    fotoElement.style.backgroundImage = `url('${dataArray[i].img}')`;
    parrent.appendChild(cardElement);
    cardElement.addEventListener('click', () => openModal(dataArray[i]));
  }
}

function prevSlide() {
  if (!isNextClicked) {
    prevArray = currentArray;
    currentArray = createNextArray();
  } else {
    isNextClicked = false;
    let state = currentArray.map(el => el);
    currentArray = prevArray.map(el => el);
    prevArray = state;
  }

  isBackClicked = true;
  count--;
  const currentData = currentArray.map((el) => globalData[el]);
  const prevData = prevArray.map((el) => globalData[el]);

  if (count === 0) {
    first.forEach(el => {
      createCards(currentData, el);
    })
    createCards(prevData, second)
  }

  if (count === -1) {
    count = 1;
    leftPosition = -currentPosition - 2 * (cardsOuter.clientWidth + columnGap);
    cardsOuter.style.left = `${leftPosition}px`;
    first.forEach(el => {
      createCards(prevData, el);
    })
    createCards(currentData, second);
  }

  currentPosition = currentPosition + cardsOuter.clientWidth + columnGap;
  cardsOuter.style.translate = `${currentPosition}px`;
}

arrowLeft.addEventListener('click', prevSlide);

function nextSlide() {
  if (!isBackClicked) {
    prevArray = currentArray;
    currentArray = createNextArray();
  } else {
    let state = currentArray.map(el => el);
    currentArray = prevArray.map(el => el);
    prevArray = state;
    isBackClicked = false;
  }

  isNextClicked = true;
  count++;
  const currentData = currentArray.map((el) => globalData[el]);
  const prevData = prevArray.map((el) => globalData[el]);

  if (count === 2) {
    first.forEach(el => {
      createCards(currentData, el);
    })
    createCards(prevData, second)
  } else if (count === 3) {
    count = 1;
    leftPosition = -currentPosition;
    cardsOuter.style.left = `${leftPosition}px`;
    first.forEach(el => {
      createCards(prevData, el);
    })
    createCards(currentData, second)
  }

  currentPosition = currentPosition - cardsOuter.clientWidth - columnGap;
  cardsOuter.style.translate = `${currentPosition}px`;
}

arrowRight.addEventListener('click', nextSlide);





function openModal(modalData) {
  const image = document.querySelector('.modal-foto');
  const namePet = document.querySelector('.pet-name');
  const kind = document.querySelector('.kind');
  const breed = document.querySelector('.breed');
  const description = document.querySelector('.pet-description');
  const age = document.querySelector('.age');
  const inoculation = document.querySelector('.inoculations');
  const disease = document.querySelector('.diseases');
  const parasite = document.querySelector('.parasites');

  image.style.backgroundImage = `url('${modalData.img}')`;
  namePet.innerText = modalData.name;
  kind.innerText = modalData.type;
  breed.innerText = modalData.breed;
  description.innerText = modalData.description;
  age.innerText = modalData.age;
  inoculation.innerText = modalData.inoculations;
  disease.innerText = modalData.diseases;
  parasite.innerText = modalData.parasites;

  modal.style.transform = 'translate(-100vw)';
  body.style.overflow = "hidden";
}

function closeMod() {
  modal.style.transform = '';
  body.style.overflow = "";
}

modalClose.addEventListener('click', closeMod);

function closeModal(event) {
  if (event.target === modal) {
    modal.style.transform = '';
  }
  document.body.style.overflow = "";
}

modal.addEventListener('click', (event) => closeModal(event));



// burger menu
const menu = document.querySelector('.burger-menu-form');
const burger = document.querySelector('.burger');
let menuStatus = 'close';

function newMenu() {
  menu.style.transform = 'translate(-100vw)';
  burger.style.transform = 'rotate(90deg)';
  body.style.overflow = "hidden";
  menuStatus = 'open';
}

function closeMenu() {
  menu.style.transform = '';
  burger.style.transform = 'rotate(0deg)';
  body.style.overflow = "";
  menuStatus = 'close';
}

burger.addEventListener('click', () => {
  if (menuStatus === 'close') {
    newMenu()
  }
  else {
    closeMenu()
  }
});

menu.addEventListener('click', closeMenu);

function checkArray(data) {
 
  // console.log(data, window.innerWidth)
  if(window.innerWidth >= '1280' && currentScreenSize !== 'large') {
    currentScreenSize = 'large';
    slidesCount = 3;
    columnGap = 90;
    // console.log(currentScreenSize);
    // globalArray = createLargeArr(data);
    // console.log(globalArray)
  } else if (window.innerWidth < '1280' && window.innerWidth >= '768' & currentScreenSize !== 'medium') {
    currentScreenSize = 'medium';
    slidesCount = 2;
    columnGap = 40;
    // console.log(currentScreenSize)
    // globalArray = createMediumArr(data);
    // console.log(globalArray)
  } else if (window.innerWidth < '767' && currentScreenSize !== 'small') {
    currentScreenSize = 'small';
    slidesCount = 1;
    columnGap = 0;
    // console.log(currentScreenSize)
    // globalArray = createSmallArr(data);
    // console.log(globalArray)
  }
  // console.log(window.innerWidth >= '1279' && currentScreenSize !== 'large', globalArray, currentScreenSize)
  // return globalArray;
  leftPosition = -cardsOuter.clientWidth - columnGap;
  cardsOuter.style.left = `${(leftPosition)}px`;
  cardsOuter.style.translate = '';
}

window.addEventListener('resize', ()=>{
  checkArray(globalData);
})





