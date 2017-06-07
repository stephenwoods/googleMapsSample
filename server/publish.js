import { Locations } from '../imports/api/locations.js';

Meteor.publish('locations', function() {
  return Locations.find();
});
