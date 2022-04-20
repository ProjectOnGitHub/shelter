export default class Popup {
  constructor(name, img, breed, type, description, age, inoculations, diseases, parasites) {
    this.name = name;
    this.img = img;
    this.breed = breed;
    this.type = type;
    this.description = description;
    this.age = age;
    this.inoculations = inoculations;
    this.diseases = diseases;
    this.parasites = parasites;
  }

  addInfo() {
    this.popup = document.querySelector('.popup');
    this.popup.querySelector('.popup__image').src = this.img;
    this.popup.querySelector('.popup__image').alt = this.name;
    this.popup.querySelector('.popup__title').textContent = this.name;
    this.popup.querySelector('.popup__subtitle_type').textContent = this.type;
    this.popup.querySelector('.popup__subtitle_breed').textContent = this.breed;
    this.popup.querySelector('.popup__text').textContent = this.description;
    this.popup.querySelector('.popup__list-item_value_inoculations').textContent = this.inoculations;
    this.popup.querySelector('.popup__list-item_value_diseases').textContent = this.diseases;
    this.popup.querySelector('.popup__list-item_value_parasites').textContent = this.parasites;
    return this.popup;
  }
}
