module.exports = function(express, app, config, rooms){
	var router = express.Router();
  var qs = require('querystring');

	router.get('/', function(req, res, next){
		res.render('index', {
			title: 'Welcome to ASAPP Chatrooms'
		});
	});

  router.post('/chatrooms', function(req, res, next) {
    var body = '';
    req.on('data', function (data) {
               body += data;
           });
    req.on('end', function () {
      var postData = qs.parse(body);
      res.render('chatrooms', {
        user: postData.displayname,
        config: config,
        title: 'Choose which chatroom to enter'
      });    });
    //var displayname = req.body.user[displayname];
    //console.log(displayname);

  });

	app.use('/', router);
}
