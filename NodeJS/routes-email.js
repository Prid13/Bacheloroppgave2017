 module.exports = function(app, ref){
	var md5 = require('MD5');
	
	// send email - POST
	app.post('/api/contact', function(req, res){
		var sendmail = require('sendmail')();
		
		sendmail({
			from: req.body.email,
			to: 'prid_outing@hotmail.com',
			subject: 'Hello :D',
			html: '<b>Hello World!</b><br>'+req.body.message,
		}, function(err, reply) {
			res.json({"Error": true, "Message": "Kunne ikke sende mail!"});
		});
		
		res.json({"Error": false, "Message": "Mail sendt!"});
	});

}
