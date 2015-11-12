'use strict';

import template from './demographyModal.html!text';
import './demographyModal.css!';

export default class {
  constructor($mdDialog) {
    'ngInject';
    this.$mdDialog = $mdDialog;
  }

  open(targetEvent, demography) {
    return this.$mdDialog.show({
      controller($mdDialog) {
        this.pairs = demography.values;
        this.years = getUnUsedYears(this.pairs);
        this.pair = {};

        this.addPair = () => {
          this.pair.year = Number(this.pair.year);
          this.pairs.push({year: this.pair.year, value: this.pair.value});
          this.pairs = _.sortBy(this.pairs, 'year');
          this.years.splice(this.years.indexOf(this.pair.year), 1);
          this.pair = {};
        };

        this.removePair = (index, pair) => {
          this.pairs.splice(index, 1);
          this.years.push(pair.year);
          this.years.sort((a, b) => a -b);
        };

        this.save = () => $mdDialog.hide(this.pairs);

        this.cancel = () => $mdDialog.cancel();

        function getUnUsedYears(usedYears) {
          var years = _.range(12).map((elem, i) => 2009 + i);
          var unUsedYears = [];
          var i, j;
          for (j = 0, i = 0; i < years.length; i++) {
            if (j === usedYears.length || years[i] !== usedYears[j].year) {
              unUsedYears.push(years[i]);
            } else {
              j++;
            }
          }
          return unUsedYears;
        }
      },
      controllerAs: 'vm',
      template,
      targetEvent,
      clickOutsideToClose: true
    });
  }
}
