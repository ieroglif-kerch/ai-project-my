import { escapeHtml } from '../utils/escapeHtml.js';

export class ModalView {
  #modalEl;
  #titleEl;
  #descEl;
  #specsEl;
  #reviewsEl;
  #trackEl;
  #dotsEl;
  #prevBtn;
  #nextBtn;

  constructor() {
    this.#modalEl = document.getElementById('product-modal');
    this.#titleEl = document.getElementById('modal-title');
    this.#descEl = document.getElementById('modal-desc');
    this.#specsEl = document.getElementById('modal-specs');
    this.#reviewsEl = document.getElementById('modal-reviews');
    this.#trackEl = document.getElementById('carousel-track');
    this.#dotsEl = document.getElementById('carousel-dots');
    this.#prevBtn = document.querySelector('.carousel__btn--prev');
    this.#nextBtn = document.querySelector('.carousel__btn--next');
  }

  isOpen() {
    return !this.#modalEl.hidden;
  }

  show(property, reviews) {
    this.#titleEl.textContent = `${property.title} · ${property.typeLabel}`;
    this.#descEl.textContent = property.fullDesc;
    this.#renderSpecs(property.fullSpecs);
    this.#renderReviews(reviews);
    this.#renderCarouselSlides(property.images);

    this.#modalEl.hidden = false;
    this.#modalEl.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');

    this.#prevBtn.focus();
  }

  hide(restoreFocusEl) {
    this.#modalEl.hidden = true;
    this.#modalEl.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');

    if (restoreFocusEl && typeof restoreFocusEl.focus === 'function') {
      restoreFocusEl.focus();
    }
  }

  updateCarousel(activeIndex, slideCount) {
    this.#trackEl.style.transform = `translateX(-${activeIndex * 100}%)`;

    this.#trackEl.querySelectorAll('.carousel__slide').forEach((slide, index) => {
      slide.setAttribute('aria-hidden', index !== activeIndex);
    });

    this.#dotsEl.querySelectorAll('.carousel__dot').forEach((dot, index) => {
      dot.classList.toggle('carousel__dot--active', index === activeIndex);
    });

    this.#prevBtn.disabled = slideCount <= 1;
    this.#nextBtn.disabled = slideCount <= 1;
  }

  #renderSpecs(fullSpecs) {
    this.#specsEl.innerHTML = Object.entries(fullSpecs)
      .map(
        ([label, value]) => `
        <div class="modal__spec-row">
          <dt>${escapeHtml(label)}</dt>
          <dd>${escapeHtml(value)}</dd>
        </div>
      `
      )
      .join('');
  }

  #renderReviews(reviews) {
    if (reviews.length === 0) {
      this.#reviewsEl.innerHTML = '<p class="modal__reviews-empty">Пока нет отзывов.</p>';
      return;
    }

    this.#reviewsEl.innerHTML = reviews
      .map(
        (review) => `
        <article class="review" data-review-id="${review.id}">
          <div class="review__avatar" aria-hidden="true">${escapeHtml(review.userIcon)}</div>
          <div class="review__content">
            <h3 class="review__author">${escapeHtml(review.userName)}</h3>
            <p class="review__comment">${escapeHtml(review.comment)}</p>
          </div>
        </article>
      `
      )
      .join('');
  }

  #renderCarouselSlides(images) {
    this.#trackEl.innerHTML = images
      .map(
        (label, index) => `
        <div class="carousel__slide" data-slide="${index}" aria-hidden="${index !== 0}">
          <div class="carousel__placeholder" style="--hue: ${(index * 28 + 18) % 55}">
            <span class="carousel__placeholder-label">${escapeHtml(label)}</span>
          </div>
        </div>
      `
      )
      .join('');

    this.#dotsEl.innerHTML = images
      .map(
        (_, index) => `
        <button
          type="button"
          class="carousel__dot${index === 0 ? ' carousel__dot--active' : ''}"
          data-slide-to="${index}"
          aria-label="Слайд ${index + 1} из ${images.length}"
        ></button>
      `
      )
      .join('');
  }

  bind(handlers) {
    this.#modalEl.addEventListener('click', (event) => {
      if (event.target.closest('[data-close]')) {
        handlers.onClose();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (!this.isOpen()) return;

      if (event.key === 'Escape') {
        handlers.onClose();
        return;
      }

      if (event.key === 'ArrowLeft') {
        handlers.onSlidePrev();
      }

      if (event.key === 'ArrowRight') {
        handlers.onSlideNext();
      }
    });

    this.#dotsEl.addEventListener('click', (event) => {
      const slideTo = event.target.closest('[data-slide-to]');
      if (slideTo) {
        handlers.onSlideTo(Number(slideTo.dataset.slideTo));
      }
    });

    this.#prevBtn.addEventListener('click', handlers.onSlidePrev);
    this.#nextBtn.addEventListener('click', handlers.onSlideNext);
  }
}
