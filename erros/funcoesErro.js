// Podemos começar a escrever algumas funções para separar o tratamento de erros do restante do código:
function trataErros(erro) {
    if (erro.code === 'ENOENT') {
        // throw new Error('Arquivo não encontrado');
        return 'Arquivo não encontrado';
    } else {
        return 'Erro na aplicação';
    }
}

module.exports = trataErros;

// Esse new Error é um tipo de objeto JavaScript de erro, e ele existe justamente para encapsular, digamos assim, para juntar todas as informações que possam ser pertinentes a um erro em um objeto só e lançar esse objeto onde ele tem que ser capturado.

// Então, o objeto Error traz com ele muitas informações que podemos utilizar para debugar, e por isso que ele é importante. E, muitas vezes, em vez de só retornar uma mensagem, vamos querer lançar um new Error, um novo objeto Error, pegando todas as informações de erro que foram capturadas e anexando a elas uma mensagem que achamos pertinente.

// O objeto Error tem vários outros parâmetros, várias outras formas de utilizar. Dá para tratar erro, dá para ficarmos debugando erro aqui e adicionando pontos de falha à vontade, mas, por enquanto, vamos parar por aqui.
