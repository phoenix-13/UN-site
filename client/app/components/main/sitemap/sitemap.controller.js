'use strict';

export default class {
  constructor(categories) {
    'ngInject';
    this.categories = categories;
    this.indicatorsSlided = false;
    this.publicationsSlided = false;
  }

  toggleIndicators = () => this.indicatorsSlided = !this.indicatorsSlided;

  togglePublications = () => this.publicationsSlided = !this.publicationsSlided;
}
