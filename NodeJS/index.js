var mysql = require("mysql");
var path = require("path");
var bodyparser = require('body-parser');
var express = require('express');
var app = express();
var cors = require('cors');

app.set('secretString', 'bachelor2017');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(cors());
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With', 'content-type', 'authorization', 'x-access-token');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


var http = require('http').Server(app);

var connection;
var ref = {};

function createDBConnection(){
	if(connection) connection.destroy();
	
	connection = mysql.createConnection({
		host	: 'localhost',
		user	: 'root',
		password	: 'raspberry',
		database	: 'TouchPad'
	});
	
	connection.connect(function(err){
		if(err){
			console.log('Error when connecting to database, retrying...');
			connection.end(function(err){
				setTimeout(createDBConnection, 2000);
			});
		} else {
			ref.connection = connection;
		}
	});

	connection.on('error', function(err){
		if(err.code === 'PROTOCOL_CONNECTION_LOST'){
			connection.end(function(err){
				createDBConnection();
			});
		} else {
			console.log("ERROR");
			throw err;
		}
	});
}

createDBConnection();

ref.app = app;
ref.connection = connection;

//** ROUTES **//

// Email Routes
require("./routes-email.js")(app, ref);

// Demo Routes
require("./routes-demo.js")(app, ref);

// Authenticate routes
require("./routes-authenticate.js")(app, ref);

// Bruker routes
require("./routes-bruker.js")(app, ref);

// Admin routes
require("./routes-admin.js")(app, ref);

// PIN Code routes
require("./routes-pin.js")(app, ref);

// Game routes
require("./routes-game.js")(app, ref);

// Test routes
require("./routes-test.js")(app, ref);

http.listen(8080, function(){
    console.log('listening on *:8080');
});
