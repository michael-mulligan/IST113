"use strict";

// using a function contructor form to create an object
function MyApp()
{
	var version = "v1.0";
	var secretNumber;
	var guess = 0;
	var attempts = 0;

	// creating a private function
	function setStatus(message)
	{
		$("#app>footer").text(message);
	}

	// creating a public function
	this.start = function()
	{
		$("#app>header").append(version);
		setStatus("ready");
	};
	
	$('#num-submit').on('click', function enterNumber(){
		secretNumber = parseInt(document.getElementById("num-input").value);
		document.getElementById("p1-container").style.display = "none";
		document.getElementById("p2-container").style.display = "block";
		document.getElementById("result").innerHTML = "Player 2: Enter a guess."
	});	

	$('#submit').on('click', function guessingGame(){
		guess = parseInt(document.getElementById("input").value);
		
		if (guess > secretNumber){
			attempts++
			document.getElementById("result").innerHTML = "Your guess is TOO HIGH! Please try again. Attempt(s) = " + attempts;
		}
		else if (guess < secretNumber){
			attempts++
			document.getElementById("result").innerHTML = "Your guess is TOO LOW! Please try again. Attempt(s) = " + attempts;
		}
		else {
			attempts++
			document.getElementById("result").innerHTML = "The secret number was " + secretNumber + ". You guessed it in " + attempts + " attempt(s)!";
			document.getElementById("p2-container").style.display = "none";
			document.getElementById("play-again").style.display = "block";
		}
	});
	
	
} // end MyApp

/* 	JQuery's shorthand for the document ready event handler
		could be written: $(document).ready(handler);

		When this page loads, we'll create a global variable
		named "app" by attaching it to the "window" object
		(part of the BOM - Browser Object Model)
*/
$(function() {
	window.app = new MyApp();
	window.app.start();
});
