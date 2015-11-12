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

        this.cancel = () => $mdDialog.cancel();
      },
      controllerAs: 'vm',
      template,
      targetEvent,
      clickOutsideToClose: true
    });
  }
}
