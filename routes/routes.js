module.exports = function(express, app, config, rooms){
	var router = express.Router();

	router.get('/', function(req, res, next){
		res.render('index', {
			title: 'Welcome to ASAPP Chatroom'
		});
	});

	app.use('/', router);
}
