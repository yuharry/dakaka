var apiRouter = require('./apiRouter'),
	pageRouter = require('./pageRouter'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser');

module.exports = function(app) {
	console.log('routes.init');
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended: false
	}));
	app.use(cookieParser());

	app.use('/api', apiRouter);
	app.use('/', pageRouter);
};
