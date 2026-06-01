export class CatalogModel {
  #properties;
  #reviewsByProperty;

  constructor(properties, reviews) {
    this.#properties = properties;
    this.#reviewsByProperty = reviews.reduce((map, review) => {
      const key = review.propertyId ?? review.productId;
      if (!map[key]) {
        map[key] = [];
      }
      map[key].push(review);
      return map;
    }, {});
  }

  getAllProperties() {
    return this.#properties;
  }

  getPropertyById(propertyId) {
    return this.#properties.find((property) => property.id === propertyId) ?? null;
  }

  getReviewsByPropertyId(propertyId) {
    return this.#reviewsByProperty[propertyId] ?? [];
  }
}
