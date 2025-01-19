let bntAdd=document.getElementById('btn-add');
let inputText=document.getElementById('input');
let toDoList=document.getElementById('do-list');
let arrayToDo=JSON.parse(window.localStorage.getItem('AllTasks'))||[];


bntAdd.addEventListener('click',()=>{
    let taskValue=inputText.value;
    if(taskValue!==''){
        arrayToDo.push(taskValue);
    window.localStorage.setItem('AllTasks',JSON.stringify(arrayToDo));
    }
    inputText.value='';
    clearData();
    ShowTask();

})
function ShowTask(){
    let tasks='';
    for(let i=0;i<arrayToDo.length;i++){
        tasks+=`
        <li  onclick="TaskDone(${i})" class="do">
                <div class="done"><i class='bx bxs-check-circle' ></i></div>
                <p>${arrayToDo[i]}</p>
                <div onclick="DeleteTask(${i})" class="delete"><i class='bx bxs-x-circle'></i></div>
            </li>
        `
    }
    toDoList.innerHTML=tasks;
}
function clearData(){
    toDoList.innerHTML=''
}

function DeleteTask(i){
    arrayToDo.splice(i,1);
    localStorage.AllTasks=JSON.stringify(arrayToDo)
    ShowTask();
}
ShowTask();
function TaskDone(i){
    let done=document.querySelectorAll('.done i ');
    let taskDone1=document.querySelectorAll('.do')
    done[i].classList.toggle('bx-list-ul')
    console.log(done[i])
    taskDone1[i].classList.toggle('taskDone')
    console.log(taskDone1[i])
}


