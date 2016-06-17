import Uploads from '/imports/uploads'



Meteor.startup(function () {
	// init items collection
	//if (Items.find().count() == 0) {
	//Items.insert({name: 'My Item', uploads: []});
	//}

	UploadServer.init({
		tmpDir: process.env.PWD + '/.uploads/tmp',
		uploadDir: process.env.PWD + '/.uploads/',
		checkCreateDirectories: true,
		getDirectory: function(fileInfo, formData) {
			if (formData && formData.directoryName != null) {
				return formData.directoryName;
			}
			return "";
		},
		getFileName: function(fileInfo, formData) {
			if (formData && formData.prefix != null) {
				return formData.prefix + '_' + fileInfo.name;
			}
			return fileInfo.name;
		},
		finished: function(fileInfo, formData) {
			if (formData && formData._id != null) {
				//Items.update({_id: formData._id}, { $push: { uploads: fileInfo }});
			}
		}
	});
});




Meteor.publish('uploads', function() {
	return Uploads.find();
})

Meteor.methods({
	'deleteFile': function(_id) {
		check(_id, String);

		var upload = Uploads.findOne(_id);
		if (upload == null) {
			throw new Meteor.Error(404, 'Upload not found'); // maybe some other code
		}

		UploadServer.delete(upload.path);
		Uploads.remove(_id);
	}
})


/*Meteor.startup(function () {
  UploadServer.init({
  tmpDir: process.env.PWD + '/.uploads/tmp',
  uploadDir: process.env.PWD + '/.uploads/',
  checkCreateDirectories: true //create the directories for you
  });
  });


  Meteor.startup(function() {
//Uploader.uploadUrl = Meteor.absoluteUrl("upload"); // Cordova needs absolute URL
});*/

