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
const containerDiv = document.querySelector('.cards-container');
const modal = document.querySelector('.pets-modal');
const modalInner = document.querySelector('.pets-modal-inner');
const modalClose = document.querySelector('.modal-close');
const arrowLeft = document.querySelector('.arrow-left');
const arrowRight = document.querySelector('.arrow-right');
const sliderInner = document.querySelector('.slider-inner'); 
const slider = document.querySelector('.slider');
const cardsOuter = document.querySelector('.cards-container-outer');

let sortArray;
let count = 1;
let columnGap = '90px';
// let currentPosition = '0px';
let currentPosition = 0;
let leftPosition = 0;
let slidesCount = 6;
let currentArray;
let prevArray;
let experimentalData = Array(8).fill(0).map((el, i) => i + 1);
let isBackClicked = false;
let isNextClicked = false;

const cardInner = `<div class="card-foto"></div>
<h4 class="header-4"></h4>
<button class="button">Learn more</button>`;

fetch('../pets.json')
.then(response => response.json())
.then ((data)=> {
  //cards constructor from json 

  sortArray = data.sort(() => Math.random() - 0.5);
  // ortArray.length = slidesCount;
  currentArray = createNextArray();
  console.log(currentArray);


  for (let i = 0; i < sortArray.length; i++) {
    const cardElement = document.createElement('div');
    cardElement.className = `card`;
    cardElement.innerHTML = cardInner;
    const textElement = cardElement.querySelector('.header-4');
    textElement.innerHTML = sortArray[i].name;
    const fotoElement = cardElement.querySelector('.card-foto');
    fotoElement.style.backgroundImage = `url('${sortArray[i].img}')`;
    containerDiv.append(cardElement);
    cardElement.addEventListener('click', () => openModal(sortArray[i]));
  }

  cloneCard(containerDiv);
  console.log(`${-containerDiv.clientWidth}px + ${columnGap}`);
  leftPosition = -2070 - 90;
  cardsOuter.style.left = `${(leftPosition)}px`;
  // cardsOuter.style.left = `calc(${-containerDiv.clientWidth}px - ${columnGap})`;
  
  
})



function createNextArray() {
  let arr = [];
  if (!!currentArray) {
    experimentalData.forEach(el => {
      if (!currentArray.includes(el)){
      arr.push(el);
      }
    });
    arr.sort(() => Math.random() - 0.5);
    
  } else {
    arr = experimentalData.map(el=>el).sort(() => Math.random() - 0.5);
  }
  arr.length = 3;  
  return arr;
}














function cloneCard(container) {
  const cloneItem = container.cloneNode(true);
  cardsOuter.appendChild(cloneItem);
  // const cloneItem2 = container.cloneNode(true);
  // container.before(cloneItem2);
}

function prevSlide() {
  currentPosition = `calc(${currentPosition} + 100% + ${columnGap})`;
  cardsOuter.style.translate = currentPosition;
  // if (count < 2) {
  //   count ++;
  //   cardsOuter.style.left = `calc(${-containerDiv.clientWidth}px - ${columnGap})`;

  // }

console.log(isNextClicked, 'next')
  //todo: remove
if(!isNextClicked) {
  prevArray = currentArray;
  currentArray = createNextArray();
  
} else {
  isNextClicked = false;
  let state = currentArray.map(el => el);
    currentArray = prevArray.map(el => el);
    prevArray = state;
}
isBackClicked = true;
  // currentArray = createNextArray();
  console.log(prevArray, currentArray)
}

arrowRight.addEventListener('click', nextSlide);

// count = 1;
function nextSlide() {
  // cardsOuter.style.transform = 'translate(-100% + 90px)';
  // currentPosition = `calc(${currentPosition} - 100% - ${columnGap})`;
  currentPosition = currentPosition - 991 - 90;

  cardsOuter.style.translate = `${currentPosition}px`;
  count ++;
  console.log(count);
  if (count  === 2) {
    count = 0;
    leftPosition = leftPosition - currentPosition + 991 + 90;
    cardsOuter.style.left = `${leftPosition}px`;
    // cardsOuter.style.left = `calc(${cardsOuter.style.left} - ${currentPosition})`;
  }

//todo: remove
if(!isBackClicked) {
  prevArray = currentArray;
  currentArray = createNextArray();

} else {
  let state = currentArray.map(el => el);
  currentArray = prevArray.map(el => el);
  prevArray = state;
  isBackClicked = false;
}
isNextClicked = true;
console.log(prevArray, currentArray)
}

arrowLeft.addEventListener('click', prevSlide);


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

burger.addEventListener('click',()=> {
  if(menuStatus === 'close') {
    newMenu()
  }
  else {
    closeMenu()
  }
});

menu.addEventListener('click', closeMenu);





