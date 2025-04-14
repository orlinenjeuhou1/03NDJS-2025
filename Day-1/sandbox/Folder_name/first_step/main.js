// main.js

// Importer les fonctions du fichier math.js
const { sum, diff, prod, quot } = require('./math');

// Utilisation des fonctions dans des console.log
console.log("Addition : ", sum(5, 3));      // Affiche : Addition : 8
console.log("Soustraction : ", diff(5, 3)); // Affiche : Soustraction : 2
console.log("Multiplication : ", prod(5, 3)); // Affiche : Multiplication : 15
console.log("Division : ", quot(5, 3));     // Affiche : Division : 1.666...
console.log("Division par zéro : ", quot(5, 0)); // Affiche : Division par zéro : Erreur : division par zéro
