// math.js

// Fonction pour l'addition
function sum(a, b) {
    return a + b;
}

// Fonction pour la soustraction
function diff(a, b) {
    return a - b;
}

// Fonction pour la multiplication
function prod(a, b) {
    return a * b;
}

// Fonction pour la division
function quot(a, b) {
    if (b === 0) {
        return 'Erreur : division par zéro';
    }
    return a / b;
}

// Exportation des fonctions
module.exports = { sum, diff, prod, quot };
