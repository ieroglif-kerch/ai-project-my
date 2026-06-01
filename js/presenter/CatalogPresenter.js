export class CatalogPresenter {
  #model;
  #view;
  #onPropertySelect;

  constructor(model, view, onPropertySelect) {
    this.#model = model;
    this.#view = view;
    this.#onPropertySelect = onPropertySelect;
  }

  init() {
    this.#view.render(this.#model.getAllProperties());
    this.#view.bindPropertySelect((propertyId) => this.#onPropertySelect(propertyId));
  }
}
