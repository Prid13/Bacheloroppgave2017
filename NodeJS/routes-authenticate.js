module.exports = function(app, ref){
	var md5 = require('MD5');
	var jwt = require('jsonwebtoken');
	var dateFormat = require('dateformat');

	// login user with email/password - POST
	app.post('/api/authenticate', function(req, res){
		console.log(req.body);
		ref.connection.query('SELECT email, passord FROM Bruker WHERE email = "'+req.body.email+'" AND passord = "'+md5(req.body.passord)+'"', function(error, rows, fields){
		    	if(!error){
					if(rows.length == 1){
						var token = jwt.sign({user: req.body.email}, app.get('secretString'), { expiresIn: '24h' });
						res.json({"Error": false, "Message": "Bruker logget inn!", "Token": token});
						
						return;

					}
					
					res.json({"Error": true, "Message": "Feil email eller passord!"});
		    	} else {
		    		res.json({"Error": true, "Message": "Noe gikk galt med innleggingen til databasen! Error: " + error});
               	}
		});
	});
	
	app.use(function(req, res, next){
		var token = req.body.token || req.query.token || req.headers["x-access-token"];
        var token1 = req.headers["newuser"];	

		if(token){
			jwt.verify(token, app.get('secretString'), function(err, decoded){
				if(err){
					return res.json({"Error": true, "Message": "Kunne ikke autentisere token! Error: " + err});
				} else {
					req.decoded = decoded;
					next();
			    }
			});  
		} else if(token1){
			var now = new Date();
			var newtoken = jwt.sign({now}, app.get('secretString'), { expiresIn: '10s' });
					 
			res.json({"Error": false, "Message":"SUCCSESS", "Token": newtoken});
			return;
		} else if(req.body.admin) {
			if(req.body.passkey == app.get('secretString'))
				next();
		} else {
			return res.status(403).send({
				"Error": true,
				"Message": "Fant ingen token."
			});
		}
	});

}