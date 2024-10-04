// Helper functions: funções mais simples que fazem algumas coisas específicas que não estão relacionadas com a funcionalidade principal. Por exemplo, não vão contar palavras, nem input e output. Então, vamos colocá-las para o código ficar um pouco mais separado.

// Precisamos resolver duas coisas, primeiro remover as ocorrências de palavras contadas só uma vez por parágrafo e também fazer a lista simples.

function filtraOcorrencias(paragrafo) {
    return Object.keys(paragrafo).filter(chave => paragrafo[chave] > 1)
  }
  
  function montaSaidaArquivo(listaPalavras) {
    let textoFinal = '';
    listaPalavras.forEach((paragrafo, indice) => {
      const duplicadas = filtraOcorrencias(paragrafo).join(', ');
      textoFinal += `palavras duplicadas no parágrafo ${indice + 1}: ${duplicadas} \n`
    })
  
    return textoFinal;
  }
  
  export { montaSaidaArquivo };
  