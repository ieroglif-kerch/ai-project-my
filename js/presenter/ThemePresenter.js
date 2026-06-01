export class ThemePresenter {
  #model;
  #view;

  constructor(model, view) {
    this.#model = model;
    this.#view = view;
  }

  init() {
    const saved = this.#model.getSavedTheme();
    const theme = saved ?? this.#model.getDefaultTheme();
    this.#model.setTheme(theme);
    this.#view.renderToggle(theme);
    this.#view.bindToggle(() => this.toggle());
  }

  toggle() {
    const theme = this.#model.toggleTheme();
    this.#view.renderToggle(theme);
  }
}
