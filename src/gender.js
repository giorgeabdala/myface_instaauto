const nomes = require('./dataset/nomes.json');
const ptbr = require('ptbr');

function findGenderByName(name) {
    name = ptbr.removeAcentos(name);
    name = name.toUpperCase();
    const resultado =  nomes.filter(data => data.first_name === name);

    if (resultado.length > 0)
        return resultado[0].classification;

    return '';
}


module.exports = {findGenderByName};