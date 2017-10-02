function changeColorLeft(){
	document.getElementById("inner-left").style.backgroundColor="white";
	document.getElementById("inner-right").style.backgroundColor="blue";
    document.getElementById("background").style.backgroundColor="white";
	document.getElementById("label").style.color="black";
	document.getElementById("label").innerHTML="ON";
}

function changeColorRight(){
	document.getElementById("inner-left").style.backgroundColor="blue";
	document.getElementById("inner-right").style.backgroundColor="white";
    document.getElementById("background").style.backgroundColor="black";
	document.getElementById("label").style.color="white";
	document.getElementById("label").innerHTML="OFF";
	
}