const nomes = require('./dataset/nomes.json');
const ptbr = require('ptbr');

function findGenderByName(name) {
    name = ptbr.removeAcentos(name);
    name = name.toUpperCase();
    return nomes.filter(data => data.first_name === name)[0].classification;
}


module.exports = {findGenderByName};