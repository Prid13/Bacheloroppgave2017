module.exports = function(app, ref){
	var md5 = require('MD5');

	// add user - POST
	app.post('/api/users', function(req, res){
		ref.connection.query('INSERT INTO Bruker(email, passord, land, alder, kjonn) VALUES("'+req.body.email+'", "'+md5(req.body.passord)+'", "'+req.body.land+'", '+req.body.alder+', "'+req.body.kjonn+'")', function(error, rows, fields){
		    	if(!error){
		    		res.json({"Error": false, "Message": "Bruker lagt til!"});
		    	} else {
		    		res.json({"Error": true, "Message": "Noe gikk galt med innleggingen til databasen! Error: " + error});
		    	}
	    	});
	});
	
	// get all users - GET
	app.get('/api/users', function(req, res){
		ref.connection.query('SELECT * FROM Bruker', function(error, rows, fields){
			if(!error){
		    		res.json({"Error": false, "Message": "Success", "Users": rows});
		    	} else {
		    		res.json({"Error": true, "Message": "Noe gikk galt med sporringen! Error: " + error});
		    	}
		});
	});
	
	// get user by their email - GET
	app.get('/api/users/:email', function(req, res){
		ref.connection.query('SELECT * FROM Bruker WHERE email = "'+req.params.email+'"', function(error, rows, fields){
			if(!error){
		    		res.json({"Error": false, "Message": "Success", "Users": rows});
		    	} else {
		    		res.json({"Error": true, "Message": "Noe gikk galt med sporringen! Error: " + error});
		    	}
		});
	});
	
	// update user password by email_id - PUT
	app.put('/api/users', function(req, res){
		ref.connection.query('UPDATE Bruker SET passord = "'+md5(req.body.passord)+'" WHERE email = "'+req.body.email+'"', function(error, rows, fields){
			if(!error){
		    		res.json({"Error": false, "Message": "Passordet til bruker med email, " + req.body.email + ", ble oppdatert!"});
		    	} else {
		    		res.json({"Error": true, "Message": "Noe gikk galt med sporringen! Error: " + error});
		    	}
		});
	});
	
	// delete user by email - DELETE
	app.delete('/api/users/:email', function(req, res){
		ref.connection.query('DELETE FROM Bruker WHERE email = "'+req.params.email+'"', function(error, rows, fields){
			if(!error){
		    		res.json({"Error": false, "Message": "Bruker med email, " + req.params.email + ", ble slettet!"});
		    	} else {
		    		res.json({"Error": true, "Message": "Noe gikk galt med sporringen! Error: " + error});
		    	}
		});
	});
	
	// send email with new password - POST
	app.post('/api/users/reset', function(req, res){
		var sendmail = require('sendmail')();
		console.log(req.body.email);
		
		ref.connection.query('SELECT * FROM Bruker WHERE email = "'+req.body.email+'"', function(error, rows, fields){
			var newpass = Math.random().toString(36).slice(-8);
			
			if(!error && rows.length > 0){
					sendmail({
						from: 'admin@memoframe.com',
						to: req.body.email,
						subject: 'MemoFrame: Password Reset',
						html: '<b>Nytt passord: </b> ' + newpass,
					}, function(err, reply) {
						
					});
					
					ref.connection.query('UPDATE Bruker SET passord = "'+md5(newpass)+'" WHERE email = "'+req.body.email+'"', function(error, rows, fields){
						if(!error){
							res.json({"Error": true, "Message": "Mail med nytt passord sendt!"});
						} else {
							res.json({"Error": true, "Message": "Kunne ikke sende nytt passord! Error: " + error});
						}
					});
					
			} else {
					res.json({"Error": true, "Message": "Brukeren eksisterer ikke! Error: " + error});
			}
		});
		 
	});

    //send userinfo by email to user - Post
    app.post('/api/users/sendInfo', function(req, res){
       var sendmail = require('sendmail')();
       console.log(req.body.email);

       sendmail({
				   from: 'admin@memoframe.com',
				   to: req.body.email,
				   subject: 'MemoFrame: User information',
				   html: '<b>Du er registrert med denne infoen: </b><br><b>Email: <b/>' +req.body.email+ '<br><b>Passord: <b/>' +req.body.passord+ '<br><b>Land: <b/> ' +req.body.land+ '<br><b>Alder: <b/>'+req.body.alder+'<br><b>Kjonn: <b/>'+ req.body.kjonn
               }, function(err, reply) {
                         // res.json({"Error": true, "Message": "Kunne ikke sende mail!"});
                });

	    res.json({"Error": false, "Message": "Mail sendt!"});
	});
}
