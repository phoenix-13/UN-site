'use strict';

export default class {
  constructor(indicator, categories, LangService) {
    'ngInject';
    this.indicator = indicator;
    this.categories = categories;
    this.LangService = LangService;
  }

  getSelectedCategory() {
    return this.categories.filter(category => category._id === this.indicator.category)[0];
  }

  engIndicatorExists(){
    return this.LangService.getCurrent() === 'geo'
      || (this.indicator.title.eng || this.indicator.content.eng);
  }
}
