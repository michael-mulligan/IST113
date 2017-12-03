var data0;
var data1;
var data2;

var score = 0;

function Game(){
	
	$("#startGame").on("click", function(){
		$("#cat0").children("h2").text(data0[0].category.title.toUpperCase());
		$("#cat1").children("h2").text(data1[0].category.title.toUpperCase());
		$("#cat2").children("h2").text(data2[0].category.title.toUpperCase());
		$("#introBox").addClass("hidden");
	});
	
	$(".game > div").children("button").each(function(){
		var category = $(this).data().category;
		var index = $(this).data().index;
		$(this).on("click", function(){
			$(this).addClass("nobutton").text("");
			GetQuestion(category, index);
		});
	});
	
	$("#score").text("$" + score);
};

function StartGame(){
	const categories = [16244, 14148, 18254];
	categories.forEach(function (item, index){
		$.ajax({
			url: "http://jservice.io/api/clues",
			data: { category : item},
			dataType: "json"
		})
		.done(function(data){
			switch (index)
			{
				case 0:
					data0 = data;
					break;
				case 1:
					data1 = data;
					break;
				case 2:
					data2 = data;
					break;
			}
		})
		.fail(function(jqXHR, textStatus, errorThrown){
			console.log(errorThrown);
		})
	});
}

function GetQuestion(category, index){
	var answer;
	var cashValue = -1;
	
	$("#answerPrompt").removeClass("hidden");
	$("#AnswerResult").addClass("hidden");
	$("#inputAnswer").val("")
	
	switch (category)
	{
		case 0:
			$("#clue").text(data0[index].question);
			answer = data0[index].answer;
			cashValue = data0[index].value;
			break;
		case 1:
			$("#clue").text(data1[index].question);
			answer = data1[index].answer;
			cashValue = data1[index].value;
			break;
		case 2:
			$("#clue").text(data2[index].question);
			answer = data2[index].answer;
			cashValue = data2[index].value;
			break;
	}
	
	$("#clueBox").removeClass("hidden");
	
	$("#submitAnswer").on("click", function(){
		$("#answerPrompt").addClass("hidden");
		ProcessAnswer(answer, cashValue);
	});
	
	$("#skip").on("click", function(){
		$("#clueBox").addClass("hidden");
	});
}

function ProcessAnswer(answer, cashValue){
	var playerAnswer;
	var check = -1;
	
	playerAnswer = $("#inputAnswer").val();
	check = CheckAnswer(playerAnswer, answer);
	$("#playerAnswer").text(playerAnswer);
	$("#answer").text(answer);
	
	$("#AnswerResult").removeClass("hidden");
	if (check < 4)
	{
		$("#result").addClass("green").removeClass("red").text("Correct!")
	}
	else
	{
		$("#result").addClass("red").removeClass("green").text("Incorrect!")
	}
	
	$("#addValue").off().on("click", function(){
		score += cashValue;
		$("#clueBox").addClass("hidden");
		$("#score").text("$" + score);
	});
	
	$("#subtractValue").off().on("click", function(){
		score -= cashValue;
		$("#clueBox").addClass("hidden");
		$("#score").text("$" + score);
	});
}

function CheckAnswer(a, b) {
	var t = [], u, i, j, m = a.length, n = b.length;
	
	if (!m) 
	{ 
		return n;
	}
	
	if (!n)
	{
		return m;
	}
	
	for (j = 0; j <= n; j++)
	{
		t[j] = j;
	}
	for (i = 1; i <= m; i++)
	{
		for (u = [i], j = 1; j <= n; j++)
		{
			u[j] = a[i - 1] === b[j - 1] ? t[j - 1] : Math.min(t[j - 1], t[j], u[j - 1]) + 1;
		} t = u;
	} return u[n];
}

window.onload = function() {
	Game();
	StartGame();
};