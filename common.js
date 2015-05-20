var c = {};

c.checkLogin = function(cookie) {
	return (cookie && cookie._type && cookie._id);
};

c.getIdInCookie = function(cookie) {
	if (c.checkLogin(cookie)) {
		return cookie._id;
	}
	return false;
};

module.exports = c;
