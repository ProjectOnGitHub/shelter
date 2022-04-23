import Card from './Card.js';
import pets from '../assets/utils/pets.js';

// Cards
const currentPage = document.querySelector('.slider__button_active');
const addCard = (card) => {
  const cardElement = card.generateCard();
  document.querySelector('.cards').append(cardElement);
};

const removeCards = () => {
  const cards = document.querySelectorAll('.cards__item');
  cards.forEach((item) => item.remove());
};
const fullArr = [];
let currentPageNumber = 1;

const createCard = () => {
  removeCards();
  fullArr[currentPageNumber - 1].forEach((index) => {
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

function sliceIntoChunks(array, chunkSize) {
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    fullArr.push(chunk.sort(() => 0.5 - Math.random()));
  }
  createCard();
}

function generateArr(counter) {
  const arr = [];
  for (let i = 0; i < 6; i++) {
    const item = [0, 1, 2, 3, 4, 5, 6, 7];
    arr.push(...item);
  }
  sliceIntoChunks(arr, counter);
}

const getRandomCard = () => {
  let counter;
  const currentPath = document.location.pathname;
  if (window.matchMedia('(min-width: 1280px)').matches) {
    currentPath.includes('main') ? counter = 3 : counter = 8;
  } else if (window.matchMedia('(min-width: 768px)').matches && window.matchMedia('(max-width: 1279.2px)').matches) {
    currentPath.includes('main') ? counter = 2 : counter = 6;
  } else {
    currentPath.includes('main') ? counter = 1 : counter = 3;
  }
  return generateArr(counter);
};

getRandomCard();

// Slider and pagination
const cardsList = document.querySelector('.cards');
const buttonPrev = document.querySelector('.slider__button_prev');
const buttonNext = document.querySelector('.slider__button_next');
const buttonStart = document.querySelector('.slider__button_start');
const buttonEnd = document.querySelector('.slider__button_end');

const disablePage = () => {
  if (currentPageNumber === fullArr.length) {
    buttonNext.classList.add('slider__button_disabled');
    buttonEnd.classList.add('slider__button_disabled');
    buttonPrev.classList.remove('slider__button_disabled');
    buttonStart.classList.remove('slider__button_disabled');
  } else if (currentPageNumber <= 1 && currentPageNumber !== fullArr.length) {
    buttonPrev.classList.add('slider__button_disabled');
    buttonStart.classList.add('slider__button_disabled');
    buttonNext.classList.remove('slider__button_disabled');
    buttonEnd.classList.remove('slider__button_disabled');
  } else if (currentPageNumber > 1 && currentPageNumber !== fullArr.length) {
    buttonPrev.classList.remove('slider__button_disabled');
    buttonStart.classList.remove('slider__button_disabled');
    buttonNext.classList.remove('slider__button_disabled');
    buttonEnd.classList.remove('slider__button_disabled');
  }
};

const removeListeners = () => {
  buttonStart.removeEventListener('click', moveStart);
  buttonEnd.removeEventListener('click', moveEnd);
  buttonPrev.removeEventListener('click', movePrevSlide);
  buttonNext.removeEventListener('click', moveNextSlide);
};

const movePrevSlide = () => {
  currentPageNumber -= 1;
  disablePage();
  currentPage.textContent = currentPageNumber;
  createCard();
  cardsList.classList.add('transition-prev');
  removeListeners();
};

const moveNextSlide = () => {
  currentPageNumber += 1;
  disablePage();
  currentPage.textContent = currentPageNumber;
  createCard();
  cardsList.classList.add('transition-next');
  removeListeners();
};

const moveStart = () => {
  currentPageNumber = 1;
  disablePage();
  currentPage.textContent = currentPageNumber;
  createCard();
  cardsList.classList.add('transition-prev');
  removeListeners();
};

const moveEnd = () => {
  currentPageNumber = fullArr.length;
  disablePage();
  currentPage.textContent = currentPageNumber;
  createCard();
  cardsList.classList.add('transition-next');
  removeListeners();
};

const removeTransitionPrev = () => {
  cardsList.classList.remove('transition-prev');
  buttonPrev.addEventListener('click', movePrevSlide);
  buttonStart.addEventListener('click', moveStart);
};

const removeTransitionNext = () => {
  cardsList.classList.remove('transition-next');
  buttonNext.addEventListener('click', moveNextSlide);
  buttonEnd.addEventListener('click', moveEnd);
};

cardsList.addEventListener('animationend', removeTransitionNext);
cardsList.addEventListener('animationend', removeTransitionPrev);
buttonPrev.addEventListener('click', movePrevSlide);
buttonNext.addEventListener('click', moveNextSlide);
buttonStart.addEventListener('click', moveStart);
buttonEnd.addEventListener('click', moveEnd);

// Burger menu
const menu = document.querySelector('.header__menu');
const menuButton = document.querySelector('.header__menu-button');
const menuOverlay = document.querySelector('.overlay');

const toggleMenuButton = () => {
  menu.classList.toggle('header__menu_opened');
  menuOverlay.classList.toggle('overlay_active');
  document.body.classList.toggle('scroll-lock');
  menuButton.classList.contains('header__menu-button_theme_light')
    ? menuButton.classList.toggle('header__menu-button_theme_light_opened')
    : menuButton.classList.toggle('header__menu-button_opened');
};

const closeMenu = (e) => {
  if (e.target.classList.contains('header__menu-link') || e.target.classList.contains('overlay')) {
    menuButton.classList.remove('header__menu-button_theme_light_opened');
    menuButton.classList.remove('header__menu-button_opened');
    menu.classList.remove('header__menu_opened');
    menuOverlay.classList.remove('overlay_active');
    document.body.classList.remove('scroll-lock');
  }
};

menuButton.addEventListener('click', toggleMenuButton);
menu.addEventListener('click', closeMenu);
menuOverlay.addEventListener('click', closeMenu);

// Popup
const popup = document.querySelector('.popup');
const popupButtonClose = document.querySelector('.popup__close-button');

const addInfoToPopup = (element) => {
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
};

const openPopup = (e) => {
  const currentElement = e.target.closest('.cards__item').querySelector('.cards__caption').textContent;
  document.body.classList.add('scroll-lock');
  addInfoToPopup(currentElement);
  popup.classList.add('popup_opened');
};

const closePopup = (e) => {
  if (e.target.classList.contains('popup')
    || e.currentTarget.classList.contains('popup__close-button')) {
    popup.classList.remove('popup_opened');
    document.body.classList.remove('scroll-lock');
  }
};
cardsList.addEventListener('click', openPopup);
popupButtonClose.addEventListener('click', closePopup);
popup.addEventListener('click', closePopup);
