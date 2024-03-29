'use strict';

import template from './demography.html!text';
import './demography.css!';

export default class {
  constructor($mdDialog) {
    'ngInject';
    this.$mdDialog = $mdDialog;
  }

  open(demography) {
    return this.$mdDialog.show({
      controller($mdDialog) {
        this.title = `Update "${demography.region.eng}" Demography`;
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
          var years = _.range(6).map((elem, i) => 2015 + i);
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
      clickOutsideToClose: true
    });
  }
}
