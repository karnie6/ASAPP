module.exports = function(io, rooms) {

	var chatrooms = io.of('/roomlist').on('connection', function(socket) {
		console.log('Connection Established on the Server!');
		socket.emit('roomupdate', JSON.stringify(rooms));
	});

	var messages = io.of('/messages').on('connection', function(socket) {
		socket.on('joinroom', function(data) {
			socket.user = data.user;
			socket.join(data.roomNumber);
		});

		socket.on('newMessage', function(data) {
			socket.broadcast.to(data.roomNumber).emit('messagefeed', JSON.stringify(data));
			socket.emit('messagefeed', JSON.stringify(data));
	});

});
}
