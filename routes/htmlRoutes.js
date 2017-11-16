/*
 * Stores all the html render functions for the server
 */

var path = require("path");

module.exports = function(app) {

	// Home page
	app.get("/", function(req, res) {
		console.log("GET index page");
		res.sendFile(path.join(__dirname, "../public/index.html"));
	});

	// Survey page
	app.get("/survey", function(req, res) {
		console.log("GET Survey page");
		res.sendFile(path.join(__dirname, "../public/survey.html"))
	});
};