'use strict';

export default $translateProvider => {
  'ngInject';
  $translateProvider
    .translations('eng', {
      HOME: 'Home',
      ABOUT: 'About Us',
      PUBLICATIONS: 'Publications',
      INDICATORS: 'Indicators',
      ALL_RESULTS: 'see all results',
      ALL: 'see all',
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
      GLAD_TO_RECIEVE_1: 'We would be ',
      GLAD: 'Delighted',
      GLAD_TO_RECIEVE_2: 'to Hear from You',

      TBILISI: 'Tbilisi',
      PHONE: 'Phone',
      FAX: 'Fax',

      LOOKING_STATISTICS: 'I am looking for statistics on...',

      MADE_BY_1: 'Made by the Ministry of Sport and Youth Affairs and',
      MADE_BY_2: 'The UN Population Fund office',

      FIRST: 'first',
      PREV: 'previous',
      NEXT: 'next',
      LAST: 'last',

      'NO_RESULT': 'no result found',

      T: '{{eng}}'
    })
    .translations('geo', {
      HOME: 'მთავარი',
      ABOUT: 'ჩვენ შესახებ',
      PUBLICATIONS: 'პუბლიკაციები',
      INDICATORS: 'ინდიკატორები',
      ALL_RESULTS: 'ყველა შედეგის ნახვა',
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
      GLAD_TO_RECIEVE_1: 'თუ მოგვწერთ ',
      GLAD: 'გაგვიხარდება',
      GLAD_TO_RECIEVE_2: '',


      TBILISI: 'თბილისი',
      PHONE: 'ტელეფონი',
      FAX: 'ფაქსი',

      LOOKING_STATISTICS:'ვეძებ სტატისტიკას თემაზე...',

      MADE_BY_1: 'ვებ გვერდი შექმნილია სპორტისა და ახლაგაზრდობის საქმეთა სამინისტროსა და',
      MADE_BY_2: 'გაეროს მოსახლოების ფონდის საქართველოს ოფისის მიერ',

      FIRST: 'პირველი',
      PREV: 'წინა',
      NEXT: 'შემდეგი',
      LAST: 'ბოლო',

      'NO_RESULT': 'შედეგი ვერ მოიძებნა',

      T: '{{geo}}'
    })
    .useSanitizeValueStrategy(null)
    .preferredLanguage('geo');
};
