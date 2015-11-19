'use strict';

const LANGUAGES = ['geo', 'eng'];
const LOCAL_LANG_KEY = 'un-site.local_lang';
const DEF_LANG = 'geo';

export default class {
  constructor($translate, $cookies) {
    'ngInject';

    this.$translate = $translate;
    this.$cookies = $cookies;
  }

  getAllLanguages() {
    return LANGUAGES;
  }

  useDefaultLang() {
    var lang = this.$cookies.get(LOCAL_LANG_KEY) || DEF_LANG;
    this.use(lang);
  }

  use(lang) {
    this.$cookies.put(LOCAL_LANG_KEY, lang);
    this.$translate.use(lang);
  }

  getCurrent() {
    return this.$translate.use();
  }
}
