import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('pth-sizes');
  this.route('e-series-value');
});

export default Router;
