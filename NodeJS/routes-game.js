module.exports = function(app, ref){
	var imgFunctions = require('./functions-images.js');
	
	// new demo game - POST
	app.post('/api/demo', function(req, res){
		ref.connection.query('INSERT INTO Test(testbeskrivelse, oppgavetekst, tidsdelay, vanskelighetsgrad, kjonn) VALUES("'+req.body.email+'", "'+md5(req.body.passord)+'", "'+req.body.land+'", '+req.body.alder+', "'+req.body.kjonn+'")', function(error, rows, fields){
			if(!error){
				res.json({"Error": false, "Message": "Bruker lagt til!"});
			} else {
				res.json({"Error": true, "Message": "Noe gikk galt med innleggingen til databasen! Error: " + error});
			}
		});
	});
	
	// save test results - POST
	app.post('/api/resultat', function(req, res){
		ref.connection.query('INSERT INTO Brukertest(email, testid, tid_start, poeng, tid_slutt) VALUES("'+req.body.email+'", '+req.body.testid+', "'+req.body.tid_start+'", '+req.body.poeng+', "'+req.body.tid_slutt+'")', function(error, rows, fields){
			if(!error){
				res.json({"Error": false, "Message": "Resultat lagt til!"});
			} else {
				res.json({"Error": true, "Message": "Noe gikk galt med innleggingen til databasen! Error: " + error});
			}
		});
	});
}