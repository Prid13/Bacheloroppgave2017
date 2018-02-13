module.exports = function(app, ref){

	// add pin code - POST
	app.post('/api/pincode', function(req, res){
		ref.connection.query('INSERT INTO Pinkode(navn, admin_brukernavn, testid, gyldig) VALUES("'+req.body.navn+'", "'+req.body.admin+'", '+req.body.testid+', '+req.body.gyldig+')', function(error, result){
			if(!error){
				res.json({"Error": false, "Message": "Pinkode lagt til!", "Pinkode": result.insertId});
			} else {
				res.json({"Error": true, "Message": "Noe gikk galt med innleggingen til databasen! Error: " + error});
			}
		});
	});
	
	// get all pin codes - GET
	app.get('/api/pincode', function(req, res){
		ref.connection.query('SELECT * FROM Pinkode', function(error, rows, fields){
			if(!error){
				res.json({"Error": false, "Message": "Success", "Pincodes": rows});
			} else {
				res.json({"Error": true, "Message": "Noe gikk galt med spørringen mot databasen! Error: " + error});
			}
		});
	});
	
	// get test for pin code - GET
	app.get('/api/pincode/test', function(req, res){
		ref.connection.query('SELECT * FROM Pinkode WHERE pinkode = '+req.query.pincode, function(error, rows, fields){
			if(!error){
				ref.connection.query('SELECT * FROM Test WHERE testid = '+rows[0].testid, function(error2, rows2, fields2){
					if(!error2){
						for(var i in rows[0]){
							rows2[0][i] = rows[0][i];
						}
						res.json({"Error": false, "Message": "Success", "Tests": rows2[0]});
					} else {
						res.json({"Error": true, "Message": "Noe gikk galt med sporringen! Error: " + error2});
					}
				});
			} else {
				res.json({"Error": true, "Message": "Noe gikk galt med sporringen! Error: " + error});
			}
		});
	});
	
	// check pin code - GET
	app.get('/api/pincode/validate', function(req, res){
		ref.connection.query('SELECT pinkode FROM Pinkode WHERE pinkode = '+req.query.kode, function(error, rows, fields){
			if(!error){
				if(rows.length > 0)
					res.json({"Error": false, "Message": "PIN Kode finnes!"});
				else
					res.json({"Error": false, "Message": "PIN Kode eksisterer ikke!"});
			} else {
				res.json({"Error": true, "Message": "Noe gikk galt med spørringen mot databasen! Error: " + error});
			}
		});
	});
	
	// login with pin code - GET
	app.post('/api/pincode/login', function(req, res){
		ref.connection.query('SELECT pinkode, testid FROM Pinkode WHERE pinkode = '+req.body.kode, function(error, rows, fields){
			if(!error){
				if(rows.length > 0){
					ref.connection.query('INSERT INTO KodeBruker(kode, nr) VALUES('+req.body.kode+', (SELECT coalesce(MAX(nr),0) + 1 FROM (SELECT * FROM KodeBruker WHERE kode = '+req.body.kode+') AS KodeBrukerTable))', function(error2, result){
						if(!error2){
							
							ref.connection.query('SELECT nr FROM KodeBruker WHERE brukerid = LAST_INSERT_ID()', function(error3, rows2, fields2){
								if(!error3){
									res.json({"Error": false, "Message": "Success", "Pinkode": req.body.kode, "User": rows2[0].nr, "Test": rows[0].testid});
								} else {
									res.json({"Error": true, "Message": "Noe gikk galt med spørringen mot databasen! Error: " + error3});
								}
							});
							
						} else {
							res.json({"Error": true, "Message": "Noe gikk galt med spørringen mot databasen! Error: " + error2});
						}
					});
				} else {
					res.json({"Error": true, "Message": "PIN Kode eksisterer ikke!"});
				}
			} else {
				res.json({"Error": true, "Message": "Noe gikk galt med spørringen mot databasen! Error: " + error});
			}
		});
	});
}
