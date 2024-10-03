const fs = require('fs'); // fs é uma biblioteca importante do Node.js, que permite diversos tipos de interação de uma aplicação com o sistema de arquivos do computador.

const caminhoArquivo = process.argv;
const link = caminhoArquivo[2];


fs.readFile(link, 'utf-8', (erro, texto) => {
    if(erro) {
        console.log('Qual é o erro?', erro);
        return;
    }
    contaPalavras(texto);
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


// function quebraEmParagrafos(texto) {
//     const paragrafos = texto.toLowerCase().split('\n');
//     const contagem = paragrafos.flatMap((paragrafo) => {
//         if(!paragrafo) return []; 
//         return verificaPalavrasDuplicadas(paragrafo);
//     })
//     console.log(contagem);
// }


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