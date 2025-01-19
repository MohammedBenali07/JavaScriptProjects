let users = document.getElementsByClassName('Users')[0];
let posts = document.getElementsByClassName('posts')[0];


// Fonction pour récupérer les utilisateurs depuis l'API JSONPlaceholder
function getUsersFromAPI() {
    new Promise((resolve)=>{
        fetch('https://jsonplaceholder.typicode.com/users')
    .then(response=>{
        if(response.ok){
           return response.json();
        }
    })
    .then((usersData)=>{
        users.innerHTML = '';
        usersData.forEach(user => {
            users.innerHTML += `
                <div id="${user.id}" class="user">
                    <div>${user.name}</div>
                    <hr>
                    <div>${user.email}</div>
                </div>
            `;
        })
        return resolve(usersData);
    }
    )
  
    }).then((usersData)=>{
        
        let userElements = document.querySelectorAll('.user');
        for(let userData of usersData){
             // Déplacer cette partie ici pour s'assurer que les éléments existent dans le DOM
         userElements.forEach(userElement => {
             userElement.addEventListener('click', () => {
                 let userId = userElement.id;
                 fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response=>{
            if(response.ok){
               return response.json();
            }
        })
        .then((postsData)=>{
                posts.innerHTML='';
                let AllPosts='';
                for(let postData of postsData){
                      if(postData.userId === parseInt(userId)){
                        AllPosts+=`
                        <div class="post">
                        <div id="title">${postData.title}</div>
                        <hr>
                        <div class="body">${postData.body}</div>
                    </div>
                        `
                      }
                }
                posts.innerHTML=AllPosts;
           
        }
        )
             });
         });
        }

    })
}

getUsersFromAPI()
