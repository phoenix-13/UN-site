'use strict';

import template from './indicatorModal.html!text';
import './indicatorModal.css!';

export default class {
  constructor($mdDialog) {
    'ngInject';
    this.$mdDialog = $mdDialog;
  }

  open(targetEvent, categories, indicator) {
    var defaultIndicator = {
      title: {geo: '', eng: ''},
      content: {geo: '', eng: ''},
      values: [],
      date: new Date()
    };

    return this.$mdDialog.show({
      controller($mdDialog) {
        this.title = (indicator) ? 'Update Indicator' : 'Add Indicator';
        this.categories = categories;
        this.indicator = indicator || defaultIndicator;
        this.years = getUnUsedYears(this.indicator.values);
        this.pair = {};

        this.addPair = () => {
          this.pair.year = Number(this.pair.year);
          this.indicator.values.push({year: this.pair.year, value: this.pair.value});
          this.indicator.values = _.sortBy(this.indicator.values, 'year');
          this.years.splice(this.years.indexOf(this.pair.year), 1);
          this.pair = {};
        };

        this.removePair = (index, pair) => {
          this.indicator.values.splice(index, 1);
          this.years.push(pair.year);
          this.years.sort((a, b) => a -b);
        };

        this.save = form => {
          if (form.$valid) {
            $mdDialog.hide(this.indicator);
          }
        };

        this.cancel = () => $mdDialog.cancel();

        function getUnUsedYears(usedYears) {
          var years = _.range(12).map((elem, i) => 2009 + i);
          var unUsedYears = [];
          var i, j;
          for (j = 0, i = 0; i < years.length; i++) {
            if (j == usedYears.length || years[i] !== usedYears[j].year) {
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
