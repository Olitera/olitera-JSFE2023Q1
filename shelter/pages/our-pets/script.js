console.log(``)

const body = document.querySelector('body');
const containerDiv = document.querySelector('.card-container-inner');
const modal = document.querySelector('.pets-modal');
const modalInner = document.querySelector('.pets-modal-inner');
const modalClose = document.querySelector('.modal-close');

const cardInner = `<div class="card-foto"></div>
<h4 class="header-4"></h4>
<button class="button">Learn more</button>`;

fetch('https://raw.githubusercontent.com/rolling-scopes-school/olitera-JSFE2023Q1/shelter-part3/shelter/pages/pets.json?token=GHSAT0AAAAAAB7NUPOIKOLFMAEXMSMUFWP6ZBS4GIQ')
.then(response => response.json())
.then ((data)=> {
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
})

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

  modal.style.transform = 'translate(0vw)';
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


const menu = document.querySelector('.burger-menu-form');
const burger = document.querySelector('.burger');
const burgerLinea = document.querySelector('.burger-linea');

function newMenu() {
  menu.style.transform = 'translate(0vw)';
  burger.style.transform = 'rotate(90deg)';
  burgerLinea.style.border = '1px solid #F1CDB3';
  body.style.overflow = 'hidden';
}

burger.addEventListener('click', newMenu);

function closeMenu() {
  menu.style.transform = '';
  burger.style.transform = 'rotate(0deg)';
  burgerLinea.style.border = '1px solid #000000';
  body.style.overflow = '';
}

menu.addEventListener('click', closeMenu);



