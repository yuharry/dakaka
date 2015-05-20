var r = require('express').Router(),
	data = require('../data'),
	common = require('../common');

module.exports = function() {
	r.post('/user/:_type/:id', function(req, res) {
		var p = req.params,
			b = req.body;

		if (p._type === 'fb') {
			data.userLogin({
				_type: 'fb',
				id: p.id,
				name: b.name,
				email: b.email
			}, function(result) {
				return res.send(result);
			});

		}
	});

	r.route('/activity')
		.get(function(req, res) {
			var _id = common.getIdInCookie(req.cookies);
			data.listActivitys(_id, function(result) {
				return res.send(result);
			});
		})
		.post(function(req, res) {
			var activity = req.body.activity,
				_id = common.getIdInCookie(req.cookies);

			console.log(req.body);
			data.addActivity(_id, activity, function(result) {
				return res.send(result);
			});
		});

	return r;
}();
