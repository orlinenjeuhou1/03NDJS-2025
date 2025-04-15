import https from 'https';
import * as cheerio from 'cheerio';

const url = 'https://www.insee.fr/fr/information/8183122';

const getDataFromTable = async () => {
  try {
    // Faire une requête HTTP avec le module https de Node.js
    https.get(url, (res) => {
      let data = '';

      // Accumuler les données de la réponse
      res.on('data', chunk => {
        data += chunk;
      });

      // Quand la réponse est terminée
      res.on('end', () => {
        const $ = cheerio.load(data);

        const table = $('table').first();
        const rows = [];
        const headers = [];

        table.find('tr').each((rowIndex, row) => {
          const cells = $(row).find('th, td');
          const rowData = [];

          cells.each((_, cell) => {
            rowData.push($(cell).text().trim());
          });

          if (rowIndex === 0) {
            headers.push(...rowData);
          } else {
            rows.push(rowData);
          }
        });

        // Affichage sous forme de tableau avec bordures
        const allRows = [headers, ...rows];
        const columnWidths = headers.map((header, i) => Math.max(...allRows.map(row => row[i]?.length || 0), header.length));

        const separator = `+${columnWidths.map(width => '-'.repeat(width + 2)).join('+')}+`;
        console.log(separator);

        // Affichage des en-têtes
        console.log(`| ${headers.map((header, i) => header.padEnd(columnWidths[i])).join(' | ')} |`);
        console.log(separator);

        // Affichage des données du tableau sans index
        rows.forEach(row => {
          console.log(`| ${row.map((cell, i) => cell.padEnd(columnWidths[i])).join(' | ')} |`);
        });

        console.log(separator);
      });
    }).on('error', (err) => {
      console.error('Erreur lors de la requête:', err.message);
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error.message);
  }
};

getDataFromTable();

