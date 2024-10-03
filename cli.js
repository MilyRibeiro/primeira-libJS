// CLI é a sigla para Command Line Interface (Interface de Linha de Comando)
// Agora, podemos refatorar nosso código para deixá-lo mais moderno. No arquivo cli.js, onde temos importações, vamos substituir const fs = require('fs') por import fs from 'fs'. Faremos o mesmo com trataErros, substituindo const trataErros = require('./erros/funcoesErro') por import trataErros from './erros/funcoesErro.js'. Note que, ao usar esse formato, precisamos incluir a extensão do arquivo na importação.

import fs from 'fs';     // const fs = require('fs'); 
import trataErros from './erros/funcoesErro.js';       // const trataErros = require('./erros/funcoesErro');
import { contaPalavras } from './index.js';

const caminhoArquivo = process.argv;
const link = caminhoArquivo[2];

fs.readFile(link, 'utf-8', (erro, texto) => {
    try {
        if (erro) throw erro;
        contaPalavras(texto);
    } catch (erro) {
        console.log(trataErros(erro));   // Arquivo não encontrado
    }
})

// Agora, as funções que realizam a lógica do nosso contador estão separadas e localizadas no index.js.