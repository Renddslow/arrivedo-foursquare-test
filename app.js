const restify = require('restify');
const foursquare = require('./foursquare');

const server = restify.createServer();
server.use(restify.plugins.queryParser());

server.get('/recommendations', (req, res, next) => foursquare(req.query)
	.then(data => {
		const suggestionList = data.response.groups.filter(group => group.name === 'recommended')[0];
		if (!suggestionList) {
			res.json({ message: 'There are no suggestions for that longitude and latitude. Bummer huh?' });
		}

		res.json({ data: suggestionList.items });
	}));

server.listen(8080, () => {
	console.log('It\'s working! It\'s working!');
});
