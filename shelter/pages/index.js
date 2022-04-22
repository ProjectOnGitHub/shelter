import Card from './Card.js';
import pets from '../assets/utils/pets.js';

// import Popup from './Popup.js';

// const url = '../../assets/utils/pets.json';

const popup = document.querySelector('.popup');
const cardsList = document.querySelector('.cards');

const popupButtonClose = document.querySelector('.popup__close-button');

const menu = document.querySelector('.header__menu');
const menuButton = document.querySelector('.header__menu-button');

const buttonPrev = document.querySelector('.slider__button_prev');
const buttonNext = document.querySelector('.slider__button_next');

function movePrevSlide() {
  getRandomCard();
  cardsList.classList.add('transition-prev');
  buttonPrev.removeEventListener('click', movePrevSlide);
  buttonNext.removeEventListener('click', moveNextSlide);
}

function moveNextSlide() {
  getRandomCard();
  cardsList.classList.add('transition-next');
  buttonPrev.removeEventListener('click', movePrevSlide);
  buttonNext.removeEventListener('click', moveNextSlide);
}

function removeTransitionPrev() {
  cardsList.classList.remove('transition-prev');
  buttonPrev.addEventListener('click', movePrevSlide);
}
function removeTransitionNext() {
  cardsList.classList.remove('transition-next');
  buttonNext.addEventListener('click', moveNextSlide);
}

cardsList.addEventListener('animationend', removeTransitionNext);

cardsList.addEventListener('animationend', removeTransitionPrev);

buttonPrev.addEventListener('click', movePrevSlide);
buttonNext.addEventListener('click', moveNextSlide);

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

const createCard = (arr) => {
  removeCards();
  arr.forEach((index) => {
    pets.forEach((item, i) => {
      if (i === index) {
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
      }
    });
  });
};

function removeCards() {
  const cards = document.querySelectorAll('.cards__item');
  cards.forEach((item) => item.remove());
}

function getRandomCard() {
  let counter;

  const currentPage = document.location.pathname;
  if (window.matchMedia('(min-width: 1280px)').matches) {
    currentPage.includes('main')
      ? counter = -3
      : counter = 0;
  } else if (window.matchMedia('(min-width: 768px)').matches && window.matchMedia('(max-width: 1279.2px)').matches) {
    currentPage.includes('main')
      ? counter = -2
      : counter = 1;
  } else {
    currentPage.includes('main')
      ? counter = -1
      : counter = 2;
  }
  const arr = [0, 1, 2, 3, 4, 5, 6, 7]
    .sort(() => 0.5 - Math.random())
    .slice(counter).sort();

  createCard(arr);
}

getRandomCard();
function openPopup(e) {
  const currentElement = e.target.closest('.cards__item').querySelector('.cards__caption').textContent;
  addInfoToPopup(currentElement);
  popup.classList.add('popup_opened');
}

function closePopup(e) {
  if (e.target.classList.contains('popup')
    || e.currentTarget.classList.contains('popup__close-button')) {
    popup.classList.remove('popup_opened');
  }
}
cardsList.addEventListener('click', openPopup);
popupButtonClose.addEventListener('click', closePopup);
popup.addEventListener('click', closePopup);

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
