var count = 0;

module.exports = {
	
	getRandomImages: function(res, num){
		var fs = require('fs');
		var images = [];
		
		fs.readdir('/var/www/html/images', function(err, files) {
			if (err) return;
			
			files.forEach(function(f) {
				images.push("http://www.gruppe18.tk/images/" + f);
			});
			
			var randomImages = [];
			var len = images.length;
			
			for(i = 0; i < (num < len && num > 0 ? num : len); i++){
				var ran = Math.floor(Math.random()*images.length);
				randomImages.push(images[ran]);
				images.splice(ran, 1);
			}
	
			res.json({"images": randomImages});
			
		});
	},
	
	getRandomImagesAsString: function(num){
		var fs = require('fs');
		var images = [];
		
		fs.readdir('/var/www/html/images', function(err, files) {
			if (err) return;
			
			files.forEach(function(f) {
				images.push("http://www.gruppe18.tk/images/" + f);
			});
			
			var len = images.length;
			var imgString = "[";
			
			for(i = 0; i < (num < len && num > 0 ? num : len); i++){
				var ran = Math.floor(Math.random()*images.length);
				imgString += images[ran] + ", ";
				images.splice(ran, 1);
			}
			
			imgString = imgString.slice(0, -2);
			imgString += "]";
	
			return imgString;
			
		});
	},
	
	saveRandomImagesAsString: function(ref, res, total, num, current, rundetekst, insertId){
		if(num == 0)
			count = 0;
		
		var fs = require('fs');
		var images = [];
		
		fs.readdir('/var/www/html/images', function(err, files) {
			if (err) return;
			
			files.forEach(function(f) {
				images.push("http://www.gruppe18.tk/images/" + f);
			});
			
			var len = images.length;
			var imgString = "[";
			
			for(i = 0; i < (num < len && num > 0 ? num : len); i++){
				var ran = Math.floor(Math.random()*images.length);
				imgString += '"' + images[ran] + '", ';
				images.splice(ran, 1);
			}
			
			imgString = imgString.slice(0, -2);
			imgString += "]";
	
			ref.connection.query('INSERT INTO Testrunde(bilder, tekst, testid, rundenr) VALUES('+JSON.stringify(imgString)+', "'+rundetekst+'", '+insertId+', '+(current+1)+')', function(error, rows, fields){
				if(!error){
					if(++count >= total)
						res.json({"Error": false, "Message": "Success"});
				} else {
					res.json({"Error": true, "Message": "Noe gikk galt med sporringen! Error: " + error});
				}
			});
			
		});
	}
}
