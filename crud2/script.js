// la declaretion des elements necessaire
let btnAdd=document.getElementById('add');
let btnDelete=document.getElementById('trash');
let btnUpdate=document.getElementById('pen');
let btnCheck=document.getElementById('check');
let btnPlus=document.getElementById('plus');
let inputText=document.getElementById('text');
let inputs=document.getElementsByClassName('inputs')[0];
let outputs=document.getElementsByClassName('outputs')[0];
let PartieBas=document.getElementsByClassName('Partie_bas')[0];
let icons=[...document.getElementsByClassName('icons')];
let mood='create';
let tmp;
//Create task
let tasks = JSON.parse(localStorage.getItem('task')) || [];
AfficheTask()
btnPlus.addEventListener('click',()=>{
    inputs.style.display='flex';
    inputText.focus();
})
btnAdd.addEventListener('click',()=>{
    if(inputText.value.trim()===''){
        alert("veuillez enter une tache non vide");
        return;
    }else{
    let date=new Date();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let days=date.getDate().toString().padStart(2, '0');
    let year=date.getFullYear().toString().padStart(4, '0');
    let newTask={};
    newTask.task=inputText.value;
    newTask.dateNow=`${days}/${month}/${year}`;
    newTask.done=false;
    if(mood==='create'){
        tasks.push(newTask);
       
    }
    else{
        mood='create';
        tasks[tmp]=newTask;
        inputText.value=''
    }
    localStorage.setItem('task',JSON.stringify(tasks))
    btnAdd.textContent='Ajouter';
    inputText.value=""
     AfficheTask();
    }
})

// Affiche task
function AfficheTask(){
    let AllTasks=''
    let index=0;
    outputs.innerHTML=`<div class="Partie_haute">
            <div id="AddTache"></div>
            <p>Mes Taches</p>
            <button id="plus"><i class="fa-solid fa-plus"></i></button>
        </div>`
    tasks.forEach(task=>{
     AllTasks+=` <div class="Partie_bas">
            <div id="tache-date">
                <p id="p">${task.task}</p>
            <div class="date">
                <button id="calender"><i class="fa-solid fa-calendar-days"></i></button>
                <span>${task.dateNow}</span>
            </div>
            </div>
            <div class="icons">
                <button onclick="deleteTask(${index})" id="trash"><i class="fa-solid fa-trash"></i></button>
                <button onclick="isDone(${index})" id="check"><i class="fa-solid fa-check"></i></button>
                <button onclick="updateTask(${index})" id="pen"><i class="fa-solid fa-pen"></i></button>
            </div>
        
        </div>`
     index++;
    })
    outputs.innerHTML+=AllTasks;
    document.getElementById('plus').addEventListener('click', () => {
        inputs.style.display = 'flex';
        inputText.focus();
    });

}
// delete task
function deleteTask(i){
  tasks.splice(i,1);
  localStorage.task= JSON.stringify(tasks);
  AfficheTask()
}
btnDelete.addEventListener('click',()=>{
    deleteTask()
})
// update task
function updateTask(i){
    mood="update";
    tmp=i;
    inputText.value=tasks[i].task
    inputText.placeholder='Modifier la tache ici...'
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    inputs.style.display='flex';
    inputText.focus();
    btnAdd.textContent='Modifier';
    let date=new Date();
    
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let days=date.getDate();
    let year=date.getFullYear();
    tasks[i].task=inputText.value;
    tasks[i].dateNow=`${days}/${month}/${year}`;
    tasks[i].done=false;
    AfficheTask();
    inputText.value='';
}
// Verifier si la tache est termineé
function isDone(i) {
    tasks[i].done = !tasks[i].done;
    localStorage.setItem('task', JSON.stringify(tasks));

    // Trouver l'élément check correspondant à l'index i
    let checkButton = rechercherIcon(i);

    // Mettre à jour l'icône et la couleur en fonction de l'état de la tâche
    if (tasks[i].done) {
        checkButton.innerHTML = `<i class="fa-solid fa-x"></i>`;
        checkButton.style.backgroundColor = '#c44e00';
    } else {
        checkButton.innerHTML = `<i class="fa-solid fa-check"></i>`;
        checkButton.style.backgroundColor = 'rgb(3, 156, 3)';
    }
}

// Fonction pour trouver l'élément check correspondant à l'index i
function rechercherIcon(i) {
    let icons = document.querySelectorAll('.icons');
    return icons[i].querySelector('#check');
}


