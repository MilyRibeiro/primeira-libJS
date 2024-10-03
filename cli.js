// CLI é a sigla para Command Line Interface (Interface de Linha de Comando)
// Agora, podemos refatorar nosso código para deixá-lo mais moderno. No arquivo cli.js, onde temos importações, vamos substituir const fs = require('fs') por import fs from 'fs'. Faremos o mesmo com trataErros, substituindo const trataErros = require('./erros/funcoesErro') por import trataErros from './erros/funcoesErro.js'. Note que, ao usar esse formato, precisamos incluir a extensão do arquivo na importação.

import fs from 'fs';     // const fs = require('fs'); 
import trataErros from './erros/funcoesErro.js';       // const trataErros = require('./erros/funcoesErro');
import { contaPalavras } from './index.js';

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

async function criaESalvaArquivo(listaPalavras, endereco) {
    const arquivoNovo = `${endereco}/resultado.txt`;
    const textoPalavras = JSON.stringify(listaPalavras);
    try {
        await fs.promises.writeFile(arquivoNovo, textoPalavras);
        console.log('Arquivo criado');
    } catch(erro) {
        throw erro;
    }
} 
// Agora, as funções que realizam a lógica do nosso contador estão separadas e localizadas no index.js.

// WriteFile é um método que não retorna nada, porque ele simplesmente escreve um arquivo, ele não tem dado para retornar. 
// Recebemos a mensagem "Arquivo criado" no terminal, o que nos indica que deu tudo certo! De fato, o arquivo resultado.txt foi criado! Mas, se abrirmos o arquivo resultado.txt, teremos literalmente o array de objetos transformado em uma string. Isso foi o que pedimos, mas não funciona muito bem para quem vai usar o nosso contador, porque está em um formato muito difícil de ler.

// Ou seja, o que pedimos deu certo, pois estamos recebendo um .txt de resultado, mas precisamos formatar melhor essa saída.

