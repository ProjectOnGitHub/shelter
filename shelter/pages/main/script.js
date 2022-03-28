const menu = document.querySelector('.header__menu');
const menuButton = document.querySelector('.header__menu-button');

const toggleMenuButton = () => {
  menu.classList.toggle('header__menu_opened');
  menuButton.classList.contains('header__menu-button_light')
    ? menuButton.classList.toggle('header__menu-button_light_opened')
    : menuButton.classList.toggle('header__menu-button_opened');
};

const closeMenu = (e) => {
  if (e.target.classList.contains('header__menu-link')) {
    menuButton.classList.remove('header__menu-button_opened');
    menu.classList.remove('header__menu_opened');
  }
};

menuButton.addEventListener('click', toggleMenuButton);
menu.addEventListener('click', closeMenu);
