import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Locations } from '../api/locations.js';
import './body.html';

Template.body.onCreated(function() {
  // We can use the `ready` callback to interact with the map API once the map is ready.
  let template = Template.instance();
  GoogleMaps.ready('exampleMap', function(map) {
    // Add a marker to the map once it's ready
    let theMap = map;
    template.subscribe('locations', function() {
      Locations.find().map(function(item) {
        new google.maps.Marker({
          position: new google.maps.LatLng(item.latitude, item.longitude),
          map: theMap.instance
        });
      });
    });
  });
});

Template.body.onRendered( () => {
  GoogleMaps.load();
});

Template.body.helpers({
  exampleMapOptions() {
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
      // Map initialization options
      return {
        center: new google.maps.LatLng(25, 25),
        zoom: 3
      };
    }
  }
});

Template.body.events({
  'submit form':function (event, template) {
    console.log('here');
    event.preventDefault();
    console.log(Locations.insert({ name: 'Test', longitude: 25, latitude: 25}));
  }
});
