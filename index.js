const express = require('express');
const app = express();

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));

const server = app.listen(5000);

app.get('/', (req,res) => {
	res.sendFile('index.html');
})


const apiai = require('apiai')(APIAI_KEY);
const io = require('socket.io')(server)


io.sockets.on('connection', function(socket){

	socket.on('chat message', (text) => {
		console.log('chat message')
		let apiaiReq = apiai.textRequest(text, {
			sessionId: APIAI_SESSION_ID
		});

		apiaiReq.on('response', (response) => {
			let aiText = response.result.fullfillment.speech;
			socket.emit('bot reply', aiText);
		})

		apiaiReq.on('error',() => {
			console.log(error);
		})

		apiaiReq.end();
	})
})