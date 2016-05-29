var express  = require('express');
var mongoose = require('mongoose'); 
var morgan = require('morgan');             
var bodyParser = require('body-parser');    
var methodOverride = require('method-override'); 
var https = require('https');

var app = express();
//mongodb to be connected once deployed with URI

//mongoose.connect('mongodb://localhost/database');    

app.use(express.static(__dirname + '/client'));               
app.use(morgan('dev'));                                        
app.use(bodyParser.urlencoded({'extended':'true'}));          
app.use(bodyParser.json());                                     
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(methodOverride());

//appModel
var mainRouteModel = mongoose.model('mainRouteModel', {
  test: {
  type: String,
  default: ''
  }
});

//routes go under here


// app.get('*', function(req, res) {
//   res.sendFile('./client/index/html'); // load the single view file 
// });

//application under here

//listen(start app with node server.js)
var port = process.env.PORT || 8080;

app.listen(port);

console.log('Server now listening on port ' + port);


		
var options = {
  host: 'api.transitandtrails.org',
  port: 443,
  path: '/api/v1/campgrounds?key=1c78a948e0a02614d9caed392ee1388fc15e5eadc005ca69f7c451e80c02e1a0'
};

https.get(options, function(res) {
  console.log("Got response: " + res.statusCode);

  res.on("data", function(chunk) {
    console.log("BODY: " + chunk);
  });
}).on('error', function(e) {
  console.log("Got error: " + e.message);
});
	

