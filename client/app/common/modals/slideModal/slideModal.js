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
        this.slide = {ref: {}, title: {eng: '', geo: ''}};
        this.title = 'Add slide';
        if (slide) {
          this.slide = slide;
          if (this.slide.ref._id) {
            this.selectedArticle = slide.ref;
          } else {
            this.searchText = slide.link;
          }
        }

        this.searchArticles = () => {
          if (this.searchText && this.searchText.length > 1) {
            var deferred = $q.defer();
            ArticleResource.searchAdminArticles(this.searchText)
              .then(articles => parseArticles(articles))
              .then(parsedArticles => deferred.resolve(parsedArticles));
            return deferred.promise;
          } else {
            this.selectedArticle = undefined;
            return [];
          }
        };

        this.openGallery = () => {
          galleryModal.open()
            .then(image => this.slide.image = image.fileName);
        };

        this.save = () => {
          if (this.slide.image && (this.selectedArticle || this.searchText)) {
            if (this.selectedArticle) {
              this.slide.ref = this.selectedArticle;
              this.link = '';
            } else {
              this.slide.ref = {};
              this.slide.link = this.searchText;
            }
            $mdDialog.hide(this.slide);
          } else {
            Toast.show('Image And Link Should Be Provided!');
          }
        };

        this.cancel = () => $mdDialog.cancel();

        function parseArticles(articles) {
          var parsedArticles = [];
          articles.indicators.items.forEach(indicator => {
            parsedArticles.push(getArticle(indicator, 'indicator'));
          });
          articles.publications.items.forEach(publication => {
            parsedArticles.push(getArticle(publication, 'publication'));
          });
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
