let speech=new SpeechSynthesisUtterance();
let btnListen=document.getElementById('btnListen');
let voices=[];
let voicesSelect=document.querySelector('select');
window.speechSynthesis.onvoiceschanged=()=>{
    voices=window.speechSynthesis.getVoices();
    speech.voice=voices[0];
    voices.forEach((voice,i)=>(voicesSelect.options[i]=new Option(voice.name,i)))
}
voicesSelect.addEventListener('change',()=>{
    speech.voice=voices[voicesSelect.value]
})
btnListen.addEventListener('click',()=>{
    let textarea=document.querySelector('textarea');
    speech.text=textarea.value;
    window.speechSynthesis.speak(speech)
})