import pets from '../../assets/utils/pets.js';

console.log(pets);
const menu = document.querySelector('.header__menu');
const menuButton = document.querySelector('.header__menu-button');

const toggleMenuButton = () => {
  menu.classList.toggle('header__menu_opened');
  menuButton.classList.contains('header__menu-button_theme_light')
    ? menuButton.classList.toggle('header__menu-button_theme_light_opened')
    : menuButton.classList.toggle('header__menu-button_opened');
};

const closeMenu = (e) => {
  if (e.target.classList.contains('header__menu-link')) {
    menuButton.classList.remove('header__menu-button_theme_light_opened');
    menuButton.classList.remove('header__menu-button_opened');
    menu.classList.remove('header__menu_opened');
  }
};

menuButton.addEventListener('click', toggleMenuButton);
menu.addEventListener('click', closeMenu);

const addCards = () => {
  pets.forEach((item) => {
    const card = new Card(item.name, item.img);
    const cardElement = card.generateCard();
    document.querySelector('.cards').append(cardElement);
  });
};

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

addCards();
