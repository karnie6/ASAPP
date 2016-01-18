var express = require('express');
	app = express(),
	path = require('path'),
	session = require('express-session'),
  cookieParser = require('cookie-parser'),
  config = require('./config/config.js'),
	rooms = ['Room D', 'Room E', 'Room F'];

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('hogan-express'));
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname,'public')));
app.use(cookieParser());

app.use(session({secret:config.sessionSecret, saveUninitialized:true, resave:true}));
require('./routes/routes.js')(express, app, config, rooms);

app.set('port', process.env.PORT || 3000);
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
require('./socket/socket.js')(io, rooms);

server.listen(app.get('port'), function() {
	console.log("Our chat server is running on port " + app.get('port'));
})
