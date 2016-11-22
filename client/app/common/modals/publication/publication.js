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

        this.save = form => {
          if (form.$valid) {
            $mdDialog.hide(this.publication);
          }
        };

        this.categoryIsSelected = categoryId => {
          return this.publication.categories.some(selectedCategoryId => selectedCategoryId === categoryId);
        };

        this.toggleCategory = categoryId => {
          var idx = this.publication.categories.indexOf(categoryId);
          if (idx > -1) {
            return this.publication.categories.splice(idx, 1);
          }
          this.publication.categories.push(categoryId);
        }

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
