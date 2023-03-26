const optionDiv = document.querySelector('.card-container');
const cardsTextArray = ['Katrine', 'Jennifer', 'Woody', 'Sophia', 'Timmy', 'Charly', 'Scarlett', 'Freddie'];

const cardInner = `<div class="card-foto"></div>
<h4 class="header-4">Katrine</h4>
<button class="button">Learn more</button>`;

for (let i = 0; i < cardsTextArray.length; i++) {
  const divElement = document.createElement('div');

  divElement.className = `card card-${i + 1}`;
  divElement.innerHTML = cardInner;
  const textElement = divElement.querySelector('.header-4');
  textElement.innerHTML = cardsTextArray[i];
  optionDiv.append(divElement);
}