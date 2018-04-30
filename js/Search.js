var Search = function () {
	
}

Search.prototype._inConfig = function (data, searchterm, cb) {
	if (data.question.toLowerCase().includes(searchterm.toLowerCase())) {
		cb(data);
	} else if(data.name) {
		if(data.name.toLowerCase().includes(searchterm.toLowerCase())) {
			cb(data);
		}
	} else {
		cb(null)
	}
}

Search.prototype.inConfig = function (data, searchterm, results, cb) {
	this._inConfig(data, searchterm, function(data) {
		if(data) {
			results[data.name] = data.name;
			cb(results);
		} else {
			cb(results);
		}
	});

	var that = this;

	data.answers.forEach(function (answers) {
		that.inConfig(answers, searchterm, results, cb)
	});
}


Search.prototype.inHTML = function (data, searchterm, results, cb) {
	for(key in data) {
		value = data[key];
		if(value.toLowerCase().includes(searchterm.toLowerCase())) {
			if(key == 0) {
				results[key] = "";
			} else {
				results[key] = key;
			}
		}
	}
	cb(results);
}

Search.prototype.getParent = function(data, parent, name, cb) {
	var that = this;
	if(!name) {
		cb("");
	} else {
		if(data.name == name) {
			cb(parent);
		} else {
			data.answers.forEach(function (element) {
				that.getParent(element, data.name, name, cb);
			});
		}
	}
}


Search.prototype.getParents = function (data,parents, name, cb) {
	this.getParent(data, "", name, function(parent) {
		if(!parent || parent == "" || parent == undefined) {
			cb(parents);
		} else {
			parents.unshift(parent);
			this.getParents(data, parents, parent, cb);
		}
	})
}