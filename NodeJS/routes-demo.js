module.exports = function(app, ref){
	var imgFunctions = require('./functions-images.js');
	
	//*** IMAGES ***//
	app.get('/api/images', function(req, res){
		imgFunctions.getRandomImages(res, req.query.number ? req.query.number : 0);
	});
}