$(document).ready(function() {

	var allData;
	var history = [];
	var search = new Search();
	var display = new Display();
	var loader = new Loader();

	var loadConfig = function (Hash) {
        $.ajax({
            'async': false,
            'global': false,
            'url': window.location.href + "config.json",
            'dataType': "json",
            'success': function (data) {
                allData = data;
                loader.getContent(data);
                if(Hash) {
                	searchContentByName(data, Hash.replace("#",""), function(_data) {display.showData(_data)});
                	display.showSteps(history);
                } else {
                	display.showData(data);
                	display.showSteps(history);
                }
            },
            'error': function (error) {
            	console.log(error);
            }
        });
	}

	var searchContentByName = function(data, name, _cb) {
		if(!name) {
			_cb(data);
		} else {
			if(data.name == name) {
				_cb(data);
			} else {
				data.answers.forEach(function (element) {
					searchContentByName(element, name, _cb)
				});
			}
		}
	}

	$('#sidebarCollapse').on('click', function () {
		console.log("collapse");
        $('#sidebar').toggleClass('active');
    });


	var init = function () {
		history=[];
		history.push("");
		if(window.location.hash) {
			$.ajax({
	            'async': false,
	            'global': false,
	            'url': window.location.href + "config.json",
	            'dataType': "json",
	            'success': function (data) {
	            	search.getParents(data, [], window.location.hash.replace('#',''), function(parents) {
	            		parents.forEach(function(obj) {
	            			history.push('#' + obj);
	            		})
	            		history.push(window.location.hash.replace('#',''))
	            		display.showSteps(history);
	            	});
	            }
	        });
			loadConfig(window.location.hash);	
		} else {
			loadConfig();
		}
	}

	init();

	$(window).on('hashchange', function() {
		index = history.indexOf(window.location.hash);
		if(index > -1) {
			for(i=0;i<history.length+1;i++) {
				if(i>index) {
					history.splice(i,1);
				}
			}
		} else {
			history.push(window.location.hash);
		}
		$('.answers').html("");
		$('#searchterm').val("")
		searchContentByName(allData, window.location.hash.replace("#",""), function(_data) {display.showData(_data)});
		display.showSteps(history);
	});


	$('#searchterm').on('input', function() {
		
		if($('#searchterm').val().length > 1) {
			search.inHTML(loader.htmlData, $('#searchterm').val(), [], function(results) {
				console.log(results);
				search.inConfig(allData, $('#searchterm').val(), results, function(results) {
					console.log(results);
					display.showResults(results);
				})
			});
			/*
			serachinHTML(htmlData, $('#searchterm').val(), [], function(results) {
				console.log(results);
				searchInConfig(allData, $('#searchterm').val(), results, function(results) {
					console.log(results);
					showResults(results);
				})
			});*/
		} else {
			searchContentByName(allData, window.location.hash.replace("#",""), function(_data) {display.showData(_data)});
		}
	});

});