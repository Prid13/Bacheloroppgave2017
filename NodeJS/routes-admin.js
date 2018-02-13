module.exports = function(app, ref){
	var md5 = require('MD5');

	// add admin - POST
	app.post('/api/admin', function(req, res){
		ref.connection.query('INSERT INTO Admin VALUES("'+req.body.brukernavn+'", "'+md5(req.body.passord)+'")', function(error, rows, fields){
		    	if(!error){
		    		res.json({"Error": false, "Message": "Bruker lagt til!"});
		    	} else {
		    		res.json({"Error": true, "Message": "Noe gikk galt med innleggingen til databasen! Error: " + error});
		    	}
	    	});
	});
	
	// get all admins - GET
	app.get('/api/admin', function(req, res){
		ref.connection.query('SELECT * FROM Admin', function(error, rows, fields){
			if(!error){
		    		res.json({"Error": false, "Message": "Success", "Users": rows});
		    	} else {
		    		res.json({"Error": true, "Message": "Noe gikk galt med sporringen! Error: " + error});
		    	}
		});
	});
	
	// get admin by their username - GET
	app.get('/api/admin/:brukernavn', function(req, res){
		ref.connection.query('SELECT * FROM Admin WHERE brukernavn = "'+req.params.brukernavn+'"', function(error, rows, fields){
			if(!error){
		    		res.json({"Error": false, "Message": "Success", "Users": rows});
		    	} else {
		    		res.json({"Error": true, "Message": "Noe gikk galt med sporringen! Error: " + error});
		    	}
		});
	});
	
	// update admin password by username - PUT
	app.put('/api/admin', function(req, res){
		ref.connection.query('UPDATE Admin SET passord = "'+md5(req.body.passord)+'" WHERE brukernavn = "'+req.body.brukernavn+'"', function(error, rows, fields){
			if(!error){
		    		res.json({"Error": false, "Message": "Passordet til admin med brukernavn, " + req.body.brukernavn + ", ble oppdatert!"});
		    	} else {
		    		res.json({"Error": true, "Message": "Noe gikk galt med sporringen! Error: " + error});
		    	}
		});
	});
	
	// delete admin by username - DELETE
	app.delete('/api/admin/:brukernavn', function(req, res){
		ref.connection.query('DELETE FROM Admin WHERE brukernavn = "'+req.params.brukernavn+'"', function(error, rows, fields){
			if(!error){
		    		res.json({"Error": false, "Message": "Admin med brukernavn, " + req.params.brukernavn+ ", ble slettet!"});
		    	} else {
		    		res.json({"Error": true, "Message": "Noe gikk galt med sporringen! Error: " + error});
		    	}
		});
	});
}