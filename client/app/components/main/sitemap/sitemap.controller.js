'use strict';

export default class {
  constructor() {
    'ngInject';
    this.indicatorsSlided = false;
    this.publicationsSlided = false;
  }

  toggleIndicators = () => this.indicatorsSlided = !this.indicatorsSlided;

  togglePublications = () => this.publicationsSlided = !this.publicationsSlided;
}
