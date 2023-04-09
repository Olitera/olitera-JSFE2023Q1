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


// cards constrictor from json in slider
const containerDiv = document.querySelector('.slider-inner');

const cardInner = `<div class="card-foto"></div>
<h4 class="header-4"></h4>
<button class="button">Learn more</button>`;

fetch('https://raw.githubusercontent.com/rolling-scopes-school/olitera-JSFE2023Q1/shelter-part3/shelter/pages/pets.json?token=GHSAT0AAAAAAB7NUPOIPREQ4HD27UDSYSIUZBSPVSA')
.then(response => response.json())
.then ((data)=> {
  console.log(data[0].name)
  for (let i = 0; i < data.length; i++) {
    // console.log(data[i]);
    const cardElement = document.createElement('div');
    cardElement.className = `card`;
    cardElement.innerHTML = cardInner;
    const textElement = cardElement.querySelector('.header-4');
    textElement.innerHTML = data[i].name;
    const fotoElement = cardElement.querySelector('.card-foto');
    fotoElement.style.backgroundImage = `url('${data[i].img}')`;
    containerDiv.append(cardElement);
    cardElement.addEventListener('click', openModal);
  }
})



const modal = document.querySelector('.pets-modal');
const modalClose = document.querySelector('.modal-close');

function openModal() {
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



// burger menu
const menu = document.querySelector('.burger-menu-form');
const burger = document.querySelector('.burger');

function newMenu() {
  menu.style.transform = 'translate(0vw)';
  burger.style.transform = 'rotate(90deg)';
  body.style.overflow = "hidden"
}

burger.addEventListener('click', newMenu);

function closeMenu() {
  menu.style.transform = '';
  burger.style.transform = 'rotate(0deg)';
  body.style.overflow = "";
}

menu.addEventListener('click', closeMenu);





