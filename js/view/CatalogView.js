import { escapeHtml } from '../utils/escapeHtml.js';

export class CatalogView {
  #rootEl;

  constructor(rootEl) {
    this.#rootEl = rootEl;
  }

  render(properties) {
    this.#rootEl.innerHTML = properties
      .map(
        (property) => `
        <li class="card" data-property-id="${property.id}" tabindex="0" role="button" aria-label="Открыть ${escapeHtml(property.title)}">
          <div class="card__image card__image--${property.type}" role="img" aria-hidden="true">
            <span class="card__placeholder">${escapeHtml(property.typeIcon)}</span>
            <span class="card__badge">${escapeHtml(property.typeLabel)}</span>
          </div>
          <div class="card__body">
            <h2 class="card__title">${escapeHtml(property.title)}</h2>
            <p class="card__desc">${escapeHtml(property.shortDesc)}</p>
            <dl class="card__specs">
              <div class="card__spec">
                <dt>Тип</dt>
                <dd>${escapeHtml(property.shortSpecs.type)}</dd>
              </div>
              <div class="card__spec">
                <dt>Площадь</dt>
                <dd>${escapeHtml(property.shortSpecs.area)}</dd>
              </div>
              <div class="card__spec">
                <dt>Цена</dt>
                <dd>${escapeHtml(property.shortSpecs.price)}</dd>
              </div>
            </dl>
          </div>
        </li>
      `
      )
      .join('');
  }

  bindPropertySelect(onSelect) {
    this.#rootEl.addEventListener('click', (event) => {
      const card = event.target.closest('.card');
      if (!card) return;
      onSelect(card.dataset.propertyId);
    });

    this.#rootEl.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      const card = event.target.closest('.card');
      if (!card) return;
      event.preventDefault();
      onSelect(card.dataset.propertyId);
    });
  }
}
