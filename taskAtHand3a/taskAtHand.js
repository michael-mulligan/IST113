"use strict";

// using a function contructor form to create an object
function TaskAtHandApp()
{
	var version = "v3.0",
		appStorage = new AppStorage("taskAtHand");

	function saveTaskList()
	{
		var tasks = [];
		$("#task-list .task span.task-name").each(function(){
			tasks.push($(this).text());
		});
		appStorage.setValue("taskList", tasks);
	}
	
	function loadTaskList()
	{
		var tasks = appStorage.getValue("taskList");
		if (tasks)
		{
			for (var i in tasks)
			{
				addTaskElement(tasks[i]);
			}
		}
	}
	
	// creating a private function
	function setStatus(message)
	{
		$("#app>footer").text(message);
	}

	// creating a public function
	this.start = function()
	{
		$("#new-task-name").keypress(function(e) {
			if (e.which == 13) //Checks that enter key was pressed
			{
				addTask();
				return false;
			}
		})
		.focus();
		
		$("#app>header").append(version);
		loadTaskList();
		setStatus("ready");
		$("#theme").change(onChangeTheme);
		loadTheme();
	};
	
	function addTask()
	{
		var taskName = $("#new-task-name").val();
		
		if (taskName)
		{
			addTaskElement(taskName);
			$("#new-task-name").val("").focus();
		}
	}
	
	function addTaskElement (taskName)
	{
		var $task = $("#task-template .task").clone();
		$("span.task-name", $task).text(taskName);
		
		$("#task-list").append($task);
		
		/*$("button.delete", $task).click(function() { $task.remove(); });
		
		$("button.move-up", $task).click(function(){
			$task.insertBefore($task.prev());
		});
		
		$("button.move-down", $task).click(function() {
			$task.insertAfter($task.next());
		});*/
		
		$("span.task-name", $task).click(function() {
			onEditTaskName($(this));
		});
		
		$("input.task-name", $task).change(function() {
			onChangeTaskName($(this));
		})
		.blur(function(){
			$(this).hide().siblings("span.task-name").show();
		});
		
		$("button.toggle-details", $task).click(function() {
			toggleDetails($task);
		});
		
		$("button.delete", $task).click(function() {
			removeTask($task);
		});
		
		$("button.move-up", $task).click(function() {
			moveTask($task, true);
		});
		
		$("button.move-down", $task).click(function() {
			moveTask($task, false);
		});
		
		saveTaskList();
		
		$task.click(function() { onSelectTask($task); });
		
		
	}
	
	function removeTask($task)
		{
			$task.remove();
			saveTaskList();
		}
		
	function moveTask($task, moveUp)
	{
		if (moveUp)
		{
			$task.insertBefore($task.prev());
		}
		
		else
		{
			$task.insertAfter($task.next());
		}
		saveTaskList();
	}
	
	function onEditTaskName ($span){
		$span.hide()
			.siblings("input.task-name")
			.val($span.text())
			.show()
			.focus();
	}
	
	function onChangeTaskName($input){
		$input.hide();
		var $span = $input.siblings("span.task-name");
		if ($input.val()){
			$span.text($input.val());
		}
		$span.show();
		saveTaskList();
	}
	
	function onSelectTask($task)
	{
		if ($task)
		{
			//Unselect other tasks
			$task.siblings(".selected").removeClass("selected");
			//Select this task
			$task.addClass("selected");
		}
	}
	
	function onChangeTheme()
	{
		var theme = $("#theme>option").filter(":selected").val();
		setTheme(theme);
		appStorage.setValue("theme", theme);
	}
	
	function setTheme(theme)
	{
		$("#theme-style").attr("href", "themes/" + theme + ".css");
	}
	
	function loadTheme()
	{
		var theme = appStorage.getValue("theme");
		if (theme)
		{
			setTheme(theme);
			$("#theme>option[value=" + theme + "]").attr("selected", "selected");
		}
	}
	
	function toggleDetails($task)
	{
		$(".details", $task).slideToggle();
		$("button.toggle-details", $task).toggleClass("expanded");
	}
	
} // end MyApp

$(function() {
	window.app = new TaskAtHandApp();
	window.app.start();
});
