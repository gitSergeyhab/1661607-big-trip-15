import Abstract from './abstract';


const MENU_BTN_CLASS_ACTIVE = 'trip-tabs__btn--active';

const createMenu = () => `
  <nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn  trip-tabs__btn--active" href="#" data-menu="table">Table</a>
    <a class="trip-tabs__btn" href="#" data-menu="stats">Stats</a>
  </nav>`;

export default class Menu extends Abstract {
  constructor() {
    super();
    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createMenu();
  }

  setMenuClickHandler(cb) {
    this._callback.clickMenu = cb;
    this.getElement().addEventListener('click', this._menuClickHandler);
  }

  _markThatBtn(target) {
    this.getElement().querySelectorAll('.trip-tabs__btn').forEach((btn) => btn.classList.remove(MENU_BTN_CLASS_ACTIVE));
    target.classList.add(MENU_BTN_CLASS_ACTIVE);
  }


  _menuClickHandler(evt) {
    evt.preventDefault();
    const dataMenu = evt.target.dataset.menu;
    if (dataMenu) {
      this._markThatBtn(evt.target);
      this._callback.clickMenu(dataMenu);
    }
  }

}
