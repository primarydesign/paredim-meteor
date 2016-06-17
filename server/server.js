import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  //
	//Therma.insert({"text" : "this is text" })
});

import Words from '/imports/collections'

Meteor.publish('words', function() {
	//console.log(Therma.find());

    return Words.find()
})
/*
import Items from '/imports/collections'

Meteor.publish('items', function() {
    return Items.find()
})*/

Meteor.methods({ 
		'saveText':function(id,text){
			console.log('in termina');
			
			Words.update({ "htmlId":id }, 
				{ $set: { text:text }}, 
				{upsert:true}

				)
		},
		'authPass':function(pass){
			console.log(pass);
			if(pass == 'b'){
				console.log('pass');
				
				Words.update({ "admin":"words" },
					{$set: { "owner": true}},
					{upsert:true})
				//return true;
			}
		},
		'logOut':function(){
			Words.update({ "admin":"words" },
				{$set: { "owner": false}},
				{upsert:true})
	
		}
})

/*
Meteor.setInterval(function(){
			Therma.update({ "admin":"therma" },
				{$set: { "owner": false}},
				{upsert:true})

}, 10000)*/



