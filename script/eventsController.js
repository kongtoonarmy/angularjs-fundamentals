var fs = require('fs');

module.exports.get = function(req, res) {
	var event = fs.readFileSync('app/data/event/' + req.params.id + '.json', 'utf8');
	res.setHeader('Content-Type', 'application/json');
	res.send(event);
};

module.exports.save = function(req, res) {
	var event = req.body;
	fs.writeFileSync('app/data/event/' + req.params.id + '.json', JSON.stringify(event));
	req.send(event);
};

module.exports.getAll = function(req, res) {
	var path = 'app/data/event/';

	var files = [];
	try {
		files = fs.readdirSync(path);
	} catch (e) {
		res.send('[]');
		res.end();
	}

	console.log(files);

	var results = "[";
	for (var idx = 0; idx < files.length; idx++) {
		if (files[idx].indexOf(".json") == files[idx].length - 5) {
			results += fs.readFileSync(path + "/" + files[idx]) + ",";
		}
	}

	results = results.substr(0, results.length - 1);
	results += "]";

	res.setHeader('Content-Type', 'application/json');
	res.send(results);
	res.end();
}
