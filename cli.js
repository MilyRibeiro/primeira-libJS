// CLI é a sigla para Command Line Interface (Interface de Linha de Comando)
// Agora, podemos refatorar nosso código para deixá-lo mais moderno. No arquivo cli.js, onde temos importações, vamos substituir const fs = require('fs') por import fs from 'fs'. Faremos o mesmo com trataErros, substituindo const trataErros = require('./erros/funcoesErro') por import trataErros from './erros/funcoesErro.js'. Note que, ao usar esse formato, precisamos incluir a extensão do arquivo na importação.

import fs from 'fs';     // const fs = require('fs'); 
import trataErros from './erros/funcoesErro.js';       // const trataErros = require('./erros/funcoesErro');
import { contaPalavras } from './index.js';
import { montaSaidaArquivo } from './helpers.js';

const caminhoArquivo = process.argv;
const link = caminhoArquivo[2];
const endereco = caminhoArquivo[3];

fs.readFile(link, 'utf-8', (erro, texto) => {
    try {
        if (erro) throw erro;
        const resultado = contaPalavras(texto);
        criaESalvaArquivo(resultado, endereco);
    } catch (erro) {
        console.log(trataErros(erro));   // Arquivo não encontrado
    }
})

// function criaESalvaArquivo(listaPalavras, endereco) {
//     const arquivoNovo = `${endereco}/resultado.txt`;
//     const textoPalavras = montaSaidaArquivo(listaPalavras);        //JSON.stringify(listaPalavras);
//     fs.promises.writeFile(arquivoNovo, textoPalavras)
//     .then(() => {
//         console.log('Arquivo criado com sucesso');
//     }).catch((erro) => {
//         throw erro
//     }).finally(() => console.log('Operação finalizada'));
// }

async function criaESalvaArquivo(listaPalavras, endereco) {
    const arquivoNovo = `${endereco}/resultado.txt`;
    const textoPalavras = montaSaidaArquivo(listaPalavras);
    try {
      await fs.promises.writeFile(arquivoNovo, textoPalavras);
      console.log('arquivo criado');
    } catch(erro) {
      throw erro;
    }
  }




