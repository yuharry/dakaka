var express = require('express'),
	exphbs = require('express-handlebars'),
	routes = require('./routes'),
	data = require('./data.js'),
	app = express(),
	port = process.env.PORT || 3000;

// app.set('view engine', 'ejs');

app.engine('.hbs', exphbs({
	// defaultLayout: 'main',
	extname: '.hbs',
	layoutsDir: 'views/layouts',
	partialsDir: 'views/partials'
}));
app.set('view engine', '.hbs');

app.use('/', express.static('public'));

app.use('/', express.static('dist'));
routes(app);

app.use('/', function(req, res) {
	// 404?
	// res.send('<a href="/">index</a>');
	res.status(404).end();
});

data.init(function() {
	app.listen(port, function() {
		console.log('listening on ' + port);
	});
});
