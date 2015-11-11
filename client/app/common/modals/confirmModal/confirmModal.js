'use strict';

export default class {
  constructor($mdDialog) {
    'ngInject';

    this.$mdDialog = $mdDialog;
  }

  open() {
    var confirm = this.$mdDialog.confirm()
      .title('ადასტურებთ წაშლას?')
      .content('წაშლის შემთხვევაში ინფორმაციის აღდგენა შეუძლებელი იქნება')
      .ok('კი')
      .cancel('არა');

    return this.$mdDialog.show(confirm);
  }
}