
/*
import Therma from '../imports/collections.js'
//var Therma = new Mongo.Collection('therma');
//import Items from '/imports/collections'
//Meteor.subscribe('therma', function() {//})


import Uploads from '../imports/uploads.js'
*/

Router.onRun(function(){
  console.log('onRun');
  //console.log('onRun', this.current().route.getName());
  this.next();
});

Router.onBeforeAction(function(){
  console.log('onBeforeAction');
	
  //console.log('onBeforeAction', this.current().route.getName());
  this.next();
});


Router.map(function() {
	this.route('/', {
		name: 'home',
		template: 'home'
	});
	this.route('/communities', {
		name: 'communities',
		template: 'communities',
		action : function () {
			if (this.ready()){
				console.log('communities');
				this.render();
			}
		}
			
	});
	this.route('/summit', {
		name: 'summit',
		template: 'summit'			
	});
	this.route('/soundview', {
		name: 'soundview',
		template: 'soundview'			
	});
	this.route('/royce', {
		name: 'royce',
		template: 'royce'			
	});
	
})


Router.configure({
	layoutTemplate: 'nav',
	waitOn: function(){
		//return Meteor.subscribe('therma');

	}
});





/*

Router.map(function() {
	this.route('/', {
		name: 'home',
		template: 'home'
	});
	this.route('/engineering', {

		name: 'engineering',
		template: 'engineering',
		data: function(){
			/*
			   var obj = Therma.find({"name" : "engineering"}).fetch()
			   console.log(obj);
			   if(obj[0]){return obj[0]}*//*
		},
		action : function () {
			if (this.ready()){
				console.log('engineering');
				this.render();
			}
		},
		waitOn: function() {
			return [
				//Meteor.subscribe('items'),
				Meteor.subscribe('uploads')
			];
		},
		data: function() {
			return {
				//item: Items.findOne(),
				uploads: Uploads.find()
			}
		}


	});

	this.route('/about',{ //NOT sure the correct way to structure this, because if i have a global template I'll have to have all the data available 
		name: 'about',
		template: 'about',
		action : function () {
			if (this.ready()){
				console.log('about');
				this.render();
			}
		}
	})


	this.route('/standardHX', {
		name: 'standardHX',
		template: 'standardHX'
	});

	this.route('/series72',{	
		name: 'series72',
		path: 'series72',
		template: 'series72',
		data: function(){
			var obj = Therma.find({"name" : "72"}).fetch()
				console.log(obj);
			if(obj[0]){
				console.log(obj[0][72]);		
				return obj[0][72]
			}
		},
		action : function () {
			if (this.ready()){
				console.log('72');
				console.log(this.route._path);
				//console.log(Router.current().route.path(this))

				console.log(Router.current().path)
					console.log(this.options_path);

				console.log( Therma.find({"name" : "72"}).fetch() )
					this.render();
			}
		}


	});
	this.route('/series73', {
		name: 'series73',
		template: 'series73',
		data: function(){
			var obj = Therma.find({"name" : "73"}).fetch()
				if(obj[0]){
					var newObj = obj[0][73];
					newObj.pathFor = 'series73';
					console.log(newObj)
						console.log(obj[0][73]);		
					return newObj
				}

		},
		action : function () {
			if (this.ready()){
				console.log('73');
				console.log( Therma.find({"name" : "73"}).fetch() )
					this.render();
			}
		}
	});
	this.route('/series74', {
		name: 'series74',
		template: 'series74',
		data: function(){
			var obj = Therma.find({"name" : "74"}).fetch()
				if(obj[0]){
					console.log(obj[0][74]);		
					return obj[0][74]
				}


		},
		action : function () {
			if (this.ready()){
				console.log('74');
				console.log( Therma.find({"name" : "74"}).fetch() )	
					this.render();
			}
		}
	});
	this.route('/series74-robust', {
		name: 'series74-robust',
		template: 'series74-robust',
		data: function(){
			var obj = Therma.find({"name" : "74"}).fetch()
				if(obj[0]){return obj[0][74]}
		},
		action : function () {
			if (this.ready()){
				console.log('74 robust');
				console.log( Therma.find({"name" : "74"}).fetch() )	
					this.render();
			}
		}
	});


})



Router.configure({
	layoutTemplate: 'nav',
	waitOn: function(){
		return Meteor.subscribe('therma');

	}
});




Router._scrollToHash = function(hash) {//detects scroll and assigns to hashtag
	console.log(hash);
	var section = $(hash);
	if (section.length) {


		//console.log($('.section-wrapper').())
		console.log($(hash))
			console.log($(hash + '.title'))
			console.log($(hash + '.title').height())

			/*console.log($(hash)[0].style)*//*

			console.log($('#navbar').height()) //This needs to be figured out for all pages 



			var sectionTop = section.offset().top - $('#navbar').height(); // - 100;
		$("html, body").animate({
			scrollTop: sectionTop
		}, "slow");
	}
};







/*

   Router.route('/', {
   name: 'home',
   template: 'home'
   });

   Router.route('/series72', {
   name: 'series72',
   template: 'series72',
   data: function(){
   var obj = Therma.find({"name" : "72"}).fetch()
   console.log(obj);
   if(obj[0]){
   console.log(obj[0][72]);		
   return obj[0][72]
   }
   },
   action : function () {
   if (this.ready()){
   console.log('72');
   console.log(this.route._path);
//console.log(Router.current().route.path(this))

console.log(Router.current().path)
console.log(this.options_path);

console.log( Therma.find({"name" : "72"}).fetch() )
this.render();
}
}
});



Template.series72.helpers({

myHelper:function(){
return Router.current().route.path(this);
}
});


Router.route('/series73', {
name: 'series73',
template: 'series73',
data: function(){
var obj = Therma.find({"name" : "73"}).fetch()
if(obj[0]){
var newObj = obj[0][73];
newObj.pathFor = 'series73';
console.log(newObj)
console.log(obj[0][73]);		
return newObj
}

},
action : function () {
if (this.ready()){
console.log('73');
console.log( Therma.find({"name" : "73"}).fetch() )
this.render();
}
}
});


Router.route('/series74', {
name: 'series74',
template: 'series74',
data: function(){
var obj = Therma.find({"name" : "74"}).fetch()
if(obj[0]){
	console.log(obj[0][74]);		
	return obj[0][74]
}


},
	action : function () {
		if (this.ready()){
			console.log('74');
			console.log( Therma.find({"name" : "74"}).fetch() )	
				this.render();
		}
	}

});

Router.route('/series74-robust', {
	name: 'series74-robust',
	template: 'series74-robust',
	data: function(){
		var obj = Therma.find({"name" : "74"}).fetch()
			if(obj[0]){return obj[0][74]}

	},
	action : function () {
		if (this.ready()){
			console.log('74 robust');
			console.log( Therma.find({"name" : "74"}).fetch() )	
				this.render();
		}
	}

});




Router.route('/standardHX', {
	name: 'standardHX',
	template: 'standardHX'
});

Router.configure({
	layoutTemplate: 'nav',
	waitOn: function(){
		return Meteor.subscribe('therma');

	}
});




Router._scrollToHash = function(hash) {//detects scroll and assigns to hashtag
	console.log(hash);
	var section = $(hash);
	if (section.length) {
		var sectionTop = section.offset().top - 100;
		$("html, body").animate({
			scrollTop: sectionTop
		}, "slow");
	}
};






Template.series72.helpers({
	test:function(){
		return 'niko';
	}

})

Template.series72.rendered = function() {
	//sconsole.log(this); // you should see your passage object in the console
};



Router.route('/engineering', {

	name: 'engineering',
	template: 'engineering',
	data: function(){
		var obj = Therma.find({"name" : "engineering"}).fetch()
			console.log(obj);
		if(obj[0]){return obj[0]}
	},
	action : function () {
		if (this.ready()){
			console.log('engineering');
			console.log( Therma.find({"name" : "engineering"}).fetch())
				this.render();
		}
	}


})
*/

