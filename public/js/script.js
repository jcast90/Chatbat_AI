const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
const socket = io();

recognition.lang = 'en-US';

document.querySelector('.talk').addEventListener('click', () => {
	recognition.start();
	console.log('start');
})

recognition.addEventListener('speechstart', () => {
	console.log('Speech has been detected')
})

recognition.addEventListener('result', (e) => {

	let last = e.results.length - 1;
	let text = e.results[last][0].transcript;

	
	socket.emit('chat messae', text);

	console.log('Confidence: ' + e.results[0][0].confidence);
	console.log(text)

})

recognition.addEventListener('speechend', () => {
	recognition.stop();
})

function synthVoice(text) {
	const synth = window.speechSynthesis;
	const utterance = new SpeechSynthesisUtterance();

	utterance.text = text;
	synth.speak(utterance);

}

socket.on('bot reply', function(replyText){
	synthVoice(replyText);
})