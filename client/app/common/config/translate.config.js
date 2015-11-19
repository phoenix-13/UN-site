'use strict';

export default $translateProvider => {
  'ngInject';
  $translateProvider
    .translations('eng', {
      HOME: 'Home',
      ABOUT: 'About Us',
      PUBLICATIONS: 'Publications',
      INDICATORS: 'Indicators',
      ALL: 'all',
      JUNIOR_POLITICS_MONITORING: 'Youth Policy Monitor',
      SEARCH: 'search..',

      READ_MORE: 'Read More',

      CONTACT: 'Contact',
      SITEMAP: 'Sitemap',
      DEMOGRAPHICS: 'Demographics',

      DIRECTION: 'Direction',
      PUBLICATIONS_BY_YEAR: 'Publications By Year',


      NAME: 'First Name, Last Name',
      EMAIL: 'Email',
      SUBJECT: 'Subject',
      CONTENT: 'Content',
      SEND: 'Send',
      GLAD_TO_RECIEVE: 'We would be Delighted to Hear from You...',

      TBILISI: 'Tbilisi',
      PHONE: 'Phone',
      FAX: 'Fax',

      LOOKING_STATISTICS: 'I am looking for statistics on...',

      MADE_BY_1: 'Made by the Ministry of Sport and Youth Affairs and',
      MADE_BY_2: 'The UN Population Fund office',

      T: '{{eng}}'
    })
    .translations('geo', {
      HOME: 'მთავარი',
      ABOUT: 'ჩვენ შესახებ',
      PUBLICATIONS: 'პუბლიკაციები',
      INDICATORS: 'ინდიკატორები',
      ALL: 'ყველა',
      JUNIOR_POLITICS_MONITORING: 'ახალგაზრდული პოლიტიკის მონიტორი',
      SEARCH: 'ძებნა..',

      READ_MORE: 'სრულად ნახვა',

      CONTACT: 'კონტაქტი',
      SITEMAP: 'საიტის რუკა',
      DEMOGRAPHICS: 'დემოგრაფია',

      DIRECTION: 'მიმართულება',
      PUBLICATIONS_BY_YEAR: 'პუბლიკაციები წლების მიხედვით',


      NAME: 'სახელი, გვარი',
      EMAIL: 'მეილი',
      SUBJECT: 'თემა',
      CONTENT: 'შეტყობინება',
      SEND: 'გაგზავნა',
      GLAD_TO_RECIEVE: 'თუ მოგვწერთ გაგვიხარდება...',

      TBILISI: 'თბილისი',
      PHONE: 'ტელეფონი',
      FAX: 'ფაქსი',

      LOOKING_STATISTICS:'ვეძებ სტატისტიკას თემაზე...',

      MADE_BY_1: 'ვებ გვერდი შექმნილია სპორტისა და ახლაგაზრდობის საქმეთა სამინისტროსა და',
      MADE_BY_2: 'გაეროს მოსახლოების ფონდის საქართველოს ოფისის მიერ',

      T: '{{geo}}'
    })
    .useSanitizeValueStrategy(null)
    .preferredLanguage('geo');
};
