import * as cheerio from 'cheerio';

const $ = await cheerio.fromURL('https://example.com');

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

    // Affichage sous forme de tableau
    const allRows = [headers, ...rows];
    const columnWidths = headers.map((header, i) =>
      Math.max(...allRows.map(row => row[i]?.length || 0), header.length)
    );

    const separator = `+${columnWidths.map(width => '-'.repeat(width + 2)).join('+')}+`;
    console.log(separator);

    // En-têtes
    console.log(`| ${headers.map((header, i) => header.padEnd(columnWidths[i])).join(' | ')} |`);
    console.log(separator);

    // Données
    rows.forEach(row => {
      console.log(`| ${row.map((cell, i) => cell.padEnd(columnWidths[i])).join(' | ')} |`);
    });

    console.log(separator);
  } catch (error) {
    console.error('Erreur lors de la lecture du fichier :', error.message);
  }
};

getDataFromLocalHtml();
