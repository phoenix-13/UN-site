'use strict';

export default $translateProvider => {
  'ngInject';
  $translateProvider
    .translations('eng', {
      HOME: 'Home',
      ABOUT: 'About',
      PUBLICATIONS: 'Publications',
      INDICATORS: 'Indicators',
      ALL: 'all',
      JUNIOR_POLITICS_MONITORING: 'Junior politics monitoring',
      SEARCH: 'search..',

      T: '{{eng}}'
    })
    .translations('geo', {
      HOME: 'მთავარი',
      ABOUT: 'ჩვენს შესახებ',
      PUBLICATIONS: 'პუბლიკაციები',
      INDICATORS: 'ინდიკატორები',
      ALL: 'ყველა',
      JUNIOR_POLITICS_MONITORING: 'ახალგაზრდული პოლიტიკის მონიტორი',
      SEARCH: 'ძებნა..',

      T: '{{geo}}'
    })
    .useSanitizeValueStrategy(null)
    .preferredLanguage('geo');
};
