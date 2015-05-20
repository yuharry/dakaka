var MongoClient = require('mongodb').MongoClient,
	ObjectId = require('mongodb').ObjectId;
module.exports = function() {
	var userCol, activityCol;

	this.init = function(callback) {
		var dkk_db = process.env.DKK_DB;
		console.log('data.init');
		MongoClient.connect(
			dkk_db,
			function(err, database) {
				if (!err && database) {
					console.log('connect to database successfully');

					userCol = database.collection('user');
					activityCol = database.collection('activity');

					callback();
				} else {
					console.log(err);
				}
			});
	};

	this.userLogin = function(user, callback) {
		userCol.findOne({
			_type: user._type,
			id: user.id
		}, function(err, res) {
			console.log('query result: ', res);

			if (!res) {
				userCol.insert(user, function(err, res) {
					return callback(res.ops[0]);
				});
			} else {
				return callback(res);
			}
		});
	};

	this.getUser = function(u_id, callback) {
		var _id
		try {
			id = new ObjectId(u_id);
			userCol.findOne({
				_id: new ObjectId(u_id)
			}, function(err, res) {
				if (err) {
					console.log(err);
				} else {
					return callback(res);
				}
			});
		} catch (err) {
			console.log(err);
		}

	};

	this.addActivity = function(u_id, activity, callback) {
		activity.u_id = u_id;

		console.log('going to insert: ', activity);

		activityCol.insert(activity, function(err, res) {
			if (err) {
				console.log(err);
			} else {
				return callback(res);
			}
		});
	};

	this.listActivitys = function(u_id, callback) {
		console.log(u_id);
		activityCol.find({
			u_id: u_id
		}).sort({
			date: -1
		}).toArray(function(err, res) {
			console.log('err', err);
			console.log('res', res);
			if (!err) {
				callback(res);
			} else {
				console.log(err);
			}
		});
	};
	return this;
}();
