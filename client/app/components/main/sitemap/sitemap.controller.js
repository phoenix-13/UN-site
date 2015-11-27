'use strict';

export default class {
  constructor($timeout, categories) {
    'ngInject';
    this.categories = categories;
    this.indicatorsSlided = false;
    this.publicationsSlided = false;
    $timeout(() => document.getElementById('#indicatorsSlide').click());
    $timeout(() => document.getElementById('#publicationsSlide').click());
  }

  toggleIndicators = () => this.indicatorsSlided = !this.indicatorsSlided;

  togglePublications = () => this.publicationsSlided = !this.publicationsSlided;
}
