var Loader = function () {
}

Loader.prototype.htmlData = [];



Loader.prototype.getContent = function(data) {
	if(data) {
		if(data.content) {
			for(i in data.answers) {
				this.getContent(data.answers[i]);
			}
			this.addHTMLData(data);
		}
	}
}

Loader.prototype.addHTMLData = function (obj) {
	var that = this;
	if(obj.name) {
		$.get(obj.content, function( html ) {
		    that.htmlData[obj.name] = html
		});
	} else {
		$.get(obj.content, function( html ) {
		    that.htmlData[0] = html
		});
	}
}