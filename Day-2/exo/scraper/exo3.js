import * as cheerio from 'cheerio';

const $ = await cheerio.fromURL('https://www.insee.fr/fr/information/8183122');
const $table = $('table').first();
console.log($);
