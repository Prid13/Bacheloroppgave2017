module.exports = function(app, ref){
	var imgFunctions = require('./functions-images.js');
	
	// new test - GET
	app.post('/api/test', function(req, res){
		ref.connection.query('INSERT INTO Test(testnavn, testbeskrivelse, oppgavetekst, tidsdelay, vanskelighetsgrad, gyldig, admin_id) VALUES("'+req.body.testnavn+'", "'+req.body.beskrivelse+'", "'+req.body.tekst+'", '+req.body.delay+', '+req.body.vanskelighetsgrad+', '+req.body.gyldig+', 1)', function(error, result){
			if(!error){
				if(req.body.random){
					var count = 0;
					for(var i = 0; i < req.body.random_runder; i++){
						/*ref.connection.query('INSERT INTO Testrunde(bilder, tekst, testid, rundenr) VALUES('+JSON.stringify(imgFunctions.getRandomImagesAsString())+', "'+req.body.rundetekst+'", '+result.insertId+', '+(i+1)+')', function(error2, rows2, fields2){
							if(!error2){
								if(++count >= req.body.random_runder)
									res.json({"Error": false, "Message": "Success"});
							} else {
								res.json({"Error": true, "Message": "Noe gikk galt med sporringen! Error: " + error2});
							}
						});*/
						imgFunctions.saveRandomImagesAsString(ref, res, req.body.random_runder, req.body.antall_bilder, i, req.body.rundetekst, result.insertId);
					}
				} else {
		    		res.json({"Error": false, "Message": "Success"});
				}
			} else {
				res.json({"Error": true, "Message": "Noe gikk galt med sporringen! Error: " + error});
			}
		});
	});
	
	// get all tests - GET
	app.get('/api/test', function(req, res){
		ref.connection.query('SELECT Test.*, Testrund.antall_runder FROM Test LEFT JOIN (SELECT testid, COUNT(*) AS antall_runder FROM Testrunde GROUP BY testid) AS Testrund ON Test.testid = Testrund.testid', function(error, rows, fields){
			if(!error){
				res.json({"Error": false, "Message": "Success", "Tests": rows});
			} else {
				res.json({"Error": true, "Message": "Noe gikk galt med sporringen! Error: " + error});
			}
		});
	});
	
	// update test - GET
	app.post('/api/test', function(req, res){
		ref.connection.query('UPDATE Test SET testnavn = "'+req.body.testnavn+'", testbeskrivelse = "'+req.body.beskrivelse+'", oppgavetekst = "'+req.body.tekst+'", tidsdelay = '+req.body.delay+', vanskelighetsgrad = '+req.body.vanskelighetsgrad+', gyldig = '+req.body.gyldig+' WHERE testid = '+req.body.testid, function(error, rows, fields){
			if(!error){
		    		res.json({"Error": false, "Message": "Success"});
		    	} else {
		    		res.json({"Error": true, "Message": "Noe gikk galt med sporringen! Error: " + error});
		    	}
		});
	});
	
	// get all tests for admin_name - GET
	app.get('/api/test', function(req, res){
		ref.connection.query('SELECT * FROM Test WHERE admin_id = '+req.query.adminid, function(error, rows, fields){
			if(!error){
		    		res.json({"Error": false, "Message": "Success", "Tests": rows});
		    	} else {
		    		res.json({"Error": true, "Message": "Noe gikk galt med sporringen! Error: " + error});
		    	}
		});
	});
	
	// get test with id - GET
	app.get('/api/test/:testid(\\d+)', function(req, res){
		ref.connection.query('SELECT * FROM Test Where testid = ' + req.params.testid, function(error, rows, fields){
			if(!error){
				if(rows.length > 0){

					ref.connection.query('SELECT brukernavn FROM Admin WHERE admin_id = ' + rows[0].admin_id, function(error2, rows2, fields2){
						if(!error2){
							for(i in rows)
								rows[i].creator = rows2[0].brukernavn;
							
							res.json({"Error": false, "Message": "Success", "Tests": rows});
						} else {
							res.json({"Error": true, "Message": "Noe gikk galt med sporringen! Error: " + error2});
						}
					});
					
				} else
					res.json({"Error": true, "Message": "Fant ikke test med ID: " + req.params.testid});
			} else {
				res.json({"Error": true, "Message": "Noe gikk galt med sporringen! Error: " + error});
			}
		});
	});
	
	// new test round for test_id - GET
	app.post('/api/test/runde', function(req, res){
		ref.connection.query('SELECT * FROM Testrunde WHERE testid = '+req.body.testid+' AND rundenr = ' + req.body.rundenr, function(error, rows, fields){
			if(!error){
				if(rows.length == 0){
					ref.connection.query('INSERT INTO Testrunde(bilder, tekst, testid, rundenr) VALUES('+JSON.stringify(req.body.bilder)+', "'+req.body.tekst+'", '+req.body.testid+', '+req.body.rundenr+')', function(error, rows, fields){
						if(!error){
							res.json({"Error": false, "Message": "Success"});
						} else {
							res.json({"Error": true, "Message": "Noe gikk galt med sporringen! Error: " + error});
						}
					});
				} else {
					res.json({"Error": true, "Message": "Testid og rundenr finnes allerede fra før! Bytt rundenr."});
				}
			} else {
				res.json({"Error": true, "Message": "Noe gikk galt med sporringen! Error: " + error});
			}
		});
	});
	
	// update test round for test_id - GET
	app.put('/api/test/runde', function(req, res){
		ref.connection.query('SELECT * FROM Testrunde WHERE testid = '+req.body.testid+' AND rundenr = ' + req.body.rundenr, function(error, rows, fields){
			if(!error){
				if(rows.length == 1){
					ref.connection.query('UPDATE Testrunde SET bilder = '+JSON.stringify(req.body.bilder)+', tekst = "'+req.body.tekst+'" WHERE testid = '+req.body.testid+' AND rundenr = '+req.body.rundenr, function(error, rows, fields){
						if(!error){
							res.json({"Error": false, "Message": "Success"});
						} else {
							res.json({"Error": true, "Message": "Noe gikk galt med sporringen! Error: " + error});
						}
					});
				} else {
					res.json({"Error": true, "Message": "Testid og rundenr kombinasjon finnes ikke!"});
				}
			} else {
				res.json({"Error": true, "Message": "Noe gikk galt med sporringen! Error: " + error});
			}
		});
	});
	
	// get all test rounds for test_id - GET
	app.get('/api/test/runde', function(req, res){
		ref.connection.query('SELECT Testrunde.* FROM Test, Testrunde WHERE Test.testid = Testrunde.testid AND Testrunde.testid = ' + req.query.testid, function(error, rows, fields){
			if(!error){
					for(i in rows){
						rows[i].bilder = JSON.parse(rows[i].bilder);
					}
		    		res.json({"Error": false, "Message": "Success", "Testrunder": rows});
		    	} else {
		    		res.json({"Error": true, "Message": "Noe gikk galt med sporringen! Error: " + error});
		    	}
		});
	});
	
	// get a single test round for test_id - GET
	app.get('/api/test/runde/:rundeid(\\d+)', function(req, res){
		ref.connection.query('SELECT Testrunde.* FROM Test, Testrunde WHERE Test.testid = Testrunde.testid AND Testrunde.testid = ' + req.query.testid + ' AND Testrunde.rundenr = ' + req.params.rundeid, function(error, rows, fields){
			if(!error){
				if(rows.length > 0){
					for(i in rows){
						rows[i].bilder = JSON.parse(rows[i].bilder);
					}
		    		res.json({"Error": false, "Message": "Success", "Testrunde": rows});
				} else
					res.json({"Error": true, "Message": "Fant ikke testrunde for test med ID: " + req.query.testid});
			} else {
				res.json({"Error": true, "Message": "Noe gikk galt med sporringen! Error: " + error});
			}
		});
	});
}