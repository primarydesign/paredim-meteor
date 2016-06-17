import Markers from '../imports/collection-markers.js'

import { ReactiveVar } from 'meteor/reactive-var';


MapMarkers = new Meteor.Collection( null )
MapMarkersIndex = new EasySearch.Index({
    collection: MapMarkers,
    fields: ['name'],
    allowedFields: ['_id','name', 'lat', 'lng'],  
    engine: new EasySearch.Minimongo()
});




Meteor.startup(function() {  
	GoogleMaps.load();
});

Template.searchBox.helpers({  
	mapOptions: function() {
		if (GoogleMaps.loaded()) {
			return {
				center: new google.maps.LatLng(-30.8136, 135.9631),
				zoom: 4,
  				mapTypeId: google.maps.MapTypeId.SATELLITE
				
			};
		}
	}
});






Template.searchBox.onCreated(function(){

	GoogleMaps.ready('map', function(map) {
		google.maps.event.addListener(map.instance, 'click', function(event) {
			MapMarkers.insert({ lat: event.latLng.lat(), lng: event.latLng.lng() });
   			Meteor.call('insertMarkers', event.latLng.lat(),event.latLng.lng());  
		});


		var markers = {};

		MapMarkers.find().observe({  
			added: function(document) {
				// Create a marker for this document
				var marker = new google.maps.Marker({
					draggable: true,
					animation: google.maps.Animation.DROP,
					position: new google.maps.LatLng(document.lat, document.lng),
					map: map.instance,
					// We store the document _id on the marker in order 
					// to update the document within the 'dragend' event below.
					id: document._id
				});

				// This listener lets us drag markers on the map and update their corresponding document.
				google.maps.event.addListener(marker, 'dragend', function(event) {
					Markers.update(marker.id, { $set: { lat: event.latLng.lat(), lng: event.latLng.lng() }});
				});

				// Store this marker instance within the markers object.
				markers[document._id] = marker;
			},
			changed: function(newDocument, oldDocument) {
				markers[newDocument._id].setPosition({ lat: newDocument.lat, lng: newDocument.lng });
			},
			removed: function(oldDocument) {
				// Remove the marker from the map
				markers[oldDocument._id].setMap(null);

				// Clear the event listener
				google.maps.event.clearInstanceListeners(
						markers[oldDocument._id]);

				// Remove the reference to this marker instance
				delete markers[oldDocument._id];
			}
		});


		Markers.find().forEach(function(doc){
			MapMarkers.insert(doc);
		});
		

	});
});






Template.searchBox.events({
	'keyup': function(evt, template) {

		MapMarkers.remove({});

		clearTimeout(t); 


		var t = setTimeout(function(){
		
			var ids =  $('.ids').text().split(' ')
			console.log(ids);
			console.log(ids.length);
			
			Markers.find().forEach(function(doc){
				if (ids.indexOf(doc._id) > -1){
					MapMarkers.insert(doc);
				}
			});

		},300)		

	}
});



/**SEARCH**/


Template.searchBox.helpers({
	mapMarkersIndex: () => MapMarkersIndex,
	//reactiveVar: () => MarkersIndex
	markersIndex: () => MarkersIndex
	

});



