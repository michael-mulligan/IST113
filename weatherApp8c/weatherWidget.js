function WeatherWidget ($widget, wuKey)
{
	var lat;
	var lon;
	
	this.update = function()
	{
		$(".results", $widget).hide();
		$(".loading", $widget).show();
		getLocation();
	};
	
	function getWeatherReport()
	{
		var coords = lat + "," + lon;
		$.ajax({
			url: "https://api.weather.gov/points/" + coords + "/forecast",
			dataType : "json"
		})
			.done(function(data)
			{
				populateWeather(data);
			})
			.fail(function(jqXHR, textStatus, errorThrown)
			{
				showError(errorThrown);
			});
	}
	
	function populateWeather(data)
	{
		console.log(data.properties.periods[0].startTime);
		var observation = data.current_observation;
		
		$(".results header img", $widget).attr("src", data.properties.periods[0].icon);
			
		$(".location>span", $widget).text(data.properties.periods[0].name);
			
		/*$(".conditions>span").each(function(i, e)
		{
			var $span = $(this);
			var field = $span.data("field");
			$(this).text(observation[field]);
		});*/
		
		$(".loading", $widget).fadeOut(function ()
		{
			$(".results", $widget).fadeIn();
		});
	}
	
	function getLocation()
	{
		if (navigator.geolocation)
		{
			navigator.geolocation.getCurrentPosition(
			function(position)
			{
				$("#latitude").val(position.coords.latitude);
				$("#longitude").val(position.coords.longitude);
				
				lat = position.coords.latitude;
				lon = position.coords.longitude;
				getWeatherReport();

			},
			function(error)
			{
				$("#controls .error")
					.text("ERROR: " + error.message)
					.slideDown();
			});
		}
	}
}