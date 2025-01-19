 let users = document.getElementsByClassName('Users')[0];
let posts = document.getElementsByClassName('posts')[0];


// Fonction pour récupérer les utilisateurs depuis l'API JSONPlaceholder
function getUsersFromAPI(callback) {
    let request = new XMLHttpRequest();
    request.open('GET', 'https://jsonplaceholder.typicode.com/users');
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        if (request.status >= 200 && request.status < 300) {
            let requestUsers = request.response;
            callback(requestUsers); // Appel du callback avec les utilisateurs récupérés
        } else {
            console.error("Erreur lors du chargement des utilisateurs. Statut:", request.status);
        }
    };

}

// Fonction pour récupérer les messages depuis l'API JSONPlaceholder
function getPostsFromAPI(callback) {
    let request = new XMLHttpRequest();
    request.open('GET', 'https://jsonplaceholder.typicode.com/posts');
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        if (request.status >= 200 && request.status < 300) {
            let requestPosts = request.response;
            callback(requestPosts); // Appel du callback avec les posts récupérés
        } else {
            console.error("Erreur lors du chargement des posts. Statut:", request.status);
        }
    };
    
}

// Ajouter un événement de clic pour charger les utilisateurs et les posts

// Fonction pour ajouter les utilisateurs à l'interface HTML
function addUsers() {
    getUsersFromAPI(function(usersData) {
        users.innerHTML = '';
        usersData.forEach(user => {
            users.innerHTML += `
                <div id="${user.id}" class="user">
                    <div>${user.name}</div>
                    <hr>
                    <div>${user.email}</div>
                </div>
            `;
        });

        // Déplacer cette partie ici pour s'assurer que les éléments existent dans le DOM
        let userElements = document.querySelectorAll('.user');
        userElements.forEach(userElement => {
            userElement.addEventListener('click', () => {
                let userId = userElement.id;
                addPosts(userId);
            });
        });
    });
}

addUsers();


function addPosts(i){
    getPostsFromAPI(function(postsData){
        posts.innerHTML='';
        let AllPosts='';
        for(let postData of postsData){
              if(postData.userId === parseInt(i)){
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
    })
}