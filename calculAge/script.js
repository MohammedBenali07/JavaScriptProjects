let userInput = document.getElementById('inputDate');
let btnCalcul = document.getElementById('btn-calcul');
let result = document.getElementById('result');

userInput.max = new Date().toISOString().split('T')[0];
console.log(userInput.max);

// Ajouter l'événement 'click' pour le bouton
btnCalcul.addEventListener('click', calculteAge);

function calculteAge() {
    let birthday = new Date(userInput.value);
    let d1 = birthday.getDate();
    let m1 = birthday.getMonth(); // Pas besoin d'ajouter 1 ici
    let y1 = birthday.getFullYear();
    let today = new Date();
    let d2 = today.getDate();
    let m2 = today.getMonth(); // Pas besoin d'ajouter 1 ici
    let y2 = today.getFullYear();
    
    let d3, m3, y3;
    
    // Calculer l'âge en années
    y3 = y2 - y1;
    
    // Calculer les mois
    if (m2 >= m1) {
        m3 = m2 - m1;
    } else {
        y3--;
        m3 = 12 + m2 - m1;
    }
    
    // Calculer les jours
    if (d2 >= d1) {
        d3 = d2 - d1;
    } else {
        m3--;
        d3 = getDaysInMonth(y1, m1 + 1) + d2 - d1; // m1 + 1 car getDaysInMonth utilise une valeur de mois basée sur 1
    }
    
    // Ajuster si les mois sont négatifs
    if (m3 < 0) {
        m3 = 11;
        y3--;
    }
    
    // Afficher les résultats
    result.innerHTML = `You are <span class="text-style">${y3}</span> years, <span class="text-style">${m3}</span> months and <span class="text-style">${d3}</span> days old.`;
}

function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}
