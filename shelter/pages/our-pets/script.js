console.log(``)

const body = document.querySelector('body');
const containerDiv = document.querySelector('.card-container-inner');
const modal = document.querySelector('.pets-modal');
const modalInner = document.querySelector('.pets-modal-inner');
const modalClose = document.querySelector('.modal-close');
const arrowRight = document.querySelector('.arrow-right');

const doblArrowRight = document.querySelector('.dobl-arrow-right');
const arrowLeft = document.querySelector('.arrow-left');
const doblArrowLeft = document.querySelector('.dobl-arrow-left');
const number = document.querySelector('.number'); 


const menu = document.querySelector('.burger-menu-form');
const burger = document.querySelector('.burger');
const burgerLinea = document.querySelectorAll('.burger-linea');
let menuStatus = 'close';


function newMenu() {
  menu.style.transform = 'translate(-100vw)';
  burger.style.transform = 'rotate(90deg)';
  burgerLinea.forEach((el)=> el.style.border = '1px solid #F1CDB3');
  body.style.overflow = 'hidden';
  menuStatus = 'open';
}

function closeMenu() {
  menu.style.transform = '';
  burger.style.transform = 'rotate(0deg)';
  burgerLinea.forEach((el)=> el.style.border = '1px solid #000000');
  body.style.overflow = '';
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


const cardInner = `<div class="card-foto"></div>
<h4 class="header-4"></h4>
<button class="button">Learn more</button>`;

let globalArray = [];
let dataFromJson = [];
let currentPage = 1;
let currentScreenSize;

fetch('../pets.json')
.then(response => response.json())
.then ((data)=> {
  dataFromJson = data;
   checkArray(data);

  createCards(globalArray[0]);
  

  // console.log(createLargeArr(data))
})

function createCards(data) {
  for (let i = 0; i < data.length; i++) {
    const cardElement = document.createElement('div');
    cardElement.className = `card`;
    cardElement.innerHTML = cardInner;
    const textElement = cardElement.querySelector('.header-4');
    textElement.innerHTML = data[i].name;
    const fotoElement = cardElement.querySelector('.card-foto');
    fotoElement.style.backgroundImage = `url('${data[i].img}')`;
    containerDiv.append(cardElement);
    cardElement.addEventListener('click', () => openModal(data[i]));
  }
}

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


function onNextClick() {
  if (currentPage < globalArray.length) {
    currentPage++;
    number.innerText = currentPage;
    containerDiv.innerHTML='';
    createCards(globalArray[currentPage - 1]);
    checkDisabled();
  } 
}

arrowRight.addEventListener('click', onNextClick);

function onPrevClick() {
  if (currentPage > 1) {
    currentPage--;
    number.innerText = currentPage;
    containerDiv.innerHTML='';
    createCards(globalArray[currentPage - 1]);
    checkDisabled();
  } 
}

arrowLeft.addEventListener('click', onPrevClick);

function onDobleNext() {
  if(currentPage < globalArray.length) {
    currentPage = globalArray.length;
    number.innerText = currentPage;
    containerDiv.innerHTML='';
    createCards(globalArray[currentPage - 1]);
    checkDisabled();
  }
}

doblArrowRight.addEventListener('click', onDobleNext);

function onDoblePrev() {
  if(currentPage > 1) {
    currentPage = 1;
    number.innerText = currentPage;
    containerDiv.innerHTML='';
    createCards(globalArray[currentPage - 1]);
    checkDisabled();
  }
}

doblArrowLeft.addEventListener('click', onDoblePrev);

function checkDisabled() {
  if (currentPage === globalArray.length) {
    arrowRight.disabled = true;
    doblArrowRight.disabled = true;
  } else {
    arrowRight.disabled = false;
    doblArrowRight.disabled = false;
  }
  if (currentPage === 1) {
    arrowLeft.disabled = true;
    doblArrowLeft.disabled = true;
  } else {
    arrowLeft.disabled = false;
    doblArrowLeft.disabled = false;
  }
}

checkDisabled();


function createLargeArr(arr) {
  const matrix = Array(6).fill(arr);
  return matrix.map((el) => 
    el.map(e => e).sort(() => Math.random() - 0.5)   
  )

}

function createMediumArr(arr) {
  const matrix = Array(8).fill(arr);
  return matrix.map((el) => 
    el.map(e => e).sort(() => Math.random() - 0.5)    
  )

}

function createSmallArr(arr) {
  const matrix = Array(16).fill(arr);
  return matrix.map((el) => 
    el.map(e => e).sort(() => Math.random() - 0.5)    
  )

}

function checkArray(data) {
  // console.log(data, window.innerWidth)
  if(window.innerWidth >= '1279' && currentScreenSize !== 'large') {
    currentScreenSize = 'large';
    // console.log(currentScreenSize);
    globalArray = createLargeArr(data);
    // console.log(globalArray)
  } else if (window.innerWidth < '1279' && window.innerWidth >= '768' & currentScreenSize !== 'medium') {
    currentScreenSize = 'medium';
    // console.log(currentScreenSize)
    globalArray = createMediumArr(data);
    console.log(globalArray)
  } else if (window.innerWidth < '767' && currentScreenSize !== 'small') {
    currentScreenSize = 'small';
    // console.log(currentScreenSize)
    globalArray = createSmallArr(data);
    // console.log(globalArray)
  }
  // console.log(window.innerWidth >= '1279' && currentScreenSize !== 'large', globalArray, currentScreenSize)
  return globalArray;
}

window.addEventListener('resize', ()=>{
  checkArray(dataFromJson);
})

