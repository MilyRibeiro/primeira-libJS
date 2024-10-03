const fs = require('fs'); // fs é uma biblioteca importante do Node.js, que permite diversos tipos de interação de uma aplicação com o sistema de arquivos do computador.

const caminhoArquivo = process.argv;
const link = caminhoArquivo[2];


fs.readFile(link, 'utf-8', (erro, texto) => {
    try {
        if(erro) throw erro
        contaPalavras(texto);
    } catch(erro) {
        if(erro.code === 'ENOENT') console.log('Erro que se esperava');
        else console.log('Outro erro');
        // o que fazer com o erro?
    }
});

function contaPalavras(texto) {
    const paragrafos = extraiParagrafos(texto);
    const contagem = paragrafos.flatMap((paragrafo) => {
        if(!paragrafo) return []; 
        return verificaPalavrasDuplicadas(paragrafo);
    })
    console.log(contagem);
}

function extraiParagrafos(texto) {
    return texto.toLowerCase().split('\n');
}

const stringCaminhoTexto = '../arquivos/texto-web.txt';
console.log(stringCaminhoTexto);

function limpaPalavras(palavra) {
    return palavra.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
}

function verificaPalavrasDuplicadas(texto) {
    const listaPalavras = texto.split(' ');
    const resultado = {};
    listaPalavras.forEach(palavra => {
        if(palavra.length >= 3)  {
            const palavraLimpa = limpaPalavras(palavra);
            resultado[palavraLimpa] = (resultado[palavraLimpa] || 0) + 1;
        }
    });
    return resultado;
}