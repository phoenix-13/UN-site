'use strict';

import template from './slideModal.html!text';
import './slideModal.css!';

export default class {
  constructor($mdDialog) {
    'ngInject';
    this.$mdDialog = $mdDialog;
  }

  open(targetEvent, slide) {

    return this.$mdDialog.show({
      controller($q, $mdDialog, galleryModal, Toast, ArticleResource) {
        this.slide = {title: {eng: '', geo: ''}};
        this.title = 'Add slide';
        if (slide) {
          this.slide = slide;
          this.selectedArticle = slide.ref;
        }

        this.searchArticles = () => {
          if (this.searchText && this.searchText.length > 3) {
            var deferred = $q.defer();
            ArticleResource.searchAdminArticles(this.searchText)
              .then(articles => parseArticles(articles))
              .then(parsedArticles => deferred.resolve(parsedArticles));
            return deferred.promise;
          } else {
            return [];
          }
        };

        this.openGallery = () => {
          galleryModal.open()
            .then(image => this.slide.image = image.fileName);
        };

        this.save = () => {
          if (this.slide.image && this.selectedArticle) {
            this.slide.ref = this.selectedArticle;
            $mdDialog.hide(this.slide);
          } else {
            Toast.show('Image And Link Should Be Provided!');
          }
        };

        this.cancel = () => $mdDialog.cancel();

        function parseArticles(articles) {
          var parsedArticles = [];
          articles.indicators.items.forEach(indicator => parsedArticles.push(getArticle(indicator, 'indicators')));
          articles.publications.items.forEach(publication => parsedArticles.push(getArticle(publication, 'publications')));
          return parsedArticles;
        }

        function getArticle(article, type) {
          return {
            type: type,
            title: article.title.geo,
            _id: article._id
          }
        }
      },
      controllerAs: 'vm',
      template,
      targetEvent,
      clickOutsideToClose: true
    });
  }
}
