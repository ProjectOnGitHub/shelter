import Card from './Card.js';
import pets from '../assets/utils/pets.js';

// import Popup from './Popup.js';

// const url = '../../assets/utils/pets.json';

const popup = document.querySelector('.popup');
const popupButtonOpen = document.querySelector('.cards');

const popupButtonClose = document.querySelector('.popup__close-button');

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

// const pets = [];

const addCard = (card) => {
  const cardElement = card.generateCard();
  document.querySelector('.cards').append(cardElement);
};

const createCard = () => {
  pets.forEach((item) => {
    const card = new Card(
      item.name,
      item.img,
      item.breed,
      item.type,
      item.description,
      item.age,
      item.inoculations,
      item.diseases,
      item.parasites,
    );

    return addCard(card);
  });
};

createCard();

function openPopup(e) {
  const currentElement = e.target.closest('.cards__item').querySelector('.cards__caption').textContent;
  addInfoToPopup(currentElement);

  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

popupButtonOpen.addEventListener('click', openPopup);
popupButtonClose.addEventListener('click', closePopup);

function addInfoToPopup(element) {
  pets.forEach((item) => {
    if (element === item.name) {
      const card = new Card(
        item.name,
        item.img,
        item.breed,
        item.type,
        item.description,
        item.age,
        item.inoculations,
        item.diseases,
        item.parasites,
      );
      return card.addInfo();
    }
  });
}
