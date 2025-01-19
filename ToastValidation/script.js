let toastBox=document.getElementById('toastBox');
let successMsg='<i class="fa-solid fa-circle-check"></i> succefully submitted';
let errorMsg='<i class="fa-solid fa-circle-xmark"></i> Please fixe the problem';
let invalidMsg='<i class="fa-solid fa-circle-exclamation"></i> Invalid Input'
function showToast(msg){
    let toast=document.createElement('div');
    toast.classList.add('toast');
    toast.innerHTML=msg;
    if(msg.includes('problem')){
        toast.classList.add('error');
    }
    if(msg.includes('Invalid')){
        toast.classList.add('invalid');
    }
    toastBox.appendChild(toast);
    setTimeout(()=>{
        toast.remove()
    },6000)

}