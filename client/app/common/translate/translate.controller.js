'use strict';

export default class {
  constructor($state, LangService) {
    'ngInject';

    this.$state = $state;
    this.LangService = LangService;

    this.languages = LangService.getAllLanguages();

    LangService.useDefaultLang();
  }

  use(lang) {
    this.LangService.use(lang);
  }

  isActive(lang) {
    return lang === this.LangService.getCurrent();
  }
}

