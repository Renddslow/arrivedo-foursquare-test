'use strict';
const got = require('got');

const foursquareSections = require('./lib/foursquareSections');
const config = require('./config');

const appendUrlParams = (url, params) => {
	if (!params || !Object.keys(params).length) {
		return url;
	}
	const response = [ `${url}?` ];
	response.push(...Object.keys(params).map(key => `${key}=${params[key]}`));
	return response.join('&');
};

module.exports = ({ long, lat, section }) => {
	const params = config.foursquare;
	params.limit = 10;
	params.ll = `${long},${lat}`;
	if (section && foursquareSections.includes(section)) {
		params.section = section;
	}
	return got(appendUrlParams('https://api.foursquare.com/v2/venues/explore', params))
		.then(data => JSON.parse(data.body));
};
