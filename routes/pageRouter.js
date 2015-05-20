var r = require('express').Router(),
	common = require('../common'),
	data = require('../data');

module.exports = function() {
	var goLogin;

	goLogin = function(response) {
		response.redirect('/login');
	};

	r.get('/', function(req, res) {
		var _id = common.getIdInCookie(req.cookies);
		if (_id) {
			res.redirect('/wall');
		} else {
			res.redirect('/login');
		}

	});

	r.get('/login', function(req, res) {
		var _id = common.getIdInCookie(req.cookies);
		if (_id) {
			res.redirect('/');
		} else {
			res.render('login');
		}
	});

	r.get('/wall', function(req, res) {
		var _id = common.getIdInCookie(req.cookies);
		if (!_id) {
			goLogin(res);
			return;
		}

		data.listActivitys(_id, function(results) {
			data.getUser(_id, function(userResult) {
				console.log('getUser', userResult);

				res.render('wall', {
					fbId: userResult.id,
					activitys: results
				});
			});

		});
	});

	r.get('/add', function(req, res) {
		var _id = common.getIdInCookie(req.cookies);
		if (!_id) {
			goLogin(res);
			return;
		}

		res.render('daka', {
			
		});
	});

	r.get('/dashboard',
		function(req, res) {
			var p = req.params,
				_id = common.getIdInCookie(req.cookies);
			console.log(req.cookies);
			if (!_id) {
				return res.redirect('/index.html');
			}

			console.log('d');
			res.render('dashboard', {
				'_id': _id
			});
		});

	return r;
}();
