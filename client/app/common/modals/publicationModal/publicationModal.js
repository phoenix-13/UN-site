'use strict';

import template from './publicationModal.html!text';
import './publicationModal.css!';

export default class {
  constructor($mdDialog) {
    'ngInject';
    this.$mdDialog = $mdDialog;
  }

  open(targetEvent, categories, publication) {
    var defaultPublication= {
      title: {geo: '', eng: ''},
      content: {geo: '', eng: ''},
      categories: [],
      date: new Date()
    };

    return this.$mdDialog.show({
      controller($mdDialog) {
        this.title = (publication) ? 'Update Publication' : 'Add Publication';
        this.categories = categories;
        this.publication = publication || defaultPublication;
        this.publication.categories.forEach((categoryId, index) => {
          this.publication.categories[index] = _.find(this.categories, {_id: categoryId});
        });

        this.save = form => {
          if (form.$valid) {
            this.publication.categories = _.pluck(this.publication.categories, '_id');
            $mdDialog.hide(this.publication);
          }
        };

        this.getPossibleCategories = searchText => {
          return this.categories.filter(category => {
            return this.categoryTitleContainsString(category.title.geo, searchText);
          });
        };

        this.cancel = () => $mdDialog.cancel();

        this.categoryTitleContainsString = (title, searchText) => {
          return title.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
        };
      },
      controllerAs: 'vm',
      template,
      targetEvent,
      clickOutsideToClose: true
    });
  }
}
