module.exports = function(express, app, config, rooms){
	var router = express.Router();
  var qs = require('querystring');

	router.get('/', function(req, res, next){
		res.render('index', {
			title: 'Welcome to ASAPP Chatrooms'
		});
	});

	router.get('/chatroom/:id', function(req, res, next){
		res.render('index', {
			title: 'Welcome to ASAPP Chatrooms'
		});
	});

	app.use('/', router);
}
