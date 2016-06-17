import { Meteor } from 'meteor/meteor';
import Markers from '/imports/collection-markers'

Meteor.methods({ 
		'insertMarkers':function(lat, lng){

			console.log(lat,lng);
			console.log('inaert Markers');
			var things = ['Rock', 'Paper', 'Scissor'];
			var thing = things[Math.floor(Math.random()*things.length)];



			Markers.insert({ lat: lat, lng: lng, name:thing});



		},
		'updateMarkers':function(id,lat,lng){
			console.log(id,lat,lng);
			console.log('update Markers');




      			Markers.update(id, { $set: { lat: lat, lng: lng}});
		}
})
