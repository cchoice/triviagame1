$(document).ready(function () {
var options = [
	{
		quote: "The interesting thing is why we're so desperate for this anesthetic against loneliness.", 
		choice: ["Emily Dickenson", "David Foster Wallace", "Yoda", "Stephen King"],
		answer: 1,
		photo: "assets/images/dfw.jpg"
	 },
	 {
	 	quote: "Forever is composed of nows.", 
		choice: ["Emily Dickenson", "David Foster Wallace", "Mark Twain", "Phillip K. Dick"],
		answer: 0,
		photo: "assets/images/ed.jpg"
	 }, 
	 {
	 	quote: "If you tell the truth, you don't have to remember anything.", 
		choice: ["Sylvia Plath", "Marcel Proust", "mark Twain", "Victor Hugo" ],
		answer: 2,
		photo: "assets/images/mt.jpg"
	}, 
	{
		quote: "People are trapped in history and history is trapped in them.", 
		choice: ["William Faulkner", "Charles Dickens", "Ernest Hemingway", "James Baldwin" ],
		answer: 3,
		photo: "assets/images/jb.jpg"
	}, 
	{
		quote: "The most common way people give up their power is by thinking they don't have any.", 
		choice: ["Charles Dickens", "James Baldwin", "Audre Lorde", "Alice Walker" ],
		answer: 3,
		photo: "assets/images/aw.jpg"
	}, 
	{
		quote: "That is what learning is. You suddenly understand something you've understood all your life, but in a new way.", 
		choice: ["James Baldwin", "Doris Lessing", "Ernest Hemingway", "William Faulkner" ],
		answer: 1,
		photo: "assets/images/dl.jpg"
	}, 
	{
		quote: "You are never stronger...than when you land on the other side of despair.", 
		choice: ["Doris Lessing", "Zadie Smith", "Mark Twain", "Ernest Hemingway" ],
		answer: 1,
		photo: "assets/images/zs.jpg"
	}, 
	{
		quote: "Death is not the opposite of life, but a part of it.", 
		choice: ["Haruki Murakami", "Zadie Smith", "Doris Lessing", "Marcel Proust" ],
		answer: 0,
		photo: "assets/images/hm.jpg"
	}];

var correctCount = 0;
var wrongCount = 0;
var unanswerCount = 0;
var timer = 20;
var intervalId;
var userGuess ="";
var running = false;
var qCount = options.length;
var pick;
var index;
var newArray = [];
var holder = [];



$("#reset").hide();
//click start button to start game
$("#start").on("click", function () {
		$("#start").hide();
		displayquote();
		runTimer();
		for(var i = 0; i < options.length; i++) {
	holder.push(options[i]);
}
	})
//timer start
function runTimer(){
	if (!running) {
	intervalId = setInterval(decrement, 1000); 
	running = true;
	}
}
//timer countdown
function decrement() {
	$("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
	timer --;

	//stop timer if reach 0
	if (timer === 0) {
		unanswerCount++;
		stop();
		$("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
		hidepicture();
	}	
}

//timer stop
function stop() {
	running = false;
	clearInterval(intervalId);
}
//randomly pick quote in array if not already shown
//display quote and loop though and display possible answers
function displayquote() {
	//generate random index in array
	index = Math.floor(Math.random()*options.length);
	pick = options[index];

//	if (pick.shown) {
//		//recursive to continue to generate new index until one is chosen that has not shown in this game yet
//		displayquote();
//	} else {
//		console.log(pick.quote);
		//iterate through answer array and display
		$("#quoteblock").html("<h2>" + pick.quote + "</h2>");
		for(var i = 0; i < pick.choice.length; i++) {
			var userChoice = $("<div>");
			userChoice.addClass("answerchoice");
			userChoice.html(pick.choice[i]);
			//assign array position to it so can check answer
			userChoice.attr("data-guessvalue", i);
			$("#answerblock").append(userChoice);
//		}
}



//click function to select answer and outcomes
$(".answerchoice").on("click", function () {
	//grab array position from userGuess
	userGuess = parseInt($(this).attr("data-guessvalue"));

	//correct guess or wrong guess outcomes
	if (userGuess === pick.answer) {
		stop();
		correctCount++;
		userGuess="";
		$("#answerblock").html("<p>Correct!</p>");
		hidepicture();

	} else {
		stop();
		wrongCount++;
		userGuess="";
		$("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
		hidepicture();
	}
})
}


function hidepicture () {
	$("#answerblock").append("<img src=" + pick.photo + ">");
	newArray.push(pick);
	options.splice(index,1);

	var hidpic = setTimeout(function() {
		$("#answerblock").empty();
		timer= 20;

	//run the score screen if all quotes answered
	if ((wrongCount + correctCount + unanswerCount) === qCount) {
		$("#quoteblock").empty();
		$("#quoteblock").html("<h3>Game Over!  Here's how you did: </h3>");
		$("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
		$("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
		$("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
		$("#reset").show();
		correctCount = 0;
		wrongCount = 0;
		unanswerCount = 0;

	} else {
		runTimer();
		displayquote();

	}
	}, 3000);


}

$("#reset").on("click", function() {
	$("#reset").hide();
	$("#answerblock").empty();
	$("#quoteblock").empty();
	for(var i = 0; i < holder.length; i++) {
		options.push(holder[i]);
	}
	runTimer();
	displayquote();

})

})