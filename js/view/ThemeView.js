export class ThemeView {
  #toggleBtn;
  #iconEl;
  #textEl;

  constructor(toggleBtn) {
    this.#toggleBtn = toggleBtn;
    this.#iconEl = toggleBtn?.querySelector('.theme-toggle__icon');
    this.#textEl = toggleBtn?.querySelector('.theme-toggle__text');
  }

  renderToggle(theme) {
    if (!this.#toggleBtn) return;

    const isDark = theme === 'dark';
    this.#toggleBtn.setAttribute(
      'aria-label',
      isDark ? 'Включить дневную тему' : 'Включить ночную тему'
    );
    this.#toggleBtn.setAttribute('aria-pressed', String(isDark));

    if (this.#iconEl) {
      this.#iconEl.textContent = isDark ? '☀️' : '🌙';
    }

    if (this.#textEl) {
      this.#textEl.textContent = isDark ? 'День' : 'Ночь';
    }
  }

  bindToggle(onToggle) {
    if (!this.#toggleBtn) return;
    this.#toggleBtn.addEventListener('click', onToggle);
  }
}
