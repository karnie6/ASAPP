module.exports = function(express, app, config, rooms){
	var router = express.Router();

  //singular route to render index.html (and let react take care of the rest)
	router.get('/', function(req, res, next){
		res.render('index', {
			title: 'Welcome to ASAPP Chatrooms'
		});
	});

	app.use('/', router);
}
