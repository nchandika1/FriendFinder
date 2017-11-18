/*
 * Stores all the non html rendering api functions for the server
 */

// Get access to the friends array stored in an external file
var friends = require("../data/members.js");

// Utility function to check compatibility
// Returns the best matched friend entry
function checkCompatibility(scores) {
	var match = {};
	var matchIndex = 0;
	var sum = 0;
	for (var i=0; i<friends.length; i++) {
		var tempSum = 0;

		// Get the diff between each score for a given friend and the new friend
		// Add them up together
		for (var j=0; j<friends[i].answers.length; j++) {
			var friendScore = parseInt(scores[j]);
			var matchScore = parseInt(friends[i].answers[j]);
			if (matchScore > friendScore) {
				tempSum += (matchScore - friendScore);
			} else {
				tempSum += (friendScore - matchScore);
			}
		}

		if (tempSum == 0) {
			//Exact Match
			matchIndex = i;
			break;
		}

		if (sum == 0 || sum > tempSum) {
			//Best match so far
			sum = tempSum;
			matchIndex = i;
		}
	}

	// Let us send the name and photo of the friend that best matched
	match.name = friends[matchIndex].name;
	match.photo = friends[matchIndex].photo;
	return match;
}

module.exports = function(app) {

	// Get all the members and send it in JSON format
	app.get("/api/friends", function(req, res) {
		console.log("GET friends list");
		return res.json(friends);
	});

	// Set the new member into the list and find a best matched friend
	// Return the information of the best match so it can be used by the client
	app.post("/new", function(req, res){

		console.log("POST new friend data");

		var responses = req.body["scores[]"];
		
		var newFriend = {
			name: req.body.name,
			photo: req.body.photo,
			answers: responses
		}

		var bestFriend = checkCompatibility(newFriend.answers);
		friends.push(newFriend);

		// Display modal here
		return res.json(bestFriend);
	});
};