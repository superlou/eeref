import Ember from 'ember';

export default Ember.Controller.extend({
  nominal: 1000,

  e_values: Ember.computed('nominal', function() {
    return this.get('seriesNames').map((series) => {
      return this.e_value(this.get('nominal'), series);
    });
  }),

  e_values_under: Ember.computed('nominal', function() {
    return this.get('seriesNames').map((series) => {
      return this.e_value(this.get('nominal'), series, -1);
    });
  }),

  e_values_over: Ember.computed('nominal', function() {
    return this.get('seriesNames').map((series) => {
      return this.e_value(this.get('nominal'), series, 1);
    });
  }),

  e_value: function(nominal, seriesName, offset=0) {
    var normalized = nominal
    var zeros = 0;

    if (nominal == 0) {
      return 0;
    }

    while (normalized >= 10.0) {
      normalized = normalized / 10;
      zeros++;
    }

    while (normalized < 1) {
      normalized = normalized * 10;
      zeros--;
    }

    var series = this.get(seriesName);

    var diffs = series.map(function(preferred) {
      return Math.abs(normalized - preferred);
    });

    var index = diffs.indexOf(Math.min.apply(Math, diffs));
    var selection = index + offset;

    if (selection >= series.length) {
      selection = 0;
      zeros++;
    } else if (selection < 0) {
      selection = series.length - 1;
      zeros--;
    }

    return series[selection] * Math.pow(10, zeros);
  },

  seriesNames: ['e6', 'e12', 'e24', 'e48', 'e96'],

  e6: [1.0, 1.5, 2.2, 3.3, 4.7, 6.8],
  e12: [1.0, 1.2, 1.5, 1.8, 2.2, 2.7, 3.3, 3.9, 4.7, 5.6, 6.8, 8.2],
  e24: [1.0, 1.1, 1.2, 1.3, 1.5, 1.6, 1.8, 2.0, 2.2, 2.4, 2.7, 3.0, 3.3, 3.6,
    3.9, 4.3, 4.7, 5.1, 5.6, 6.2, 6.8, 7.5, 8.2, 9.1],
  e48: [1.00, 1.05, 1.10, 1.15, 1.21, 1.27, 1.33, 1.40, 1.47, 1.54, 1.62, 1.69,
    1.78, 1.87, 1.96, 2.05, 2.15, 2.26, 2.37, 2.49, 2.61, 2.74, 2.87, 3.01,
    3.16, 3.32, 3.48, 3.65, 3.83, 4.02, 4.22, 4.42, 4.64, 4.87, 5.11, 5.36,
    5.62, 5.90, 6.19, 6.49, 6.81, 7.15, 7.50, 7.87, 8.25, 8.66, 9.09, 9.53],
  e96: [1.00, 1.02, 1.05, 1.07, 1.10, 1.13, 1.15, 1.18, 1.21, 1.24, 1.27, 1.30,
    1.33, 1.37, 1.40, 1.43, 1.47, 1.50, 1.54, 1,58, 1.62, 1.65, 1.69, 1.74,
    1.78, 1.82, 1.87, 1.91, 1.96, 2.00, 2.05, 2.10, 2.16, 2.21, 2.26, 2.32,
    2.37, 2.43, 2.49, 2.55, 2.61, 2.67, 2.74, 2.80, 2.87, 2.94, 3.01, 3.09,
    3.16, 3.24, 3.32, 3.40, 3.48, 3.57, 3.65, 3.74, 3.83, 3.92, 4.02, 4.12,
    4.22, 4.32, 4.42, 4.53, 4.64, 4.75, 4.87, 4.99, 5.11, 5.23, 5.36, 5.49,
    5.62, 5.76, 5.90, 6.04, 6.19, 6.34, 6.49, 6.65, 6,81, 6.98, 7.15, 7.32,
    7.50, 7.68, 7.87, 8.06, 8.25, 8.45, 8.66, 8.87, 9.09, 9.31, 9.53, 9.76]
});
