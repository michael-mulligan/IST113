var secretNumber = Math.floor(Math.random() * 9) + 1; 
var guess = 0;
var attempts = 0;

function guessingGame(){
	guess = document.getElementById("input").value;
	if (guess > 10 || guess < 1){
		document.getElementById("result").innerHTML = "Your guess is invalid!";
	}
	else if (guess > secretNumber){
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
		document.getElementById("input").style.display = "none";
		document.getElementById("submit").style.display = "none";
		document.getElementById("play-again").style.display = "block";
	}
}