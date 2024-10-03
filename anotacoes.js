// const caminhoArquivo = require('./arquivos/texto-web.txt');
// Contudo, deparamo-nos imediatamente com um erro. Parece que já começamos com uma anomalia desde o início.
// Error: Cannot find module './arquivos/texto-web.txt'

// O erro diz, em inglês, que o Node não consegue encontrar o módulo que está dentro do caminho que passamos. Isso acontece por quê? Isso ocorre devido ao método require() que tenta obter o conteúdo de um arquivo e executá-lo de alguma maneira. Portanto, ele só pode ser usado com módulos.

// Ao executar o comando no terminal, notamos a menção da palavra módulos. Isso significa que o require() SÓ funciona com arquivos JavaScript ou similares, como arquivos JSON. Portanto, para resolver esse problema, precisaremos adotar uma abordagem diferente.

// Para resolver essa questão, precisamos instruir o JavaScript a entender que o caminho de arquivo que estamos passando se refere a um texto, e então capturar essa string do texto.

// Além disso, há outra questão a considerar. Em segundo, seria conveniente se pudéssemos especificar o caminho do arquivo com o qual desejamos trabalhar, seja "texto-web", "texto-kanban" ou qualquer outro arquivo .txt, sem ter que abrir diretamente o arquivo index.js.

// Caso contrário, toda vez que quisermos executar o código, teríamos que acessar manualmente o arquivo index.js e modificar a string do caminho do arquivo. Isso não seria prático.

// Vamos começar abordando o segundo problema para tornar nossa vida mais fácil, permitindo que possamos receber qualquer arquivo. Para isso, faremos o seguinte: removeremos o require() do caminhoArquivo, já que não está funcionando como esperado, e substituiremos por outra instrução, que será process.argv.


const fs = require('fs'); // fs é uma biblioteca importante do Node.js, que permite diversos tipos de interação de uma aplicação com o sistema de arquivos do computador.

const caminhoArquivo = process.argv;
const link = caminhoArquivo[2];

// console.log(caminhoArquivo[2]);
// console.log(link);

// fs.readFile(link, 'utf-8', (erro, texto) => {
//     try {
//         contaPalavras(texto);
//     } catch(erro) {
//         // o que fazer com o erro?
//     }
//     // if(erro) {
//     //     console.log('Qual é o erro?', erro);
//     //     return;
//     // }
// });

// O terminal não acusou o erro, que é diferente de não dar erro, mas em compensação também não trouxe o nosso array de objetos. Então, vamos voltar no nosso código e ver o que aconteceu.

// Esse bloco try-catch funciona da seguinte forma: Dentro do try, colocamos todo o código onde é possível que ocorra um erro. Teoricamente, é o código que queremos que dê certo, só que se acontecer alguma coisa que não está certa, se ocorrer qualquer tipo de erro, queremos monitorar o código que está dentro desse bloco, para que, caso algum erro ocorra durante a execução, por exemplo, de contarPalavras, esse erro seja capturado pelo bloco catch. Try significa "tentar" em inglês e Catch, pegar.

// Por que não aconteceu nada no terminal? Porque causamos um erro de propósito, esse erro foi capturado, porque ele estava dentro do bloco try, então ele foi interceptado. O try pegou esse erro, que é esse conjunto de dados que, no momento, não sabemos muito bem o que tem dentro, e jogou para ser capturado pelo catch. Só que o nosso catch não tem nada dentro dele, o nosso catch só tem um comentário. E aí, deu erro, o erro não foi mandado para frente, ninguém fez nada com ele, e ficou por isso mesmo.

// Ao tirar o contarPalavras de dentro do try, se o deixarmos vazio e tentarmos executar novamente o código, lá no terminal, no caminho triste, voltou a dar erro, mas um erro genérico que não temos muita informação, não foi um erro que tratamos. Então, tirou do bloco try, o erro voltou a ser livre, sem ninguém para tomar conta dele.

// Vamos voltar o contarPalavras para dentro do try, onde ele estava antes. E agora, vamos fazer algumas alterações, para irmos refinando essa parte e tentando pegar os erros. Fora do try, vamos criar um if (erro). Vamos passar só uma instrução dentro desse if, então não precisa das chaves também. Vamos passar somente throw erro. Somente isso. Vamos deixar fora do try mesmo. Ele voltou a dar o erro ENOENT, só o erro sem nenhuma instrução nossa, também sem nenhum aviso.

// O que aconteceu? Criamos uma linha de verificação de erro, fora do try. E o que é esse erro que colocamos no throw? Esse erro se refere a um dos parâmetros do readFile. Então, o erro que está aparecendo para nós na linha do throw, não é o mesmo erro que será capturado no catch. São dois objetos diferentes.

// Isso é muito importante identificar. Porque o readFile, por si só, é uma função que já identifica para nós alguns tipos de erro, já faz um pré-tratamento. Então, conseguimos pegar isso a partir do parâmetro, esse objeto, e lançar esse erro para algum lugar. Só que, de novo, estamos lançando para nenhum lugar ser pego. Ele está só sendo lançado e não está sendo capturado (catch).

fs.readFile(link, 'utf-8', (erro, texto) => {
    try {
        if (erro) throw erro;
        contaPalavras(texto);
    } catch (erro) {
        trataErros(erro);
        // if(erro.code === 'ENOENT') console.log('Erro que se esperava');
        // else console.log('Outro erro');
    }
});


// O que estamos fazendo aqui? Perceba que o erro é propagado entre as funções. Então, ele começa num ponto, vai sendo lançado até que algum lugar pega esse erro. É isso que normalmente fazemos quando trabalhamos com bloco try-catch. Então, esse erro está sendo pego dentro do nosso if (erro), que está dentro do try, e essa palavra throw está lançando esse erro para frente.

// Uma vez que temos um bloco try-catch, esse catch vai pegar esse erro que foi lançado e, dentro dele, tem ali uma verificação. É o erro que estamos esperando? É um erro que é um objeto que tem a propriedade code e o valor dela é um string ENOENT? Se for, erro que esperávamos. Se não for, aí é outro erro, aí precisamos ver o que aconteceu.

// Vamos voltar no terminal, novamente testar o caminho com .txt no fim, está tudo certo, vamos limpar o terminal, retirar o .txt e obtivemos o erro que esperávamos. Aparentemente, começamos a cercar esse erro. Poderíamos depois mudar essa mensagem para uma mensagem que faz mais sentido? Sim, mas o que interessa agora para nós é ver como a propagação de erros que aconteceu lá no readFile, ela seguiu um caminho, o erro foi sendo lançado, pegamos onde precisava e vimos o que tem nele.

// Só que tem muitos lugares para os erros acontecerem e muitos tipos de erros diferentes. Então, vamos continuar testando um pouco esses casos. O importante é que esse é o erro que esperado, e ele está sendo capturado da forma que o nosso código espera e tratado da forma que o nosso código espera.

//  dentro do bloco try, se tiver erro, o nosso if dá um throw no erro, e tanto o return quanto o throw fazem com que o código saia da função.

// Podemos dizer que o retorno esperado, quando a função executa como ela deve executar e retorna o dado que esperamos que retorne. O throw também interrompe o fluxo, mas, normalmente, ele é usado justamente em caso de coisas não esperadas.

// Não precisamos dar throw somente em objetos do tipo erro, mas qualquer tipo de dado pode ser lançado, mas não é muito comum fazermos isso. O throw, normalmente, é usado para finalizar uma função, jogando para fora dela alguma informação sobre algo que deu errado na execução dessa função, ou que propagou de outras partes do código até ser lançado e capturado nessa parte do código.

// E para que um erro lançado não simplesmente interrompa uma função, interrompa o funcionamento do nosso programa, usamos o try-catch, para que o erro possa ser capturado e tratado de forma correta, sem que ele interrompa necessariamente o funcionamento da nossa aplicação. Isso porque, normalmente, exceções que não são capturadas por nenhum catch, elas vão se propagando pela stack, elas vão indo de função em função, de módulo em módulo, até que acabam interrompendo o funcionamento do programa de uma forma não esperada, com um erro que pode ser que não seja o erro que esperamos receber.

// Agora voltou a dar erro, porque não está mais aparecendo aquela mensagem que estava aparecendo no console. Porém, agora o erro está identificado. Ele dá uma mensagem, ele diz no topo do erro onde esse erro foi identificado. Dentro de funcoesErros foi de onde ele foi lançado. Erro, arquivo não encontrado". E aí ele foi bater lá dentro de trataErro.

// Mas, não seria melhor quando estava mostrando só a mensagem, mais nada? Existem casos onde realmente vamos querer só dar uma mensagem. Porém, em alguns casos, quando esperamos erros, queremos receber o objeto de erro mais completo para entender com mais detalhes onde ocorreu esse erro.

// Por quê? Porque todo objeto de erro traz junto com ele esse conjunto de informações que chamamos de STACK TRACE (rastreamento de pilha), que é um registro de todas as partes do código que são invocadas, por onde passa o nosso código para ser executado. Se não temos esse stack trace, sabemos que o erro ocorreu, mas ele não nos diz onde esse erro ocorreu. E com o stack trace, ele vai dizer por ordem, por onde o erro passou.

// Então, o primeiro ponto é em tratarErros, porque foi a função que foi chamada quando o erro bateu lá no fs.readFile. Porém, embaixo, ele já mostra para nós o arquivo anterior, por onde esse erro passou antes, e é o index.js na LINHA 12. Isso quer dizer que o arquivo index.js na linha 12 tem alguma coisa e foi dali que se originou o erro. Então, a partir do stack trace, ele mostra o caminho completo, inclusive os arquivos lá no Node, nas bibliotecas onde vão ser chamadas, mas ele mostra também o caminho dentro da nossa aplicação por onde o erro passou. Isso pode ser importante.

// onde temos que capturar erros: Onde colocamos o try-catch? Porque não colocamos em tudo. Pense que não precisamos capturar todos os erros em todos os lugares. Por exemplo, partes do código que são apenas lógicas de programação com métodos de array são pontos de falha que podem não ser tão críticos. E você NÃO vai querer colocar try-catch em todo o seu código. Você vai colocar nesses pontos onde mapeamos que podem ocorrer erros. Por exemplo, onde precisamos pegar um arquivo externo. E se é um PONTO CRÍTICO DE FALHA, vamos colocar um try-catch aqui. Mas isso vai se aprimorando com a prática.

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

// criar um array com as palavras
// contar as ocorrências
// montar um objeto com o resultado

// {
//   "web": 5,
//   "computador": 4
// } --> template do objeto a ser montado

function quebraEmParagrafos(texto) {
    const paragrafos = texto.toLowerCase().split('\n'); // O \n é um caractere de escape, que não é renderizado, mas ele assinala numa string onde tem uma quebra de linha. Então, podemos usar esse \n como um separador de parágrafos. Toda vez que o texto tiver esse caractere de escape, JavaScript com o split() vai pegar toda a string que vinha anteriormente e separá-la como um novo elemento do array. E a partir daí, esperamos que, dentro da constante paragrafos, exista um array composto por parágrafos separados - ao invés de palavras separadas.
    const contagem = paragrafos.flatMap((paragrafo) => {
        if(!paragrafo) return []; 
        return verificaPalavrasDuplicadas(paragrafo);
    })
    // .filter((paragrafo) => paragrafo)
    // .map((paragrafo) => {
    //     return verificaPalavrasDuplicadas(paragrafo);
    // })
    // console.log(paragrafos);
    console.log(contagem);
}

// function quebraEmParagrafos(texto) {
//     const paragrafos = texto.toLowerCase().split('\n');
//     const contagem = paragrafos.flatMap((paragrafo) => {
//         if(!paragrafo) return []; 
//         return verificaPalavrasDuplicadas(paragrafo);
//     })
//     console.log(contagem);
// }

// [1, 2[3, 4]]
// [1, 2, 3, 4]
// O que o flatMap() fez? O flat(), sozinho, é um método que pega um array, que tem arrays dentro dele, e o "achata". Qual seria o processo? Suponha que temos um array que tem os valores 1, 2, e o terceiro valor fosse, por exemplo, outro array com 3 e 4 dentro. O flat() pega o array de dentro e faz uma espécie de concatenação. Aplana com os valores do array externo. Então, o resultado final do flat() seria somente um array com 1, 2, 3 e 4.

function limpaPalavras(palavra) {
    return palavra.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
}
// Começamos com um barra normal e colchetes. Dentro dos colchetes, listamos todos os casos de caracteres especiais que imaginamos que possa ocorrer no texto. Por exemplo, ponto final, vírgula, barra invertida, barra normal, cerquilha, exclamação, abre e fecha-parênteses fechando, tio, chaves, igual, etc. No final, colocamos /g para ser global, ou seja, para pesquisar em todas as linhas do texto.

// O que fizemos foi usar uma expressão regular que é um tipo de linguagem que utilizamos para identificar padrões em texto. Ou seja, toda vez que o replace() encontrar uma correspondência de algum dos caracteres listados, ele será suprimido.

function verificaPalavrasDuplicadas(texto) {
    const listaPalavras = texto.split(' ');
    const resultado = {};
    // objeto[propriedade] = valor;
    listaPalavras.forEach(palavra => {
        if(palavra.length >= 3)  {
            const palavraLimpa = limpaPalavras(palavra);
            resultado[palavraLimpa] = (resultado[palavraLimpa] || 0) + 1;
        }
        // resultado[palavra] = (resultado[palavra] || 0) + 1;
    });
    // console.log(resultado);
    return resultado;
}

// Em outras palavras, o método split() vai pegar toda a string, e a cada ocorrência desse separador (no caso, um espaço), ele vai pegar todo o conteúdo anterior e colocar como um elemento do array.

// Em um texto, as palavras normalmente são separadas por espaço. Isso significa que, no final, a variável listaPalavras terá um array composto por todas as palavras do texto - porque o separador é o espaço entre cada uma delas.

// Podemos já deixar um objeto criado embaixo da listaPalavras. Para isso, criamos um const resultado que recebe um objeto vazio (ou seja, chaves vazias) para guardar as ocorrências de cada palavra.

// Para entender como montar esse objeto, devemos lembrar como adicionamos propriedades (conjuntos de chave e valor) dentro de um objeto.

// Primeiro, devemos passar o nome do objeto e depois passamos a propriedade, com ponto ou com colchetes.
// Dessa forma, o JavaScript entende que ele vai criar uma propriedade com esse valor dentro do objeto. Ou, se a propriedade já existir, vai atualizar o valor.

// Podemos comentar essa linha para nos lembrar de como vamos montar esse objeto.

// Agora, é preciso fazer o loop. Vamos puxar listaPalavras e o método do JavaScript que vamos usar para fazer esse loop, será o forEach().

// O forEach é um método do JavaScript que não retorna nada. Ele simplesmente executa o que vai dentro da função callback.

// Então, forEach vai receber uma palavra do array de palavras. E, a cada palavra, devemos contá-la e acrescentá-la ao objeto.

// Dentro das chaves do callback, vamos acrescentar a propriedade palavra no objeto resultado, ou seja, resultado[palavra].

// Assim, para cada palavra do array, será criada uma nova propriedade no objeto cujo nome será essa palavra do texto, por exemplo, "web", "computador" ou "JavaScript".

// Isso deve receber um valor, onde podemos implementar o nosso contador. Nesse caso, se a propriedade já existir, atualiza o valor. Se não, a propriedade é criada.

// Mas, de que forma podemos passar isso? Após um sinal de igual, vamos abrir parênteses para escrever a expressão resultado[palavra] || 0. Afinal, ou vai existir um valor dentro dessa propriedade ou ela será zero.

// Fora dos parênteses, digitamos + 1. Dessa forma, incrementamos 1 se a propriedade já existir ou criando se a propriedade não existir ainda.

// No final de tudo isso, após fechar o forEach, vamos passar um console.log() em resultado para verificar se deu tudo certo.

// O terminal retorna um objeto com todas as palavras do texto. Por enquanto, ainda não está separado em parágrafo, como nos propusemos.

// Além disso, apesar de cada palavra ser uma propriedade e a contagem ser um valor, como queríamos, existem algumas ocorrências estranhas nessa lista.

// Primeiro, existem algumas palavras muito curtas, por exemplo, "do", "um", "a", etc. Nesse momento, não queremos contar essas preposições e artigos. Devemos tratar isso para contar apenas palavras um pouco mais longas, como "JavaScript", "computador", etc.

// Um segundo caso estranho é que apareceu, no meio de algumas propriedades, um ou dois \n, que aparecem onde tem quebra de linha no texto original.

// O \n é um caractere de escape que não é renderizado, ou seja, não o visualizamos no texto, mas ele está lá para indicar que acabou uma linha e deve-se quebrar a linha e começar uma linha nova.

// Devemos tratar esse caso, porque o JavaScript considerou como uma palavra só tudo o que estava no fim da primeira linha e o que estava no começo da segunda.

// Também existem alguns outros problemas, como, por exemplo, a ocorrência de palavras entre parênteses. Como não há um espaço entre os parênteses e a palavra, o JavaScript também interpretou como uma só palavra. É preciso tratar esse caso para tirar os caracteres especiais da contagem.

// E, por último, o JavaScript está fazendo diferenciação entre maiúsculas e minúsculas. Então, "Um" maiúsculo ficou separado de "um" minúsculo - cada um com a sua contagem.

// Então, note como existe muito a se refinar nessa primeira implementação.


// Agora, em vez de src/index, usamos src/cli, pois mudamos o arquivo cli.js, para ser agora nosso ponto de entrada.

// O padrão do JavaScript é trabalhar com vários arquivos especializados e com poucas funções dentro deles, exportando e importando esses arquivos entre si. Importamos essas funções da mesma forma que importamos nossa função de erro e a biblioteca fs.

// Até agora, temos usado require para importar o que queríamos, como módulos e funções, e module.exports para exportar. Essa é a forma "nativa" do Node.js de lidar com a importação e exportação de módulos, nesse processo de organizar nosso código de forma compartimentada. No entanto, essa forma é aceita apenas no Node.js.

// O JavaScript tem outra forma de lidar com a importação e exportação que é aceita tanto no Node.js mais moderno, como na versão 20 que estamos usando, quanto nos navegadores. Essa forma mais moderna e amplamente utilizada é usando import e export.

// Configuração no package.json: Para trabalhar com a versão mais moderna de importação e exportação de módulos, precisamos adotar um certo processo.

// No terminal, na pasta raiz do projeto (e não dentro de src), vamos executar o seguinte comando: npm init –y

// O terminal informará que escreveu um arquivo chamado package.json na pasta do projeto.

// O arquivo package.json é um arquivo manifesto. Ele contém tudo que a aplicação precisa para executar, incluindo todas as dependências, bibliotecas usadas, scripts, detalhes de configuração e assim por diante. Este é o arquivo principal e, normalmente, o primeiro que verificamos quando recebemos um projeto em Node, para entender o que o projeto faz e usa. Precisamos desse arquivo agora para fazer uma configuração específica necessária para usar a importação e exportação moderna de módulos.

// Dentro do package.json, em qualquer ponto do objeto declarado no arquivo, como logo após a propriedade main, vamos adicionar a seguinte informação: "type": "module". Isso informa ao Node que esse projeto utiliza a forma moderna de importação e exportação de arquivos. Esse é o primeiro procedimento necessário para a importação e exportação de arquivos funcionar.

// Abordamos exemplos de duas formas de fazer a exportação, com export default e apenas export, mas existem mais formas de trabalhar com módulos em JavaScript.