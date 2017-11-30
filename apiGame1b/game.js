var data0;
var data1;
var data2;

function Game(){
	
	$("#startGame").on("click", function(){
		StartGame();
		$("#introBox").addClass("hidden");
	});
	
	$(".game > div").children("button").each(function(){
		var category = $(this).data().category;
		var index = $(this).data().index;
		$(this).on("click", function(){
			GetQuestion(category, index);
		});
	});
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
	
	/*$(#"cat0").children("button").each(function () {
		this.on('click' function() {
			
		})
	});*/
}

function GetQuestion(category, index){
	console.log(category);
}


window.onload = function() {
	Game();
};