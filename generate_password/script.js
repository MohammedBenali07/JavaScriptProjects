let inputText=document.getElementById('input');
let generateBtn=document.getElementById('generate-btn');
let logoCopy=document.getElementById('logo-copy');
let succesCopy=document.getElementsByTagName('span')[1];
let len=12;
function generatetePassword(len){
    let chars="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:',.<>?/`~";
    password='';
    for(let i=0;i<len;i++){
        password+=chars[Math.floor(Math.random()*chars.length)];
    }
    return password;
}
generateBtn.addEventListener('click',()=>{
    inputText.value=generatetePassword(len);
    succesCopy.classList.remove('style')
})
logoCopy.addEventListener('click',()=>{
    copyPassword()
})
function copyPassword(){
    inputText.select();
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
}