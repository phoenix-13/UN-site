'use strict';

export default class {
  constructor($mdDialog) {
    'ngInject';

    this.$mdDialog = $mdDialog;
  }

  open(targetEvent) {
    var confirm = this.$mdDialog.confirm({targetEvent: targetEvent})
      .title('ადასტურებთ წაშლას?')
      .content('წაშლის შემთხვევაში ინფორმაციის აღდგენა შეუძლებელი იქნება')
      .ok('კი')
      .cancel('არა');

    return this.$mdDialog.show(confirm);
  }
}