module.exports = function(io, rooms) {

  //socket listener that upon connection, emits list of available rooms
	var chatrooms = io.of('/roomlist').on('connection', function(socket) {
		console.log('Connection Established on the Server!');
		socket.emit('roomupdate', JSON.stringify(rooms));
	});

	//socket listener that upon connection, joins user to room
	var messages = io.of('/messages').on('connection', function(socket) {
		socket.on('joinroom', function(data) {
			socket.user = data.user;
			socket.join(data.roomNumber);
		});

		//socket listener that upon connection, broadcasts message to all users of that room as well as emits it to user who created message
		socket.on('newMessage', function(data) {
			socket.broadcast.to(data.roomNumber).emit('messagefeed', JSON.stringify(data));
			socket.emit('messagefeed', JSON.stringify(data));
	});

});
}
