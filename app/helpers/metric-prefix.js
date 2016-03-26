import Ember from 'ember';

function nFormatter(num, digits) {
  var si = [
    { value: 1E18, symbol: "E" },
    { value: 1E15, symbol: "P" },
    { value: 1E12, symbol: "T" },
    { value: 1E9,  symbol: "G" },
    { value: 1E6,  symbol: "M" },
    { value: 1E3,  symbol: "k" },
    { value: 1E0,  symbol: "" },
    { value: 1E-3,  symbol: "m" },
    { value: 1E-6,  symbol: "&micro;" }
  ];

  var i;

  for (i = 0; i < si.length; i++) {
    var fixed = (num / si[i].value).toFixed(digits)

    if (num >= si[i].value) {
      return fixed.replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1 ") + si[i].symbol;
    }
  }
  return fixed.toString();
}

export function metricPrefix(params/*, hash*/) {
  return nFormatter(params, 3).htmlSafe();
}

export default Ember.Helper.helper(metricPrefix);
