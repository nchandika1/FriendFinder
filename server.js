// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
// var path = require("path");
// var friends = require("./data/members.js");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Get the route functions from the external files
require("./routes/htmlRoutes")(app);
require("./routes/apiRoutes")(app);

// Start the server...
app.listen(PORT, function(){
	console.log("Server listening on port: " + PORT);
});

