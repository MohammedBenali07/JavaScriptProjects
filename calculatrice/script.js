let inputText=document.getElementById('inputText');
let btns=[...document.querySelectorAll('button')];
let equal=document.getElementById('equal');
let AC=document.getElementById('AC');
let DE=document.getElementById('DE')
console.log(btns)
console.log('heloo')

btns.forEach((btn)=>{
    let tab=['AC','DE','='];
    if(!tab.includes(btn.innerHTML)){
        btn.addEventListener('click',()=>{
            inputText.value+=btn.innerHTML;
        })
    }
})
equal.addEventListener('click',()=>{
    inputText.value=eval(inputText.value)
})
AC.addEventListener('click',()=>{
    inputText.value='';
})
DE.addEventListener('click',()=>{
    inputText.value=inputText.value.toString().slice(0,-1)
})
