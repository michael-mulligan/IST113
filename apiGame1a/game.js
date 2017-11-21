var jData;

function Game(){
	
	$("#getQuestion").on('click', function(){
		GetQuestion();
	});
	
	$("#showAnswer").on('click', function(){
		$("#data_answer").removeClass("hidden").html(jData[0].answer);
	});
};

function GetQuestion(){
	$("#data_answer").addClass("hidden");
	$.ajax({
			url: "http://jservice.io/api/random",
			dataType: "json"
		})
		.done(function(data){
			jData = data;
			$("#data_category").text(data[0].category.title.toUpperCase());
			$("#data_question").text(data[0].question);
		})
		.fail(function(jqXHR, textStatus, errorThrown){
			/***** Write error to DOM *****/
			console.log(errorThrown);
		});
}

window.onload = function() {
	Game();
};