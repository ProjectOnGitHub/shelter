const url = '../../assets/utils/pets.json';

async function getPets() {
  const res = await fetch(url);
  const data = await res.json();
  return data.forEach((item) => {
    const card = new Card(item.name, item.img);

    const cardElement = card.generateCard();

    document.querySelector('.cards').append(cardElement);
  });
}

class Card {
  constructor(name, img) {
    this.name = name;
    this.img = img;
  }

  getTemplate() {
    const cardElement = document
      .querySelector('.cards__template')
      .content
      .querySelector('.cards__item')
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this.element = this.getTemplate();
    this.element.querySelector('.cards__image').src = this.img;
    this.element.querySelector('.cards__image').alt = this.name;
    this.element.querySelector('.cards__caption').textContent = this.name;
    return this.element;
  }
}

getPets();
