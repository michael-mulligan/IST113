var secretNumber
var guess = 0;
var attempts = 0;

function enterNumber(){
	secretNumber = document.getElementById("num-input").value;
	document.getElementById("p1-container").style.display = "none";
	document.getElementById("p2-container").style.display = "block";
	document.getElementById("result").innerHTML = "Player 2: Enter a guess."
}

function guessingGame(){
	guess = document.getElementById("input").value;
	
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
}