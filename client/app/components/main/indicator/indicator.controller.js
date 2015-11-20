'use strict';

export default class {
  constructor(indicator, categories) {
    'ngInject';
    this.indicator = indicator;
    this.categories = categories;
  }

  getSelectedCategory() {
    return this.categories.filter(category => category._id === this.indicator.category)[0];
  }
}
