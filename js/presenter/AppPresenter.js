import properties from '../../data/properties.json';
import reviews from '../../data/reviews.json';
import { CatalogModel } from '../model/CatalogModel.js';
import { ThemeModel } from '../model/ThemeModel.js';
import { CatalogView } from '../view/CatalogView.js';
import { ModalView } from '../view/ModalView.js';
import { ThemeView } from '../view/ThemeView.js';
import { CatalogPresenter } from './CatalogPresenter.js';
import { ModalPresenter } from './ModalPresenter.js';
import { ThemePresenter } from './ThemePresenter.js';

export class AppPresenter {
  #catalogPresenter;
  #modalPresenter;
  #themePresenter;

  constructor() {
    const catalogModel = new CatalogModel(properties, reviews);
    const themeModel = new ThemeModel();

    const catalogView = new CatalogView(document.querySelector('.catalog'));
    const modalView = new ModalView();
    const themeView = new ThemeView(document.getElementById('theme-toggle'));

    this.#modalPresenter = new ModalPresenter(catalogModel, modalView);
    this.#catalogPresenter = new CatalogPresenter(catalogModel, catalogView, (propertyId) =>
      this.#modalPresenter.open(propertyId)
    );
    this.#themePresenter = new ThemePresenter(themeModel, themeView);
  }

  init() {
    this.#themePresenter.init();
    this.#catalogPresenter.init();
    this.#modalPresenter.init();
  }
}
