
import Words from '../imports/collections.js'
import Uploads from '../imports/uploads.js'

Template.body.events({
	'click': function(event) {
		//console.log('clicked in the body'); 

	},
	'keyup .cms':function(event, instance){
		console.log(event);
		console.log(event.target.innerHTML)
		console.log(event.target.innerText, event.target.id);
		save(event.target.innerHTML, event.target.id)

	}
})


Template.nav.events({
	'click': function(event) {
		//console.log('clicked in the nav'); 
	},
	'keyup .cms':function(event, instance){

		console.log(event.target.innerText, event.target.id);

		save(event.target.innerText, event.target.id)
		instance.clock.set(Session.get('time'));
		localStorage.setItem('endDate', (Session.get('time')*1000)+Date.now())
	},
	'click #logOut':function(event){
		console.log(event);//show password
		Meteor.call('logOut'); 
		
	},
	'click #submit':function(event, instance){
		console.log(event);//show password
		console.log(instance);//show password
		console.log($('#password').val());



		var r = Meteor.call('authPass', $('#password').val());

		console.log(r);
		console.log(Template.instance())
		console.log(Template.instance().clock.get())

		if(Words.find({ "admin":"words" }).fetch()[0]){
			console.log(Words.find({ "admin":"words" }).fetch()[0].owner);
			instance.clock.set(10)
			console.log(instance.clock);
			localStorage.setItem('endDate', (Session.get('time')*1000)+Date.now())

			//countDown(); 
			var interval = Meteor.setInterval(function(){
				if(instance.clock.get() > 0){	
					 instance.clock.set(instance.clock.get()-1);
					 console.log(instance.clock);
					 
				}
				
				else{
					console.log(instance.clock);		
					Meteor.call('logOut'); 
					clearInterval(interval); 
					return;
				}
				 
			},1000)		
		}
		
	},
	'dragover':function(event, instance){
		if(take_a_drag == true){ 
			take_a_drag = false	
			$('img.cms').addClass('drag');
			console.log('SFD');
			return;
		}

	},
	'drop .details':function(event, instance){
		$('img.cms').removeClass('drag');
		console.log(event);
		console.log(instance);
		console.log(this._id);
      		Meteor.call('deleteFile', this._id);
		
		take_a_drag = true; 
		return;
	},
	'dragleave':function(event, instance){
		$('img.cms').removeClass('drag');
		console.log('SFD');
		take_a_drag = true; 
		return;
	}




});


var take_a_drag = true; 



/*

document.addEventListener('dragover', function(e){ //Change menu styles when something is being dragged over.  
	if(take_a_drag == true){ 
		changeMenu();
		currentEvent = e; 
		take_a_drag = false
		return;
	}
});
function changeMenu(){
	document.getElementById('menu').classList.add('drop_zone');
	document.getElementById('trashcan').classList.remove('footer');
	
	scrollTo(document.body, 0, 350); //Scroll to Top 
	
}
function changeMenuBack(){
	take_a_drag = true;
	document.getElementById('menu').classList.remove('drop_zone');
	document.getElementById('trashcan').classList.add('footer');
	
}*/

/*
function countDown(){

		var interval = Meteor.setInterval(function(){
				if(instance.clock.get() > 0){	
					 instance.clock.set(instance.clock.get()-1);
					 console.log(instance.clock);
					 
				}
				
				else{
					console.log(instance.clock);		
					Meteor.call('logOut'); 
					clearInterval(interval); 
					return;
				}
				 
		},1000)		
}
*/


/* CREATE DYNAMIC HELPERS FROM BASIC HTML*/

/*
Template.summit.onRendered(function(){
	$(document).ready(function(){
	$('.cms').each(function(){
		console.log(this);
		console.log(this.id);
		var o = {'htmlId':this.id}; 
		if(Words.find(o).fetch()[0]){
			var words = Words.find(o).fetch()[0].text
			$(this).html(words) 			
		}

	})	


	})


})*/


Template.communities.onRendered(function(e, i){
	$(document).ready(function(){
		$('.cms').each(function(){
			console.log(this);
			console.log(this.id);
			var o = {'htmlId':this.id}; 
			if(Words.find(o).fetch()[0]){
				var words = Words.find(o).fetch()[0].text
				$(this).html(words) 			
			}

		})
	})
})	





Template.summit.helpers({
/*
	'summary_intro':function(){
		if(Words.find({'htmlId':'summary_intro'}).fetch()[0]){
			return Words.find({'htmlId':'summary_intro'}).fetch()[0].text;
		}
	}
*/
})

/*
    for (var a=0; a<3; a++){
	var arr = ['a','b','c']
	Template.registerHelper(arr[a], function(){
		return arr[a];
	})
    }


Template.registerHelper('niko', function(){
	return 'yo';
})


*/
Template.communities.helpers({
	'blah':function(){
			if(Words.find({'htmlId':'blah'}).fetch()[0]){
				return Words.find({'htmlId':'blah'}).fetch()[0].text;
			}
	},
	'blah2':function(){
			if(Words.find({'htmlId':'blah2'}).fetch()[0]){
				return Words.find({'htmlId':'blah2'}).fetch()[0].text;
			}
	},

	'blah3':function(){
			if(Words.find({'htmlId':'blah3'}).fetch()[0]){
				return Words.find({'htmlId':'blah3'}).fetch()[0].text;
			}
	},
	'listItem':function(){
			if(Words.find({'htmlId':'listItem'}).fetch()[0]){
				return Words.find({'htmlId':'listItem'}).fetch()[0].text;
			}
	},
	'owner':function(){
		if(Words.find({ "admin":"words" }).fetch()[0]){
			return Words.find({ "admin":"words" }).fetch()[0].owner
		}
	}})



/*
Template.summit.helpers({
	'owner':function(){
		if(Words.find({ "admin":"words" }).fetch()[0]){
			return Words.find({ "admin":"words" }).fetch()[0].owner
			return 'sup'
		}
	}
})
*/


Template.registerHelper('owner', function(){
		if(Words.find({ "admin":"words" }).fetch()[0]){
			return Words.find({ "admin":"words" }).fetch()[0].owner
		}

})



var timeout;
var obj = {}; 	
function save(text, id) {

	obj[id] = text; 
	if(timeout) {
		clearTimeout(timeout);
		timeout = null;
	}
	
	timeout = Meteor.setTimeout(function(){
		
		Object.keys(obj).forEach(function(id) {
			Meteor.call('saveText', id,  obj[id], function(){	
				console.log(id, text, ' saved')
				saveEffect(id);
			});
		});
		obj = {}; 	
	


	}, 2000)

}


function saveEffect(id){
	console.log(id);
	$('#'+id).addClass('save');
	setTimeout(function(){
		$('#'+id).removeClass('save');
		
	},2000)
	
}


Template.nav.onCreated(function(){

	console.log('nav onCreated')
	/*
	if(typeof Storage !== "undefined" && localStorage.getItem('endDate') && localStorage.getItem('endDate') > Date.now() ){

		console.log(localStorage.getItem('endDate'));
		console.log(localStorage.getItem('endDate') - Date.now())
			
		var time = Math.round(((localStorage.getItem('endDate') - Date.now())/1000));
		Session.set('time', time); 	
		this.clock = new ReactiveVar(time);
		//countDown()
				//Template.instance().clock.set(localStorage.getItem('endDate') - Date.now())},1000)

		}else{*/
		Meteor.call('logOut'); 
		var time = 10;
		Session.set('time', time); 	
		this.clock = new ReactiveVar(time);
		
	//}
	
})

Template.registerHelper('globalTimer', function(){
	this.globalTimer = new ReactiveVar(20); 
	return 	
})




Template.nav.helpers({
	'clock':function(){

			if (Template.instance().clock.get() === 0){
				return "out of time"
			} else {
				return Template.instance().clock.get();

			}

	},
	'admin':function(){
		if(Words.find({ "admin":"words" }).fetch()[0]){
			return Words.find({ "admin":"words" }).fetch()[0].owner
		}
	}

})




Template.nav.onDestroyed(function(){
	console.log('onDestroyed');
})




























/**IMAGES**/
Meteor.startup(function() {
  Uploader.finished = function(index, file) {
	  console.log(this);
	  console.log(Uploads);
	  
    Uploads.insert(file);
  }
});


Template['img'].helpers({
  myFormData: function() {
	  console.log(this);
    return { directoryName: 'images', prefix: this._id, _id: this._id }
  },
  filesToUpload: function() {
    return Uploader.info.get();
  }
});

Template['uploadedInfo'].helpers({
  src: function() {
    if (this.type.indexOf('image') >= 0) {
      return 'upload/' + this.path;
    } else return 'file_icon.png';
  }
});

Template['uploadedInfo'].events({
  'click .deleteUpload':function() {
    if (confirm('Are you sure?')) {
      Meteor.call('deleteFile', this._id);
    }
  }
})



