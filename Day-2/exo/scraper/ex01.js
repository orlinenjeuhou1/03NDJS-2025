import * as cheerio from 'cheerio';

const $ = await cheerio.fromURL('https://www.insee.fr/fr/information/8183122');
const $table = $('table').first();

// Définition MANUELLE des headers
const headers = ["", "Bases principaux indicateurs", "Bases tableaux détaillés","Bases flux de mobilité","Bases infracommunales"]; 
const rows = [];

$table.find('tr').each((rowIndex, rowElement) => {
  const row = [];
  $(rowElement).find('td').each((_, cell) => { // On ignore les <th>
    row.push($(cell).text().trim());
  });
  if (row.length > 0) rows.push(row); // On saute la ligne d'en-tête HTML
});

// Affichage (identique)
const colWidths = headers.map((h, i) =>
  Math.max(h.length, ...rows.map(row => row[i]?.length || 0))
);
const separator = `+${colWidths.map(w => '-'.repeat(w + 2)).join('+')}+`;

console.log(separator);
console.log(`| ${headers.map((h, i) => h.padEnd(colWidths[i])).join(' | ')} |`);
console.log(separator);
rows.forEach(row => {
  console.log(`| ${row.map((c, i) => c.padEnd(colWidths[i])).join(' | ')} |`);
});
console.log(separator);
