var BTN=document.querySelector("button")
//var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var TEXTAREA=document.querySelector("#textSpeech")
var DIV=document.querySelector("#reponse_msg")
var BTN_MIC=document.querySelector("#bMic")
var recognition = new webkitSpeechRecognition();
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;
//EVENEMENT
BTN.addEventListener("click", chatBot)
BTN_MIC.addEventListener("click", speechToText)
//fonction principale
function chatBot(){
    let text=TEXTAREA.value
    //coommunication avec le backend
    var url_backend="http://127.0.0.1:8000/analyse"
    fetch(url_backend,
        {
            method:"POST",
            body:JSON.stringify({"texte":text}),
            headers:{  
                'Content-Type': 'application/json'
            }          
        })
    .then(reponse=>{
        reponse.json()
        .then(data=>{
            console.log(data)
        })
    })
    .catch(e=>{
        console.warn(e)
    })
}
function speechToText(){
    alert("Je suis speech to text")
    //déclencher l'API Speech To Text
    recognition.start();

}


recognition.onresult = function(event) {

    //récupérer le texte
    var message = event.results[0][0].transcript;
    console.log('Result received: ' + message + '.');
     console.log('Confidence: ' + event.results[0][0].confidence);

    //remplir l'input en utilisant ce texte
    TEXTAREA.value=message
  }