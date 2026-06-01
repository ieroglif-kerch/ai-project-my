export class ModalPresenter {
  #model;
  #view;
  #activeSlideIndex = 0;
  #slideCount = 0;
  #lastFocusedElement = null;

  constructor(model, view) {
    this.#model = model;
    this.#view = view;
  }

  init() {
    this.#view.bind({
      onClose: () => this.close(),
      onSlidePrev: () => this.goToSlide(this.#activeSlideIndex - 1),
      onSlideNext: () => this.goToSlide(this.#activeSlideIndex + 1),
      onSlideTo: (index) => this.goToSlide(index),
    });
  }

  open(propertyId) {
    const property = this.#model.getPropertyById(propertyId);
    if (!property) return;

    const reviews = this.#model.getReviewsByPropertyId(propertyId);

    this.#lastFocusedElement = document.activeElement;
    this.#slideCount = property.images.length;
    this.#activeSlideIndex = 0;

    this.#view.show(property, reviews);
    this.#view.updateCarousel(this.#activeSlideIndex, this.#slideCount);
  }

  close() {
    this.#view.hide(this.#lastFocusedElement);
    this.#lastFocusedElement = null;
  }

  goToSlide(index) {
    if (this.#slideCount === 0) return;
    this.#activeSlideIndex = (index + this.#slideCount) % this.#slideCount;
    this.#view.updateCarousel(this.#activeSlideIndex, this.#slideCount);
  }
}
