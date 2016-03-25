// From http://www.pcb-3d.com/knowledge-base/pth-dimensions
import Ember from 'ember';

export default Ember.Controller.extend({
  maxLeadDiameter: 2,

  minHoleSizes: Ember.computed('maxLeadDiameter', function() {
    var maxLeadDiameter = parseFloat(this.get('maxLeadDiameter')) || 0;
    var sizeA = maxLeadDiameter + 0.25;
    var sizeB = maxLeadDiameter + 0.20;
    var sizeC = maxLeadDiameter + 0.15;
    return [sizeA, sizeB, sizeC];
  }),

  minAnnularRings: Ember.computed('minHoleSizes', function() {
    var minHoleSizes = this.get('minHoleSizes');
    var holeA = minHoleSizes[0] + 0.1 + 0.6;
    var holeB = minHoleSizes[0] + 0.1 + 0.5;
    var holeC = minHoleSizes[0] + 0.1 + 0.4;
    return [holeA, holeB, holeC];
  }),

  namingConventions: Ember.computed('maxLeadDiameter', 'minHoleSizes', function() {
    var minHoleSizes = this.get('minHoleSizes');
    var minAnnularRings = this.get('minAnnularRings');
    var a = Math.ceil(minHoleSizes[0] * 10) + 'H' + Math.ceil(minAnnularRings[0] * 10);
    var b = Math.ceil(minHoleSizes[1] * 10) + 'H' + Math.ceil(minAnnularRings[1] * 10);
    var c = Math.ceil(minHoleSizes[2] * 10) + 'H' + Math.ceil(minAnnularRings[2] * 10);

    return ['C' + a, 'C' + b, 'C' + c, 'S' + a, 'S' + b, 'S' + c]
  })
});
