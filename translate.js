'use strict';

export default $translateProvider => {
  'ngInject';
  $translateProvider
    .translations('eng', {

      LOGO: 'Youth Policy Monitor',

      HOME: 'Home',
      ABOUT: 'About Us',
      INDICATORS: 'indicators',
      PUBLICATIONS: 'publicatons',
      CONTACT: 'Contact',
      SEARCH: 'search',
      SITEMAP: 'site map',

      PARTICIPATION: 'Participation',
      PROTECTION: 'Special Support and Protection',
      HEALTH: 'Health',
      FAMILY: 'Youth and Family',
      EDUCATION: 'Education, Employment and Mobility',

      READ MORE: 'Read More',
      LOOKING_STATISTICS: 'I am looking for statistics on',
      PUBLICATIONS_YEAR: 'Publications by Year',

      MADE_BY_1: 'Made by the Ministry of Sport and Youth Affairs and',
      MADE_BY_2: 'The UN Population Fund office',

      T: '{{eng}}'
    })
    .translations('geo', {

      LOGO: 'ახალგაზრდული პოლიტიკის მონიტორი',

      HOME: 'მთავარი',
      ABOUT: 'ჩვენს შესახებ',
      INDICATORS: 'ინდიკატორები',
      PUBLICATIONS: 'პუბლიკაციები',
      CONTACT: 'კონტაქტი',
      SEARCH: 'ძიება',
      SITEMAP: 'საიტის რუკა',

      PARTICIPATION: 'მონაწილეობა',
      PROTECTION: 'სპეციალური მხარდაჭერა და დაცვა',
      HEALTH: 'ჯანმრთელობა',
      FAMILY: 'ახალგაზრდები და ოჯახი',
      EDUCATION: 'განათლება, დასაქმება და მობილობა',


      READ MORE: 'სრულად ნახვა',
      LOOKING_STATISTICS:'ვეძებ სტატისტიკას თემაზე',
      PUBLICATIONS_YEAR: 'პუბლიკაციები წლების მიხედვით',

      MADE_BY_1: 'ვებ გვერდი შექმნილია სპორტისა და ახლაგაზრდობის საქმეთა სამინისტროსა და',
      MADE_BY_2: 'გაეროს მოსახლოების ფონდის საქართველოს ოფისის მიერ',


      T: '{{geo}}'
    })
    .useSanitizeValueStrategy(null)
    .preferredLanguage('geo');
};
