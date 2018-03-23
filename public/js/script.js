const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();



recognition.lang = 'en-US';

document.querySelector('.talk').addEventListener('click', () => {
	recognition.start();
	console.log('start');
})
document.querySelector('.stop').addEventListener('click', () => {
	recognition.stop();
	console.log('stop');
})

recognition.addEventListener('result', (e) => {

	let last = e.results.length - 1;
	let text = e.results[last][0].transcript;

	const socket = io();
	
	socket.emit('chat messae', text);

	console.log('Confidence: ' + e.results[0][0].confidence);
	console.log(text)

	function synthVoice(text) {
		const synth = window.speechSynthesis;
		const utterance = new SpeechSynthesisUtterance();

		utterance.text = text;
		synth.speak(utterance);
	}

	socket.on('bot reply', function(replyText){
		synthVoice(replyText);
	})
})