'use strict';

export default Restangular => {
  'ngInject';

  return {
    getContent: () => Restangular.one('contents').get(),
    //updateContact: (contentId, contact) => Restangular.one('contents', contentId).post('updateContact', contact),
    //updateAboutUs: (contentId, aboutUs) => Restangular.one('contents', contentId).post('updateAboutUs', {aboutUs}),
    //
    //addRule: (contentId, rule) => Restangular.one('contents', contentId).post('addRule', rule),
    //updateRule: (contentId, ruleId, data) => Restangular.one('contents', contentId).one('updateRule', ruleId).post('', data),
    //removeRule: (contentId, ruleId) => Restangular.one('contents', contentId).one('removeRule', ruleId).post(),
    //
    //addQuestion: (contentId, question) => Restangular.one('contents', contentId).post('addQuestion', question),
    //updateQuestion: (contentId, questionId, data) => Restangular.one('contents', contentId).one('updateQuestion', questionId).post('', data),
    //removeQuestion: (contentId, questionId) => Restangular.one('contents', contentId).one('removeQuestion', questionId).post(),
  };
};