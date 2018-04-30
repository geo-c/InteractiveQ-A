var Display = function () {
	
}

Display.prototype.showData = function (data) {
	$('.answers').html("");
	$("#content").load(data.content);
	$('.question').html(data.question);
	data.answers.forEach(function (element) {
		var $button = $('<button type="button" class="btn btn-primary btn-responsive">'+ element.name +'</button><br><br>');
		$('.answers').append($button);
		$button.click(function(e) {
			window.location.hash = '#'+element.name;
		});
	});
}

Display.prototype.showSteps = function (history) {
	$('.steps').html("");
	history.forEach(function (element) {
		if(!element || element=="") {
			$('.steps').append('<a href="#">Interactive Guide</a>');
		} else {
			$('.steps').append('/<a href='+element+'>' + element.replace("#","") + '</a>');
		}
	});
}

Display.prototype.showResults = function(results) {
	$('#content').html("");
	var count = 0;
	for(key in results) {
		count ++;
	}
	$('#content').html("Your search <b>'" + $('#searchterm').val() + "'</b> has <b>" + count + " results</b>.<br><br>")
	for(key in results) {
		value = results[key];
		if(value != 0) {
			$('#content').append('<a href="#'+value+'">'+ value +'</a><br><br>');
		} else {
			$('#content').append('<a href="#'+value+'"> Interactive Guide </a><br><br>');
		}
	}
}